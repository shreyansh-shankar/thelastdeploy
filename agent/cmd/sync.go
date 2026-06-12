// agent/cmd/sync.go
package cmd

import (
	"archive/zip"
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"os"
	"path/filepath"
	"strings"
	"time"

	"github.com/thelastdeploy/agent/internal/cache"
	"github.com/thelastdeploy/agent/internal/config"
	"github.com/thelastdeploy/agent/internal/queue"
)

// modulesResponse matches GET /modules
type modulesResponse struct {
	Modules []moduleJSON `json:"modules"`
}

// moduleJSON matches the structured object the backend returns per module.
type moduleJSON struct {
	ID               string   `json:"id"`
	Title            string   `json:"title"`
	Description      string   `json:"description"`
	Topic            string   `json:"topic"`
	Difficulty       string   `json:"difficulty"`
	EstimatedMinutes int      `json:"estimated_minutes"`
	Tags             []string `json:"tags"`
	TotalXP          int      `json:"total_xp"`
	TotalSections    int      `json:"total_sections"`
}

func runSync(args []string) error {
	cfg, err := config.Load()
	if err != nil {
		return fmt.Errorf("load config: %w", err)
	}

	var syncAll bool
	var targetModule string
	var targetLab string

	for i := 0; i < len(args); i++ {
		switch args[i] {
		case "--all":
			syncAll = true
		case "-m":
			if i+1 < len(args) {
				targetModule = args[i+1]
				i++
			}
		case "-l":
			if i+1 < len(args) {
				targetLab = args[i+1]
				i++
			}
		}
	}

	if !syncAll && targetModule == "" && targetLab == "" {
		syncAll = true
	}

	tldDir := filepath.Dir(cfg.DeviceKeyPath)

	drainQueue(cfg.APIBaseURL, cfg.AuthToken, tldDir)

	// Priority 1: Sync from local challenges folder if present (dev setup)
	if _, err := os.Stat("challenges"); err == nil {
		fmt.Println("Syncing from local challenges directory...")
		return syncFromLocal(cfg.ChallengesDir, targetModule, targetLab)
	}

	// Priority 2: Sync from GitHub by default
	fmt.Printf("Syncing from GitHub repository %s...\n", cfg.ChallengesRepo)
	err = syncFromGitHub(cfg.ChallengesRepo, cfg.ChallengesDir, targetModule, targetLab)
	if err == nil {
		return nil
	}
	fmt.Fprintf(os.Stderr, "GitHub sync failed: %v. Falling back to backend API...\n", err)

	// Priority 3: Sync from API backend
	return syncFromAPI(cfg.APIBaseURL, cfg.ChallengesDir, targetModule)
}

// drainQueue attempts to POST any queued results to the API.
func drainQueue(apiBaseURL, authToken, tldDir string) bool {
	entries, err := queue.LoadAll(tldDir)
	if err != nil || len(entries) == 0 {
		client := &http.Client{Timeout: 3 * time.Second}
		resp, err := client.Get(apiBaseURL + "/health")
		if err != nil {
			return false
		}
		resp.Body.Close()
		return resp.StatusCode < 500
	}

	fmt.Printf("Flushing %d queued result(s) to API...\n", len(entries))
	reachable := false
	for _, entry := range entries {
		if err := postQueuedEntry(apiBaseURL, authToken, entry); err != nil {
			fmt.Fprintf(os.Stderr, "  ✗ %s (queued %s ago): %v\n",
				entry.LabID,
				time.Since(entry.QueuedAt).Round(time.Second),
				err,
			)
			continue
		}
		reachable = true
		if err := queue.Delete(tldDir, entry.LabID, entry.QueuedAt); err != nil {
			fmt.Fprintf(os.Stderr, "  warn: could not remove queue entry: %v\n", err)
		} else {
			fmt.Printf("  ✓ %s (queued %s ago) — synced\n",
				entry.LabID,
				time.Since(entry.QueuedAt).Round(time.Second),
			)
		}
	}
	return reachable
}

