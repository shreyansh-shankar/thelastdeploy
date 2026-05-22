// agent/internal/cache/challenge.go
package cache

import (
	"bufio"
	"fmt"
	"os"
	"path/filepath"
	"strconv"
	"strings"
)

// Challenge mirrors the challenge.yaml format exactly.
type Challenge struct {
	ID               string
	Title            string
	Description      string
	Topic            string
	Difficulty       string
	XP               int
	EstimatedMinutes int
	ResourceLimitsCPU int
	ResourceLimitsMem int
	SetupType        string
	SeedCommands     []string
	Steps            []Step
	ValidatorType    string
	ValidatorScript  string
}

type Step struct {
	Title string
	Body  string
	Hint  string
}

// ParseYAML parses a challenge.yaml file from disk.
// Hand-rolled parser — no external deps.
func ParseYAML(path string) (*Challenge, error) {
	f, err := os.Open(path)
	if err != nil {
		return nil, fmt.Errorf("open %s: %w", path, err)
	}
	defer f.Close()

	lines := []string{}
	scanner := bufio.NewScanner(f)
	for scanner.Scan() {
		lines = append(lines, scanner.Text())
	}
	if err := scanner.Err(); err != nil {
		return nil, fmt.Errorf("read %s: %w", path, err)
	}

	c := &Challenge{}
	var inSteps, inSetup, inValidator, inResourceLimits, inSeedCommands bool
	var currentStep *Step

	for i := 0; i < len(lines); i++ {
		raw := lines[i]
		trimmed := strings.TrimSpace(raw)

		if trimmed == "" || strings.HasPrefix(trimmed, "#") {
			continue
		}

		indent := countIndent(raw)

		if indent == 0 {
			inSteps = false
			inSetup = false
			inValidator = false
			inResourceLimits = false
			inSeedCommands = false
			if currentStep != nil {
				c.Steps = append(c.Steps, *currentStep)
				currentStep = nil
			}
		}

		key, val := splitKV(trimmed)

		switch {
		case indent == 0 && key == "id":
			c.ID = val
		case indent == 0 && key == "title":
			c.Title = unquote(val)
		case indent == 0 && key == "description":
			c.Description = unquote(val)
		case indent == 0 && key == "topic":
			c.Topic = val
		case indent == 0 && key == "difficulty":
			c.Difficulty = val
		case indent == 0 && key == "xp":
			c.XP, _ = strconv.Atoi(val)
		case indent == 0 && key == "estimated_minutes":
			c.EstimatedMinutes, _ = strconv.Atoi(val)
		case indent == 0 && key == "resource_limits":
			inResourceLimits = true
		case inResourceLimits && indent == 2 && key == "cpu":
			c.ResourceLimitsCPU, _ = strconv.Atoi(val)
		case inResourceLimits && indent == 2 && key == "memory_mb":
			c.ResourceLimitsMem, _ = strconv.Atoi(val)
		case indent == 0 && key == "setup":
			inSetup = true
		case inSetup && indent == 2 && key == "type":
			c.SetupType = val
		case inSetup && indent == 2 && key == "seed_commands":
			inSeedCommands = true
		case inSeedCommands && indent == 4 && strings.HasPrefix(trimmed, "- "):
			c.SeedCommands = append(c.SeedCommands, unquote(strings.TrimPrefix(trimmed, "- ")))
		case indent == 0 && key == "steps":
			inSteps = true
		case inSteps && indent == 2 && strings.HasPrefix(trimmed, "- "):
			if currentStep != nil {
				c.Steps = append(c.Steps, *currentStep)
			}
			currentStep = &Step{}
			rest := strings.TrimPrefix(trimmed, "- ")
			k2, v2 := splitKV(rest)
			setStepField(currentStep, k2, v2)
		case inSteps && indent == 4 && currentStep != nil:
			k2, v2 := splitKV(trimmed)
			setStepField(currentStep, k2, v2)
		case indent == 0 && key == "validator":
			if currentStep != nil {
				c.Steps = append(c.Steps, *currentStep)
				currentStep = nil
			}
			inValidator = true
		case inValidator && indent == 2 && key == "type":
			c.ValidatorType = val
		case inValidator && indent == 2 && key == "script":
			c.ValidatorScript = val
		}
	}

	if currentStep != nil {
		c.Steps = append(c.Steps, *currentStep)
	}

	if c.ID == "" {
		return nil, fmt.Errorf("challenge.yaml missing required field: id")
	}
	return c, nil
}

func setStepField(s *Step, key, val string) {
	switch key {
	case "title":
		s.Title = unquote(val)
	case "body":
		s.Body = unquote(val)
	case "hint":
		s.Hint = unquote(val)
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

// ChallengeDir returns the challenges directory from the provided base dir,
// creating it if it does not exist.
func ChallengeDir(baseDir string) (string, error) {
	if err := os.MkdirAll(baseDir, 0755); err != nil {
		return "", err
	}
	return baseDir, nil
}

// SaveRaw writes raw YAML bytes for a challenge id into baseDir/<id>/challenge.yaml
func SaveRaw(baseDir, id string, data []byte) error {
	challengeDir := filepath.Join(baseDir, id)
	if err := os.MkdirAll(challengeDir, 0755); err != nil {
		return err
	}
	return os.WriteFile(filepath.Join(challengeDir, "challenge.yaml"), data, 0644)
}

// LoadAll reads all cached challenges from the given directory.
func LoadAll(baseDir string) ([]*Challenge, error) {
	entries, err := os.ReadDir(baseDir)
	if err != nil {
		return nil, err
	}
	var out []*Challenge
	for _, e := range entries {
		if !e.IsDir() {
			continue
		}
		yamlPath := filepath.Join(baseDir, e.Name(), "challenge.yaml")
		c, err := ParseYAML(yamlPath)
		if err != nil {
			fmt.Fprintf(os.Stderr, "warn: skipping %s: %v\n", e.Name(), err)
			continue
		}
		out = append(out, c)
	}
	return out, nil
}