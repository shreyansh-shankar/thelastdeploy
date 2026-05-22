// agent/cmd/stop.go
package cmd

import (
	"fmt"
	"net/http"
	"time"

	"github.com/orbstack/agent/internal/lab"
	"github.com/orbstack/agent/internal/localserver"
)

func runStop(args []string) error {
	if localserver.IsRunning() {
		client := &http.Client{Timeout: 2 * time.Second}
		client.Get("http://127.0.0.1:7842/health") // best-effort ping
		fmt.Println("Note: local server still running — press Ctrl+C in the 'orbstack start' terminal to stop it.")
	}
	return lab.Stop()
}