// agent/cmd/login.go
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

	"github.com/orbstack/agent/internal/config"
	"golang.org/x/term"
)

func runLogin(args []string) error {
	cfg, err := config.Load()
	if err != nil {
		return fmt.Errorf("load config: %w", err)
	}

	// ── Collect credentials ──────────────────────────────────────────────────
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
	// term.ReadPassword turns off echo so the password is not shown.
	// Falls back to plain stdin read if we're not attached to a real terminal
	// (e.g. piped input in tests).
	var password string
	if term.IsTerminal(int(syscall.Stdin)) {
		pwBytes, err := term.ReadPassword(int(syscall.Stdin))
		fmt.Println() // newline after the hidden input
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

	// ── POST /login ──────────────────────────────────────────────────────────
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
		// Try to extract a meaningful error message from the response body.
		var errBody map[string]interface{}
		if json.Unmarshal(body, &errBody) == nil {
			if detail, ok := errBody["detail"]; ok {
				return fmt.Errorf("login failed: %v", detail)
			}
		}
		return fmt.Errorf("login failed (HTTP %d): %s", resp.StatusCode, strings.TrimSpace(string(body)))
	}

	var loginResp struct {
		AccessToken string `json:"access_token"`
		TokenType   string `json:"token_type"`
	}
	if err := json.Unmarshal(body, &loginResp); err != nil {
		return fmt.Errorf("unexpected response format: %w", err)
	}
	if loginResp.AccessToken == "" {
		return errors.New("server returned an empty token — please try again")
	}

	// ── Persist token ────────────────────────────────────────────────────────
	cfg.AuthToken = loginResp.AccessToken
	if err := config.Save(cfg); err != nil {
		return fmt.Errorf("save config: %w", err)
	}

	fmt.Printf("✓ Logged in as %s\n", email)
	fmt.Println("  Your results will now be tied to your account and XP will be awarded.")
	return nil
}