// agent/internal/cache/challenge.go
package cache

import (
	"bufio"
	"encoding/json"
	"fmt"
	"os"
	"path/filepath"
	"strconv"
	"strings"
)

// Module mirrors the module metadata the agent works with.
type Module struct {
	ID                 string
	Title              string
	Description        string
	Topic              string
	Difficulty         string
	EstimatedMinutes   int
	ResourceLimitsCPU  int
	ResourceLimitsMem  int
	SetupType          string
	SeedCommands       []string
	PracticalSectionID string
	PracticalSectionXP int
	ValidatorScript    string
	Sections           []SectionRef
}

// SectionRef is a lightweight entry from the module sections list.
type SectionRef struct {
	ID    string
	Order int
}

// Section mirrors a section.yaml file.
type Section struct {
	ID    string
	Title string
	Type  string // "reading" | "practical"
	Order int
	XP    int
}

// moduleJSONFile is the shape saved by sync when the backend returns JSON.
type moduleJSONFile struct {
	ID               string   `json:"id"`
	Title            string   `json:"title"`
	Description      string   `json:"description"`
	Topic            string   `json:"topic"`
	Difficulty       string   `json:"difficulty"`
	EstimatedMinutes int      `json:"estimated_minutes"`
	Tags             []string `json:"tags"`
	TotalXP          int      `json:"total_xp"`
	TotalSections    int      `json:"total_sections"`
	// Setup fields — present when synced from local YAML fallback via JSON.
	SetupType    string   `json:"setup_type,omitempty"`
	SeedCommands []string `json:"seed_commands,omitempty"`
	// Resource limits
	ResourceLimitsCPU int `json:"resource_limits_cpu,omitempty"`
	ResourceLimitsMem int `json:"resource_limits_mem,omitempty"`
}

// LoadModule reads a module from the cache dir and discovers its practical
// section by scanning the sections/ subdirectory.
//
// It tries module.json first (written by sync from the API), then falls back
// to module.yaml (written by syncFromLocal).
func LoadModule(baseDir, moduleID string) (*Module, error) {
	moduleDir := filepath.Join(baseDir, moduleID)

	var m *Module
	var err error

	jsonPath := filepath.Join(moduleDir, "module.json")
	yamlPath := filepath.Join(moduleDir, "module.yaml")

	if _, statErr := os.Stat(jsonPath); statErr == nil {
		m, err = parseModuleJSON(jsonPath)
	} else {
		m, err = ParseModuleYAML(yamlPath)
	}
	if err != nil {
		return nil, err
	}

	// Walk sections/ to find the practical section and its validator.
	sectionsDir := filepath.Join(moduleDir, "sections")
	entries, err := os.ReadDir(sectionsDir)
	if err != nil && !os.IsNotExist(err) {
		return nil, fmt.Errorf("read sections dir: %w", err)
	}

	for _, e := range entries {
		if !e.IsDir() {
			continue
		}
		sectionYAML := filepath.Join(sectionsDir, e.Name(), "section.yaml")
		sec, err := ParseSectionYAML(sectionYAML)
		if err != nil {
			fmt.Fprintf(os.Stderr, "warn: skipping section %s: %v\n", e.Name(), err)
			continue
		}
		if sec.Type == "practical" {
			m.PracticalSectionID = sec.ID
			m.PracticalSectionXP = sec.XP
			m.ValidatorScript = filepath.Join(sectionsDir, e.Name(), "validator.sh")
			break
		}
	}

	return m, nil
}

// parseModuleJSON reads a module.json file saved by sync.
func parseModuleJSON(path string) (*Module, error) {
	data, err := os.ReadFile(path)
	if err != nil {
		return nil, fmt.Errorf("read %s: %w", path, err)
	}
	var jf moduleJSONFile
	if err := json.Unmarshal(data, &jf); err != nil {
		return nil, fmt.Errorf("parse %s: %w", path, err)
	}
	if jf.ID == "" {
		return nil, fmt.Errorf("module.json missing required field: id")
	}

	cpu := jf.ResourceLimitsCPU
	mem := jf.ResourceLimitsMem
	if cpu == 0 {
		cpu = 1
	}
	if mem == 0 {
		mem = 512
	}
	setupType := jf.SetupType
	if setupType == "" {
		setupType = "shell"
	}

	return &Module{
		ID:                jf.ID,
		Title:             jf.Title,
		Description:       jf.Description,
		Topic:             jf.Topic,
		Difficulty:        jf.Difficulty,
		EstimatedMinutes:  jf.EstimatedMinutes,
		ResourceLimitsCPU: cpu,
		ResourceLimitsMem: mem,
		SetupType:         setupType,
		SeedCommands:      jf.SeedCommands,
	}, nil
}

// SaveModuleJSON writes structured module JSON to baseDir/<id>/module.json
func SaveModuleJSON(baseDir, id string, data []byte) error {
	moduleDir := filepath.Join(baseDir, id)
	if err := os.MkdirAll(moduleDir, 0755); err != nil {
		return err
	}
	return os.WriteFile(filepath.Join(moduleDir, "module.json"), data, 0644)
}

// SaveRaw writes raw YAML bytes for a module into baseDir/<id>/module.yaml
// Used by syncFromLocal when falling back to local files.
func SaveRaw(baseDir, id string, data []byte) error {
	moduleDir := filepath.Join(baseDir, id)
	if err := os.MkdirAll(moduleDir, 0755); err != nil {
		return err
	}
	return os.WriteFile(filepath.Join(moduleDir, "module.yaml"), data, 0644)
}

