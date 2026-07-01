import type { DocPage } from "../types";

const page: DocPage = {
  title: "Troubleshooting",
  description: "Fixes for the most common TLD issues.",
  section: "Getting Started",
  sectionId: "getting-started",
  toc: [
    { id: "docker-not-running", text: "Docker not running", level: 2 },
    { id: "permission-denied", text: "Permission denied", level: 2 },
    { id: "port-conflict", text: "Port already in use", level: 2 },
    { id: "wsl", text: "WSL2 issues", level: 2 },
    { id: "auth", text: "Authentication issues", level: 2 },
    { id: "run-doctor", text: "Run tld doctor", level: 2 },
  ],
  content: [
    {
      type: "callout",
      variant: "tip",
      title: "Start with tld doctor",
      text: "Run `tld doctor` first. It diagnoses the most common issues automatically and tells you exactly what's wrong.",
    },
    {
      type: "heading2",
      text: "Docker not running",
      id: "docker-not-running",
    },
    {
      type: "paragraph",
      text: "Error: `Cannot connect to the Docker daemon`",
    },
    {
      type: "code",
      lang: "bash",
      code: "# Start Docker\nsudo systemctl start docker   # Linux (systemd)\nopen -a Docker                 # macOS (Docker Desktop)\n\n# Verify Docker is running\ndocker info",
    },
    {
      type: "heading2",
      text: "Permission denied",
      id: "permission-denied",
    },
    {
      type: "paragraph",
      text: "Error: `Got permission denied while trying to connect to the Docker daemon socket`",
    },
    {
      type: "code",
      lang: "bash",
      code: "# Add your user to the docker group (Linux only)\nsudo usermod -aG docker $USER\n\n# Apply the group change (log out and back in, or:)\nnewgrp docker\n\n# Verify\ndocker ps",
    },
    {
      type: "heading2",
      text: "Port already in use",
      id: "port-conflict",
    },
    {
      type: "paragraph",
      text: "Error: `Bind for 0.0.0.0:8080 failed: port is already allocated`",
    },
    {
      type: "code",
      lang: "bash",
      code: "# Find what's using the port\nlsof -i :8080\n# or\nss -tlnp | grep 8080\n\n# Kill the process\nsudo kill $(lsof -t -i:8080)\n\n# Or stop any running lab containers\ntld lab stop\ndocker ps -q | xargs docker stop",
    },
    {
      type: "heading2",
      text: "WSL2 issues",
      id: "wsl",
    },
    {
      type: "callout",
      variant: "warning",
      title: "WSL2 requirements",
      text: "You must use WSL2 (not WSL1). Docker Desktop must have WSL2 integration enabled for your distro.",
    },
    {
      type: "code",
      lang: "bash",
      code: "# Check WSL version\nwsl --list --verbose\n# Should show VERSION 2 for your distro\n\n# Upgrade a distro to WSL2\nwsl --set-version Ubuntu-22.04 2\n\n# Verify Docker is accessible inside WSL\ndocker info",
    },
    {
      type: "heading2",
      text: "Authentication issues",
      id: "auth",
    },
    {
      type: "code",
      lang: "bash",
      code: "# Clear cached credentials and re-authenticate\ntld logout\ntld login\n\n# If login fails, check network connectivity\ncurl https://api.thelastdeploy.com/health",
    },
    {
      type: "heading2",
      text: "Run tld doctor",
      id: "run-doctor",
    },
    {
      type: "code",
      lang: "bash",
      code: "tld doctor\n\n# Sample output:\n# ✓ Docker daemon is running (24.0.5)\n# ✓ Docker socket is accessible\n# ✓ Current user is in docker group\n# ✗ Disk space low: 2.1GB free (recommend 10GB+)\n# ✓ Network connectivity OK\n# ✓ TLD CLI is up to date (v0.1.2)\n#\n# 1 issue found. See above for details.",
    },
    {
      type: "paragraph",
      text: "If `tld doctor` doesn't identify your issue, open a GitHub issue or ask in Discord with the full output of `tld doctor` and a description of what you were doing when the error occurred.",
    },
  ],
};

export default page;
