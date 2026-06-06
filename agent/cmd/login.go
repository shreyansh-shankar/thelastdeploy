// cmd/login.go
package cmd

import (
	"bufio"
	"bytes"
	"encoding/json"
	"errors"
	"fmt"
	"io"
	"net/http"
	"os"
	"strings"
	"syscall"
	"time"

	"github.com/thelastdeploy/agent/internal/config"
	"golang.org/x/term"
)

func runLogin(args []string) error {
	cfg, err := config.Load()
	if err != nil {
		return fmt.Errorf("load config: %w", err)
	}

	// ── Collect credentials ──────────────────────────────────────────────
	reader := bufio.NewReader(os.Stdin)
	fmt.Print("Email: ")
	email, err := reader.ReadString('\n')
	if err != nil {
		return fmt.Errorf("read email: %w", err)
	}
	email = strings.TrimSpace(email)
	if email == "" {
		return errors.New("email cannot be empty")
	}

	fmt.Print("Password: ")
	var password string
	if term.IsTerminal(int(syscall.Stdin)) {
		pwBytes, err := term.ReadPassword(int(syscall.Stdin))
		fmt.Println()
		if err != nil {
			return fmt.Errorf("read password: %w", err)
		}
		password = string(pwBytes)
	} else {
		password, err = reader.ReadString('\n')
		if err != nil {
			return fmt.Errorf("read password: %w", err)
		}
		password = strings.TrimSpace(password)
	}
	if password == "" {
		return errors.New("password cannot be empty")
	}

	// ── POST /login ──────────────────────────────────────────────────────
	payload, _ := json.Marshal(map[string]string{
		"email":    email,
		"password": password,
	})

	client := &http.Client{Timeout: 10 * time.Second}
	resp, err := client.Post(cfg.APIBaseURL+"/login", "application/json", bytes.NewReader(payload))
	if err != nil {
		return fmt.Errorf("could not reach API at %s: %w", cfg.APIBaseURL, err)
	}
	defer resp.Body.Close()

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return fmt.Errorf("read response: %w", err)
	}

	if resp.StatusCode != http.StatusOK {
		var errBody map[string]interface{}
		if json.Unmarshal(body, &errBody) == nil {
			if detail, ok := errBody["detail"]; ok {
				return fmt.Errorf("login failed: %v", detail)
			}
		}
		return fmt.Errorf("login failed (HTTP %d): %s", resp.StatusCode, strings.TrimSpace(string(body)))
	}

	// ── Parse response ───────────────────────────────────────────────────
	// Backend returns access_token AND device_key.
	// device_key is a per-user secret the agent uses to sign validator results.
	// Backend stores the same key and uses it to verify signatures.
	var loginResp struct {
		AccessToken string `json:"access_token"`
		TokenType   string `json:"token_type"`
		DeviceKey   string `json:"device_key"` // backend-issued, per-user signing key
	}
	if err := json.Unmarshal(body, &loginResp); err != nil {
		return fmt.Errorf("unexpected response format: %w", err)
	}
	if loginResp.AccessToken == "" {
		return errors.New("server returned an empty token — please try again")
	}

	// ── Persist token and device key ─────────────────────────────────────
	cfg.AuthToken = loginResp.AccessToken
	if err := config.Save(cfg); err != nil {
		return fmt.Errorf("save config: %w", err)
	}

	// If backend issued a device key, write it to ~/.tld/device.key
	// This replaces any locally generated key so backend can verify signatures.
	if loginResp.DeviceKey != "" {
		if err := os.WriteFile(cfg.DeviceKeyPath, []byte(loginResp.DeviceKey), 0600); err != nil {
			return fmt.Errorf("save device key: %w", err)
		}
		fmt.Printf("  Device key saved: %s\n", cfg.DeviceKeyPath)
	}

	fmt.Printf("✓ Logged in as %s\n", email)
	fmt.Println("  Your results will now be tied to your account and XP will be awarded.")
	return nil
}