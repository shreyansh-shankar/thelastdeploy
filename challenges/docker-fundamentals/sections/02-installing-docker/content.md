## Installing Docker

Docker Desktop is the easiest way to get Docker running on your local machine. It bundles the Docker daemon, CLI, and a GUI into a single installer.

---

## macOS

1. Download Docker Desktop from [docs.docker.com/desktop/install/mac-install](https://docs.docker.com/desktop/install/mac-install/)
2. Open the `.dmg` and drag Docker to Applications
3. Launch Docker Desktop from Applications
4. Wait for the whale icon in the menu bar to stop animating — Docker is ready

```bash
# Verify installation
docker --version
docker run hello-world
```

---

## Linux (Ubuntu / Debian)

```bash
# Remove old versions if any
sudo apt-get remove docker docker-engine docker.io containerd runc

# Install dependencies
sudo apt-get update
sudo apt-get install -y ca-certificates curl gnupg

# Add Docker's official GPG key
sudo install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | \
  sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg

# Add the repository
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] \
  https://download.docker.com/linux/ubuntu \
  $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# Install Docker Engine
sudo apt-get update
sudo apt-get install -y docker-ce docker-ce-cli containerd.io

# Allow running docker without sudo
sudo usermod -aG docker $USER
newgrp docker
```

---

## Windows

1. Enable WSL 2 — Docker Desktop requires it on Windows
2. Download Docker Desktop from [docs.docker.com/desktop/install/windows-install](https://docs.docker.com/desktop/install/windows-install/)
3. Run the installer and restart when prompted
4. Launch Docker Desktop — it starts automatically with Windows after install

---

## Verify Your Installation

Run these commands in a terminal to confirm everything is working:

```bash
# Check the CLI is available
docker --version
# Docker version 26.x.x, build ...

# Check the daemon is running
docker info
# Should print system info — no errors

# Run a test container
docker run hello-world
# Should print "Hello from Docker!"
```

If `docker info` returns a connection error, the Docker daemon isn't running — open Docker Desktop and wait for it to fully start.

---

## Quick Recap

- **macOS / Windows**: use Docker Desktop — it handles everything
- **Linux**: install Docker Engine via apt/yum, add your user to the `docker` group
- Verify with `docker run hello-world` — if it prints a greeting, you're ready