func postQueuedEntry(apiBaseURL, authToken string, entry *queue.Entry) error {
	data, err := json.MarshalIndent(entry, "", "  ")
	if err != nil {
		return err
	}

	client := &http.Client{Timeout: 10 * time.Second}
	req, err := http.NewRequest(http.MethodPost, apiBaseURL+"/results", bytes.NewReader(data))
	if err != nil {
		return err
	}
	req.Header.Set("Content-Type", "application/json")
	if authToken != "" {
		req.Header.Set("Authorization", "Bearer "+authToken)
	}

	resp, err := client.Do(req)
	if err != nil {
		return err
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK && resp.StatusCode != http.StatusCreated {
		body, _ := io.ReadAll(resp.Body)
		return fmt.Errorf("API returned %d: %s", resp.StatusCode, strings.TrimSpace(string(body)))
	}
	return nil
}

func syncFromGitHub(repo string, challengesDir string, targetModule string, targetLab string) error {
	url := fmt.Sprintf("https://github.com/%s/archive/refs/heads/main.zip", repo)
	client := &http.Client{Timeout: 30 * time.Second}
	resp, err := client.Get(url)
	if err != nil {
		return fmt.Errorf("failed to download ZIP from GitHub: %w", err)
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		return fmt.Errorf("GitHub returned HTTP status %d", resp.StatusCode)
	}

	bodyBytes, err := io.ReadAll(resp.Body)
	if err != nil {
		return fmt.Errorf("failed to read ZIP response: %w", err)
	}

	zipReader, err := zip.NewReader(bytes.NewReader(bodyBytes), int64(len(bodyBytes)))
	if err != nil {
		return fmt.Errorf("failed to parse ZIP file: %w", err)
	}

	var parentModule string
	var parentSection string

	if targetLab != "" {
		for _, file := range zipReader.File {
			parts := strings.Split(filepath.ToSlash(file.Name), "/")
			challengesIdx := -1
			for idx, part := range parts {
				if part == "challenges" {
					challengesIdx = idx
					break
				}
			}
			if challengesIdx == -1 {
				continue
			}
			relParts := parts[challengesIdx+1:]
			if len(relParts) >= 6 && relParts[1] == "sections" && relParts[3] == "labs" && relParts[4] == targetLab {
				parentModule = relParts[0]
				parentSection = relParts[2]
				break
			}
		}
		if parentModule == "" {
			return fmt.Errorf("lab %q not found in repository", targetLab)
		}
	}

	syncedModules := make(map[string]bool)

	for _, file := range zipReader.File {
		parts := strings.Split(filepath.ToSlash(file.Name), "/")
		challengesIdx := -1
		for idx, part := range parts {
			if part == "challenges" {
				challengesIdx = idx
				break
			}
		}
		if challengesIdx == -1 {
			continue
		}

		relParts := parts[challengesIdx+1:]
		if len(relParts) == 0 {
			continue
		}

		subpath := strings.Join(relParts, "/")
		moduleID := relParts[0]

		if targetModule != "" && moduleID != targetModule {
			continue
		}
		if targetLab != "" {
			if moduleID != parentModule {
				continue
			}
			if len(relParts) == 2 && relParts[1] == "module.yaml" {
				// extract
			} else if len(relParts) >= 4 && relParts[1] == "sections" && relParts[2] == parentSection {
				if len(relParts) == 4 && (relParts[3] == "section.yaml" || relParts[3] == "content.md") {
					// extract
				} else if len(relParts) >= 6 && relParts[3] == "labs" && relParts[4] == targetLab {
					// extract
				} else {
					continue
				}
			} else {
				continue
			}
		}

		destPath := filepath.Clean(filepath.Join(challengesDir, subpath))
		if !strings.HasPrefix(destPath, filepath.Clean(challengesDir)+string(os.PathSeparator)) && destPath != filepath.Clean(challengesDir) {
			continue
		}

		if file.FileInfo().IsDir() {
			os.MkdirAll(destPath, 0755)
			continue
		}

		if err := os.MkdirAll(filepath.Dir(destPath), 0755); err != nil {
			return fmt.Errorf("failed to create directory: %w", err)
		}

		srcFile, err := file.Open()
		if err != nil {
			return fmt.Errorf("failed to open zip file entry: %w", err)
		}

		destFile, err := os.OpenFile(destPath, os.O_WRONLY|os.O_CREATE|os.O_TRUNC, file.Mode())
		if err != nil {
			srcFile.Close()
			return fmt.Errorf("failed to open destination file: %w", err)
		}

		if _, err := io.Copy(destFile, srcFile); err != nil {
			destFile.Close()
			srcFile.Close()
			return fmt.Errorf("failed to copy file contents: %w", err)
		}
		destFile.Close()
		srcFile.Close()

		syncedModules[moduleID] = true
	}

	if len(syncedModules) == 0 {
		return fmt.Errorf("no valid modules synced")
	}

	fmt.Printf("\nSynced %d module(s) to %s\n", len(syncedModules), challengesDir)
	for m := range syncedModules {
		fmt.Printf("  ✓ %s\n", m)
	}
	return nil
}

func syncFromLocal(challengesDir, targetModule, targetLab string) error {
	entries, err := os.ReadDir("challenges")
	if err != nil {
		return fmt.Errorf("no local ./challenges/ directory found: %w", err)
	}

	var parentModule string
	var parentSection string
	if targetLab != "" {
		found := false
		for _, e := range entries {
			if !e.IsDir() {
				continue
			}
			modID := e.Name()
			secDir := filepath.Join("challenges", modID, "sections")
			sections, err := os.ReadDir(secDir)
			if err != nil {
				continue
			}
			for _, sec := range sections {
				if !sec.IsDir() {
					continue
				}
				labsDir := filepath.Join(secDir, sec.Name(), "labs")
				labs, err := os.ReadDir(labsDir)
				if err != nil {
					continue
				}
				for _, l := range labs {
					if l.IsDir() && l.Name() == targetLab {
						parentModule = modID
						parentSection = sec.Name()
						found = true
						break
					}
				}
				if found {
					break
				}
			}
			if found {
				break
			}
		}
		if parentModule == "" {
			return fmt.Errorf("lab %q not found in local challenges", targetLab)
		}
	}

	count := 0
	for _, e := range entries {
		if !e.IsDir() {
			continue
		}
		moduleID := e.Name()

		if targetModule != "" && moduleID != targetModule {
			continue
		}
		if targetLab != "" && moduleID != parentModule {
			continue
		}

		yamlPath := filepath.Join("challenges", moduleID, "module.yaml")
		data, err := os.ReadFile(yamlPath)
		if err != nil {
			fmt.Fprintf(os.Stderr, "warn: skipping %s (no module.yaml): %v\n", moduleID, err)
			continue
		}

		if err := cache.SaveRaw(challengesDir, moduleID, data); err != nil {
			fmt.Fprintf(os.Stderr, "warn: failed to save %s: %v\n", moduleID, err)
			continue
		}

		syncLocalSections(moduleID, challengesDir, parentSection, targetLab)
		fmt.Printf("  ✓ %s\n", moduleID)
		count++
	}

	if count == 0 {
		return fmt.Errorf("no valid modules synced")
	}
	fmt.Printf("\nSynced %d local module(s) to %s\n", count, challengesDir)
	return nil
}

func syncLocalSections(moduleID, challengesDir, parentSection, targetLab string) {
	srcSectionsDir := filepath.Join("challenges", moduleID, "sections")
	dstSectionsDir := filepath.Join(challengesDir, moduleID, "sections")

	sections, err := os.ReadDir(srcSectionsDir)
	if err != nil {
		return
	}

	for _, sec := range sections {
		if !sec.IsDir() {
			continue
		}

		if targetLab != "" && sec.Name() != parentSection {
			continue
		}

		srcSecDir := filepath.Join(srcSectionsDir, sec.Name())
		dstSecDir := filepath.Join(dstSectionsDir, sec.Name())
		os.MkdirAll(dstSecDir, 0755)

		for _, fname := range []string{"section.yaml", "content.md"} {
			if data, err := os.ReadFile(filepath.Join(srcSecDir, fname)); err == nil {
				os.WriteFile(filepath.Join(dstSecDir, fname), data, 0644)
			}
		}

		// Sync labs inside this section.
		srcLabsDir := filepath.Join(srcSecDir, "labs")
		labs, err := os.ReadDir(srcLabsDir)
		if err != nil {
			continue
		}
		for _, l := range labs {
			if !l.IsDir() {
				continue
			}
			if targetLab != "" && l.Name() != targetLab {
				continue
			}
			syncLabFiles(moduleID, sec.Name(), l.Name(), challengesDir)
		}
	}
}

func syncLabFiles(moduleID, sectionID, labID, challengesDir string) {
	srcDir := filepath.Join("challenges", moduleID, "sections", sectionID, "labs", labID)
	dstDir := filepath.Join(challengesDir, moduleID, "sections", sectionID, "labs", labID)
	os.MkdirAll(dstDir, 0755)
	for _, fname := range []string{"lab.yaml", "validator.sh"} {
		if data, err := os.ReadFile(filepath.Join(srcDir, fname)); err == nil {
			os.WriteFile(filepath.Join(dstDir, fname), data, 0755)
		}
	}
}

func syncFromAPI(apiBaseURL, challengesDir, targetModule string) error {
	client := &http.Client{Timeout: 5 * time.Second}
	resp, err := client.Get(apiBaseURL + "/modules")
	if err != nil {
		return fmt.Errorf("API unreachable: %w", err)
	}
	defer resp.Body.Close()

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return fmt.Errorf("read response: %w", err)
	}

	if len(body) > 0 && body[0] == '<' {
		return fmt.Errorf("port %s is taken by another service (got HTML, not our API)", apiBaseURL)
	}

	if resp.StatusCode != http.StatusOK {
		return fmt.Errorf("API returned %d: %s", resp.StatusCode, strings.TrimSpace(string(body)))
	}

	var mr modulesResponse
	if err := json.Unmarshal(body, &mr); err != nil {
		return fmt.Errorf("API response not recognised: %w", err)
	}

	if len(mr.Modules) == 0 {
		fmt.Println("No modules returned from API.")
		return nil
	}

	count := 0
	for _, m := range mr.Modules {
		if targetModule != "" && m.ID != targetModule {
			continue
		}
		data, err := json.MarshalIndent(m, "", "  ")
		if err != nil {
			fmt.Fprintf(os.Stderr, "warn: failed to marshal %s: %v\n", m.ID, err)
			continue
		}
		if err := cache.SaveModuleJSON(challengesDir, m.ID, data); err != nil {
			fmt.Fprintf(os.Stderr, "warn: failed to save %s: %v\n", m.ID, err)
			continue
		}
		syncLocalSections(m.ID, challengesDir, "", "")
		fmt.Printf("  ✓ %s\n", m.ID)
		count++
	}

	fmt.Printf("\nSynced %d module(s) to %s\n", count, challengesDir)
	return nil
}