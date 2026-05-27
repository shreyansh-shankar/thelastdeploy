// agent/internal/config/config.go
package config

import (
	"fmt"
	"os"
	"path/filepath"
	"strings"
)

// Config holds all agent settings read from ~/.orbstack/config.yaml
type Config struct {
	APIBaseURL    string `yaml:"api_base_url"`
	DeviceKeyPath string `yaml:"device_key_path"`
	ChallengesDir string `yaml:"challenges_dir"`
	AuthToken     string `yaml:"auth_token"` // set by `orbstack login`, empty if not logged in
}

const defaultAPIBaseURL = "http://localhost:8742"

// Load reads ~/.orbstack/config.yaml. If the file does not exist, it creates
// it with sensible defaults and returns those defaults.
func Load() (*Config, error) {
	path, err := configPath()
	if err != nil {
		return nil, err
	}

	// Ensure the ~/.orbstack/ directory exists.
	if err := os.MkdirAll(filepath.Dir(path), 0700); err != nil {
		return nil, fmt.Errorf("create config dir: %w", err)
	}

	// If the file exists, parse it.
	data, err := os.ReadFile(path)
	if err == nil {
		return parse(string(data)), nil
	}
	if !os.IsNotExist(err) {
		return nil, fmt.Errorf("read config: %w", err)
	}

	// File does not exist — write defaults and return them.
	cfg := defaults()
	if err := write(path, cfg); err != nil {
		return nil, fmt.Errorf("write default config: %w", err)
	}
	return cfg, nil
}

// Save persists the current config struct back to ~/.orbstack/config.yaml.
// This is used by `orbstack login` and `orbstack logout` to update AuthToken
// without clobbering the other fields.
func Save(cfg *Config) error {
	path, err := configPath()
	if err != nil {
		return err
	}
	return write(path, cfg)
}

// OrbStackDir returns the absolute path to ~/.orbstack/
func OrbStackDir() (string, error) {
	home, err := os.UserHomeDir()
	if err != nil {
		return "", err
	}
	return filepath.Join(home, ".orbstack"), nil
}

// ---------------------------------------------------------------------------
// Internal helpers
// ---------------------------------------------------------------------------

func configPath() (string, error) {
	dir, err := OrbStackDir()
	if err != nil {
		return "", err
	}
	return filepath.Join(dir, "config.yaml"), nil
}

func defaults() *Config {
	home, _ := os.UserHomeDir()
	return &Config{
		APIBaseURL:    defaultAPIBaseURL,
		DeviceKeyPath: filepath.Join(home, ".orbstack", "device.key"),
		ChallengesDir: filepath.Join(home, ".orbstack", "challenges"),
	}
}

// parse is a minimal hand-rolled YAML reader for our simple flat config.
func parse(raw string) *Config {
	cfg := defaults()
	for _, line := range strings.Split(raw, "\n") {
		line = strings.TrimSpace(line)
		if line == "" || strings.HasPrefix(line, "#") {
			continue
		}
		idx := strings.Index(line, ":")
		if idx == -1 {
			continue
		}
		key := strings.TrimSpace(line[:idx])
		val := strings.TrimSpace(line[idx+1:])
		val = strings.Trim(val, `"'`)

		switch key {
		case "api_base_url":
			if val != "" {
				cfg.APIBaseURL = val
			}
		case "device_key_path":
			if val != "" {
				cfg.DeviceKeyPath = expandHome(val)
			}
		case "challenges_dir":
			if val != "" {
				cfg.ChallengesDir = expandHome(val)
			}
		case "auth_token":
			// Store as-is; empty string means not logged in.
			cfg.AuthToken = val
		}
	}
	return cfg
}

func write(path string, cfg *Config) error {
	// Build the auth_token line only when a token is present, so the file
	// stays clean when the user is not logged in.
	authLine := ""
	if cfg.AuthToken != "" {
		authLine = fmt.Sprintf("auth_token: %s\n", cfg.AuthToken)
	}

	content := fmt.Sprintf(`# OrbStack agent configuration
# Generated automatically on first run. Safe to edit.
api_base_url: %s
device_key_path: %s
challenges_dir: %s
%s`, cfg.APIBaseURL, cfg.DeviceKeyPath, cfg.ChallengesDir, authLine)

	return os.WriteFile(path, []byte(content), 0600)
}

// expandHome replaces a leading ~ with the real home directory.
func expandHome(p string) string {
	if !strings.HasPrefix(p, "~/") {
		return p
	}
	home, err := os.UserHomeDir()
	if err != nil {
		return p
	}
	return filepath.Join(home, p[2:])
}