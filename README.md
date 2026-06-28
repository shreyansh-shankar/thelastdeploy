<p align="center">
  <img src="https://img.shields.io/badge/license-Apache%202.0-green?style=flat-square" alt="License" />
  <img src="https://img.shields.io/badge/status-pre--launch-orange?style=flat-square" alt="Status" />
  <img src="https://img.shields.io/badge/built%20in-public-blueviolet?style=flat-square" alt="Built in Public" />
  <img src="https://img.shields.io/github/stars/thelastdeploy/platform?style=flat-square" alt="Stars" />
</p>

<h1 align="center">The Last Deploy</h1>

<p align="center">
  <strong>Learn DevOps by fixing real systems — on your own machine.</strong><br/>
  No cloud fees. No fake terminals. No passive videos.
</p>

---

## What is TLD?

**The Last Deploy** is an open-source DevOps learning platform built around one idea: you only truly learn when something is broken and you have to fix it.

Instead of watching videos or copying commands from tutorials, you:

1. **Spin up a local lab** on your actual machine with one command
2. **Encounter a deliberately broken system** — a misconfigured nginx, a crashed container, a broken git history
3. **Troubleshoot and fix it** using real tools in a real terminal
4. **Run `tld check`** — an automated validator that confirms your fix is correct
5. **Earn XP and progress** through tracks at your own pace

Everything runs locally. No account required to start. No cloud costs. Forever free.

---

## Monorepo Structure

```
/
├── agent/          # tld CLI — written in Go
│   ├── cmd/        # Command implementations (start, check, sync, etc.)
│   └── internal/   # Internal packages
├── challenges/     # Lab content — track directories with sections & validators
│   ├── linux-fundamentals/
│   ├── docker-fundamentals/
│   ├── docker-images/
│   ├── docker-networking/
│   ├── docker-compose/
│   ├── docker-troubleshooting/
│   ├── git-fundamentals/
│   └── ...
├── web/
│   ├── backend/    # REST API — Python / FastAPI
│   └── frontend/   # Web dashboard — Next.js / React
├── landing/        # Marketing landing page — Next.js
├── bin/            # Compiled binaries (gitignored)
├── Makefile        # Dev shortcuts
└── LICENSE         # Apache 2.0
```

---

## Getting Started

### Prerequisites

| Tool | Version |
|------|---------|
| Go   | 1.21+   |
| Node | 18+     |
| Python | 3.11+ |
| Docker | 24+  |

---

### 1 — Build & Install the CLI

```bash
# Build and install tld to /usr/local/bin
make install

# Or build to ./bin/tld without installing
make build
```

### 2 — Authenticate (optional for self-hosted)

```bash
tld login
```

### 3 — Sync labs

```bash
tld sync --all
```

### 4 — Start a lab

```bash
tld start docker-fundamentals
```

### 5 — Validate your solution

```bash
tld check
```

---

### Running the Web Dashboard (local dev)

**Backend (FastAPI)**
```bash
cd web/backend
python -m venv venv && source venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload
```

**Frontend (Next.js)**
```bash
cd web/frontend
npm install
npm run dev
```

---

### Running the Landing Page (local dev)

```bash
cd landing
npm install
npm run dev   # runs on http://localhost:3002
```

---

## Available Tracks

| Track | Status |
|-------|--------|
| Linux Fundamentals | ✅ Available |
| Linux Users & Permissions | ✅ Available |
| Linux Processes & Services | ✅ Available |
| Linux Networking | ✅ Available |
| Git Fundamentals | ✅ Available |
| Docker Fundamentals | ✅ Available |
| Docker Containers | ✅ Available |
| Docker Images | ✅ Available |
| Docker Networking | ✅ Available |
| Docker Storage | ✅ Available |
| Docker Compose | ✅ Available |
| Docker Troubleshooting | ✅ Available |
| Kubernetes Fundamentals | ✅ Available |
| Kubernetes Pods | ✅ Available |
| Terraform | 🔜 Coming Soon |
| Nginx | 🔜 Coming Soon |

---

## Contributing

We welcome contributions of all kinds — new labs, bug fixes, validator improvements, docs, and more.

See [CONTRIBUTING.md](./CONTRIBUTING.md) to get started.

---

## Community

- 💬 **Discord** — [Join the server](https://discord.gg/placeholder) *(link coming soon)*
- ⭐ **GitHub** — Star the repo to follow progress
- 🔧 **Issues** — [Open an issue](https://github.com/thelastdeploy/platform/issues) for bugs or feature requests

---

## License

Licensed under the **Apache License 2.0**. See [LICENSE](./LICENSE) for details.

Copyright 2026 Shreyansh Shankar
