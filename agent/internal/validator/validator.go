// agent/internal/validator/validator.go
package validator

import (
	"crypto/hmac"
	"crypto/sha256"
	"encoding/hex"
	"encoding/json"
	"fmt"
	"os"
	"os/exec"
	"path/filepath"
	"strings"
	"time"

	"github.com/orbstack/agent/internal/device"
)

// Result holds the outcome of a validation run.
type Result struct {
	ChallengeID string    `json:"challenge_id"`
	Passed      bool      `json:"passed"`
	Output      string    `json:"output"`
	RanAt       time.Time `json:"ran_at"`
	Signature   string    `json:"signature"` // HMAC-SHA256 of payload
}

// Run executes the validator script and returns a signed Result.
//
// Why sign it? Think of it like a JWT in a web app. When you POST the result
// to our backend, anyone could craft a fake POST saying "I passed". The HMAC
// signature proves the result was produced by this specific device's key —
// without ever sending the key to the server. The server only needs to verify
// the signature using the device's public key (which it learns at registration).
func Run(challengeID, scriptPath, deviceKeyPath string) (*Result, error) {
	if _, err := os.Stat(scriptPath); os.IsNotExist(err) {
		return nil, fmt.Errorf("validator script not found: %s", scriptPath)
	}

	// Ensure executable — some filesystems lose the +x bit on copy.
	os.Chmod(scriptPath, 0755)

	cmd := exec.Command("/bin/bash", scriptPath)
	cmd.Dir = filepath.Dir(scriptPath)
	outBytes, err := cmd.CombinedOutput()
	output := strings.TrimSpace(string(outBytes))
	passed := err == nil

	result := &Result{
		ChallengeID: challengeID,
		Passed:      passed,
		Output:      output,
		RanAt:       time.Now(),
	}

	// Sign the result with the device key.
	key, err := device.Key(deviceKeyPath)
	if err != nil {
		return nil, fmt.Errorf("device key: %w", err)
	}
	result.Signature = sign(result, key)

	return result, nil
}

// sign produces an HMAC-SHA256 over the result fields (excluding Signature itself).
// The payload is a deterministic string — same inputs always produce the same
// signature, so the backend can reproduce it to verify.
func sign(r *Result, key []byte) string {
	payload := fmt.Sprintf("%s:%v:%s:%s",
		r.ChallengeID,
		r.Passed,
		r.Output,
		r.RanAt.UTC().Format(time.RFC3339),
	)
	mac := hmac.New(sha256.New, key)
	mac.Write([]byte(payload))
	return hex.EncodeToString(mac.Sum(nil))
}

// Verify checks whether a Result's signature is valid against the local device key.
func Verify(r *Result, deviceKeyPath string) (bool, error) {
	key, err := device.Key(deviceKeyPath)
	if err != nil {
		return false, err
	}
	expected := sign(r, key)
	return hmac.Equal([]byte(r.Signature), []byte(expected)), nil
}

// MarshalResult serialises a result to JSON for sending to the API.
func MarshalResult(r *Result) ([]byte, error) {
	return json.MarshalIndent(r, "", "  ")
}