// ---------------------------------------------------------------------------
// YAML parsers
// ---------------------------------------------------------------------------

// ParseModuleYAML parses a module.yaml file from disk.
func ParseModuleYAML(path string) (*Module, error) {
	f, err := os.Open(path)
	if err != nil {
		return nil, fmt.Errorf("open %s: %w", path, err)
	}
	defer f.Close()

	var lines []string
	scanner := bufio.NewScanner(f)
	for scanner.Scan() {
		lines = append(lines, scanner.Text())
	}
	if err := scanner.Err(); err != nil {
		return nil, fmt.Errorf("read %s: %w", path, err)
	}

	m := &Module{}
	var inResourceLimits, inSetup, inSeedCommands, inSections bool
	var currentSection *SectionRef

	for _, raw := range lines {
		trimmed := strings.TrimSpace(raw)
		if trimmed == "" || strings.HasPrefix(trimmed, "#") {
			continue
		}

		indent := countIndent(raw)

		if indent == 0 {
			inResourceLimits = false
			inSetup = false
			inSeedCommands = false
			inSections = false
			if currentSection != nil {
				m.Sections = append(m.Sections, *currentSection)
				currentSection = nil
			}
		}

		key, val := splitKV(trimmed)

		switch {
		case indent == 0 && key == "id":
			m.ID = val
		case indent == 0 && key == "title":
			m.Title = unquote(val)
		case indent == 0 && key == "description":
			m.Description = unquote(val)
		case indent == 0 && key == "topic":
			m.Topic = val
		case indent == 0 && key == "difficulty":
			m.Difficulty = val
		case indent == 0 && key == "estimated_minutes":
			m.EstimatedMinutes, _ = strconv.Atoi(val)

		case indent == 0 && key == "resource_limits":
			inResourceLimits = true
		case inResourceLimits && indent == 2 && key == "cpu":
			m.ResourceLimitsCPU, _ = strconv.Atoi(val)
		case inResourceLimits && indent == 2 && key == "memory_mb":
			m.ResourceLimitsMem, _ = strconv.Atoi(val)

		case indent == 0 && key == "setup":
			inSetup = true
		case inSetup && indent == 2 && key == "type":
			m.SetupType = val
		case inSetup && indent == 2 && key == "seed_commands":
			inSeedCommands = true
		case inSeedCommands && indent == 4 && strings.HasPrefix(trimmed, "- "):
			m.SeedCommands = append(m.SeedCommands, unquote(strings.TrimPrefix(trimmed, "- ")))

		case indent == 0 && key == "sections":
			inSections = true
		case inSections && indent == 2 && strings.HasPrefix(trimmed, "- "):
			if currentSection != nil {
				m.Sections = append(m.Sections, *currentSection)
			}
			currentSection = &SectionRef{}
			rest := strings.TrimPrefix(trimmed, "- ")
			k2, v2 := splitKV(rest)
			setSectionRefField(currentSection, k2, v2)
		case inSections && indent == 4 && currentSection != nil:
			k2, v2 := splitKV(trimmed)
			setSectionRefField(currentSection, k2, v2)
		}
	}

	if currentSection != nil {
		m.Sections = append(m.Sections, *currentSection)
	}

	if m.ID == "" {
		return nil, fmt.Errorf("module.yaml missing required field: id")
	}
	return m, nil
}

// ParseSectionYAML parses a section.yaml file from disk.
func ParseSectionYAML(path string) (*Section, error) {
	f, err := os.Open(path)
	if err != nil {
		return nil, fmt.Errorf("open %s: %w", path, err)
	}
	defer f.Close()

	var lines []string
	scanner := bufio.NewScanner(f)
	for scanner.Scan() {
		lines = append(lines, scanner.Text())
	}
	if err := scanner.Err(); err != nil {
		return nil, fmt.Errorf("read %s: %w", path, err)
	}

	s := &Section{}
	for _, raw := range lines {
		trimmed := strings.TrimSpace(raw)
		if trimmed == "" || strings.HasPrefix(trimmed, "#") {
			continue
		}
		if countIndent(raw) != 0 {
			continue
		}
		key, val := splitKV(trimmed)
		switch key {
		case "id":
			s.ID = val
		case "title":
			s.Title = unquote(val)
		case "type":
			s.Type = val
		case "order":
			s.Order, _ = strconv.Atoi(val)
		case "xp":
			s.XP, _ = strconv.Atoi(val)
		}
	}

	if s.ID == "" {
		return nil, fmt.Errorf("section.yaml missing required field: id")
	}
	return s, nil
}

// ---------------------------------------------------------------------------
// Internal helpers
// ---------------------------------------------------------------------------

func setSectionRefField(s *SectionRef, key, val string) {
	switch key {
	case "id":
		s.ID = val
	case "order":
		s.Order, _ = strconv.Atoi(val)
	}
}

func countIndent(s string) int {
	count := 0
	for _, ch := range s {
		if ch == ' ' {
			count++
		} else {
			break
		}
	}
	return count
}

func splitKV(s string) (string, string) {
	idx := strings.Index(s, ":")
	if idx == -1 {
		return s, ""
	}
	key := strings.TrimSpace(s[:idx])
	val := strings.TrimSpace(s[idx+1:])
	return key, val
}

func unquote(s string) string {
	s = strings.TrimSpace(s)
	if len(s) >= 2 {
		if (s[0] == '"' && s[len(s)-1] == '"') ||
			(s[0] == '\'' && s[len(s)-1] == '\'') {
			return s[1 : len(s)-1]
		}
	}
	return s
}