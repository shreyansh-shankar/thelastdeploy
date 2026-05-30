// agent/internal/queue/queue.go
package queue

// The queue is a folder of JSON files at ~/.orbstack/queue/.
// Each file is one signed validator result that failed to POST to the API.
//
// Why files and not a database? Because the queue will almost always be empty
// or have one item. Files are readable, debuggable, and trivially deleted if
// something goes wrong. No dependency needed.

import (
	"encoding/json"
	"fmt"
	"os"
	"path/filepath"
	"time"
)

// Entry is what we write to disk — a validator result plus metadata.
// Uses module_id + section_id to match the new POST /results shape.
type Entry struct {
	ModuleID  string    `json:"module_id"`
	SectionID string    `json:"section_id"`
	Passed    bool      `json:"passed"`
	Output    string    `json:"output"`
	RanAt     time.Time `json:"ran_at"`
	Signature string    `json:"signature"`
	QueuedAt  time.Time `json:"queued_at"`
}

// Save writes a result entry to ~/.orbstack/queue/<module-id>-<section-id>-<unix>.json
func Save(orbstackDir string, e *Entry) error {
	dir := filepath.Join(orbstackDir, "queue")
	if err := os.MkdirAll(dir, 0700); err != nil {
		return fmt.Errorf("create queue dir: %w", err)
	}

	e.QueuedAt = time.Now()
	filename := fmt.Sprintf("%s-%s-%d.json", e.ModuleID, e.SectionID, e.QueuedAt.Unix())
	path := filepath.Join(dir, filename)

	data, err := json.MarshalIndent(e, "", "  ")
	if err != nil {
		return fmt.Errorf("marshal entry: %w", err)
	}
	if err := os.WriteFile(path, data, 0600); err != nil {
		return fmt.Errorf("write queue file: %w", err)
	}
	return nil
}

// LoadAll reads every pending entry from ~/.orbstack/queue/
func LoadAll(orbstackDir string) ([]*Entry, error) {
	dir := filepath.Join(orbstackDir, "queue")
	entries, err := os.ReadDir(dir)
	if os.IsNotExist(err) {
		return nil, nil // empty queue, not an error
	}
	if err != nil {
		return nil, fmt.Errorf("read queue dir: %w", err)
	}

	var out []*Entry
	for _, e := range entries {
		if e.IsDir() || filepath.Ext(e.Name()) != ".json" {
			continue
		}
		data, err := os.ReadFile(filepath.Join(dir, e.Name()))
		if err != nil {
			fmt.Fprintf(os.Stderr, "warn: skipping queue file %s: %v\n", e.Name(), err)
			continue
		}
		var entry Entry
		if err := json.Unmarshal(data, &entry); err != nil {
			fmt.Fprintf(os.Stderr, "warn: corrupt queue file %s: %v\n", e.Name(), err)
			continue
		}
		out = append(out, &entry)
	}
	return out, nil
}

// Delete removes a specific entry file after it has been successfully posted.
func Delete(orbstackDir, moduleID, sectionID string, queuedAt time.Time) error {
	filename := fmt.Sprintf("%s-%s-%d.json", moduleID, sectionID, queuedAt.Unix())
	path := filepath.Join(orbstackDir, "queue", filename)
	if err := os.Remove(path); err != nil && !os.IsNotExist(err) {
		return fmt.Errorf("delete queue entry: %w", err)
	}
	return nil
}

// Count returns how many entries are pending. Used for status display.
func Count(orbstackDir string) int {
	entries, _ := LoadAll(orbstackDir)
	return len(entries)
}