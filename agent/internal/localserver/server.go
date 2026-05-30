// agent/internal/localserver/server.go
package localserver

// The local HTTP server runs on 127.0.0.1:7842.
//
// Security: binding to 127.0.0.1 (not 0.0.0.0) means this port is only
// reachable from THIS machine. The browser frontend talks to this server to
// check lab status and trigger validation. It is NOT a public API.

import (
	"context"
	"encoding/json"
	"fmt"
	"net"
	"net/http"
	"time"

	"github.com/orbstack/agent/internal/lab"
	"github.com/orbstack/agent/internal/validator"
)

const addr = "127.0.0.1:7842"

// deviceKeyPath is set once when the server starts so handlers can sign results.
var deviceKeyPath string

type Server struct {
	httpServer *http.Server
}

func New(keyPath string) *Server {
	deviceKeyPath = keyPath
	mux := http.NewServeMux()
	s := &Server{}

	mux.HandleFunc("/health", s.handleHealth)
	mux.HandleFunc("/status", s.handleStatus)
	mux.HandleFunc("/check", s.handleCheck)
	mux.HandleFunc("/session", s.handleSession)

	s.httpServer = &http.Server{
		Addr:         addr,
		Handler:      corsMiddleware(mux),
		ReadTimeout:  30 * time.Second,
		WriteTimeout: 60 * time.Second,
	}
	return s
}

// Start begins listening. Blocks until ctx is cancelled.
func (s *Server) Start(ctx context.Context) error {
	ln, err := net.Listen("tcp", addr)
	if err != nil {
		return fmt.Errorf("cannot bind %s: %w", addr, err)
	}
	fmt.Printf("  Local server listening on http://%s\n", addr)

	errCh := make(chan error, 1)
	go func() {
		if err := s.httpServer.Serve(ln); err != nil && err != http.ErrServerClosed {
			errCh <- err
		}
	}()

	select {
	case <-ctx.Done():
		shutCtx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
		defer cancel()
		return s.httpServer.Shutdown(shutCtx)
	case err := <-errCh:
		return err
	}
}

// ---------------------------------------------------------------------------
// Handlers
// ---------------------------------------------------------------------------

func (s *Server) handleHealth(w http.ResponseWriter, r *http.Request) {
	writeJSON(w, http.StatusOK, map[string]string{
		"status":  "ok",
		"version": "0.1.0",
	})
}

func (s *Server) handleStatus(w http.ResponseWriter, r *http.Request) {
	session, err := lab.ReadSession()
	if err != nil {
		writeJSON(w, http.StatusOK, map[string]interface{}{
			"active": false,
		})
		return
	}
	elapsed := time.Since(session.StartedAt).Round(time.Second).String()
	writeJSON(w, http.StatusOK, map[string]interface{}{
		"active":     true,
		"module_id":  session.ModuleID,
		"section_id": session.SectionID,
		"started_at": session.StartedAt,
		"elapsed":    elapsed,
		"setup_type": session.SetupType,
	})
}

// handleSession returns the current session details.
// Renamed from /challenge to /session to match the new module/section model.
func (s *Server) handleSession(w http.ResponseWriter, r *http.Request) {
	session, err := lab.ReadSession()
	if err != nil {
		writeError(w, http.StatusNotFound, "no active lab session")
		return
	}
	writeJSON(w, http.StatusOK, map[string]interface{}{
		"module_id":      session.ModuleID,
		"section_id":     session.SectionID,
		"validator_path": session.ValidatorPath,
		"started_at":     session.StartedAt,
	})
}

func (s *Server) handleCheck(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		writeError(w, http.StatusMethodNotAllowed, "POST required")
		return
	}
	session, err := lab.ReadSession()
	if err != nil {
		writeError(w, http.StatusBadRequest, "no active lab session")
		return
	}
	result, err := validator.Run(session.ModuleID, session.SectionID, session.ValidatorPath, deviceKeyPath)
	if err != nil {
		writeError(w, http.StatusInternalServerError, fmt.Sprintf("validator error: %v", err))
		return
	}
	writeJSON(w, http.StatusOK, map[string]interface{}{
		"module_id":  result.ModuleID,
		"section_id": result.SectionID,
		"passed":     result.Passed,
		"output":     result.Output,
		"ran_at":     result.RanAt,
		"signature":  result.Signature,
	})
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

func corsMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		origin := r.Header.Get("Origin")
		allowed := false
		for _, o := range []string{
			"http://localhost:3000",
			"http://localhost:3001",
			"http://127.0.0.1:3000",
			"https://orbstack.sh",
		} {
			if origin == o {
				allowed = true
				break
			}
		}
		if allowed {
			w.Header().Set("Access-Control-Allow-Origin", origin)
			w.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
			w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")
		}
		if r.Method == http.MethodOptions {
			w.WriteHeader(http.StatusNoContent)
			return
		}
		next.ServeHTTP(w, r)
	})
}

func writeJSON(w http.ResponseWriter, status int, v interface{}) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)
	json.NewEncoder(w).Encode(v)
}

func writeError(w http.ResponseWriter, status int, msg string) {
	writeJSON(w, status, map[string]string{"error": msg})
}

// IsRunning checks if the local server is already accepting connections.
func IsRunning() bool {
	conn, err := net.DialTimeout("tcp", addr, 500*time.Millisecond)
	if err != nil {
		return false
	}
	conn.Close()
	return true
}