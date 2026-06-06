// internal/validator/validator.go
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

	"github.com/thelastdeploy/agent/internal/device"
)

// Result holds the outcome of a validation run.
type Result struct {
	LabID     string    `json:"lab_id"`
	SectionID string    `json:"section_id"`
	Passed    bool      `json:"passed"`
	Output    string    `json:"output"`
	RanAt     time.Time `json:"ran_at"`
	Signature string    `json:"signature"`
}

// Run executes the validator script and returns a signed Result.
// labID and sectionID are included in the HMAC payload so the backend can
// verify the signature covers the specific lab that was validated.
func Run(labID, sectionID, scriptPath, deviceKeyPath string) (*Result, error) {
	if _, err := os.Stat(scriptPath); os.IsNotExist(err) {
		return nil, fmt.Errorf("validator script not found: %s", scriptPath)
	}

	os.Chmod(scriptPath, 0755)

	cmd := exec.Command("/bin/bash", scriptPath)
	cmd.Dir = filepath.Dir(scriptPath)
	outBytes, err := cmd.CombinedOutput()
	output := strings.TrimSpace(string(outBytes))
	passed := err == nil

	result := &Result{
		LabID:     labID,
		SectionID: sectionID,
		Passed:    passed,
		Output:    output,
		RanAt:     time.Now(),
	}

	key, err := device.Key(deviceKeyPath)
	if err != nil {
		return nil, fmt.Errorf("device key: %w", err)
	}
	result.Signature = sign(result, key)
	return result, nil
}

// sign produces an HMAC-SHA256 over the result fields (excluding Signature).
func sign(r *Result, key []byte) string {
	payload := fmt.Sprintf("%s:%s:%v:%s:%s",
		r.LabID,
		r.SectionID,
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