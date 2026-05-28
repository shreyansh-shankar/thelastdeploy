## Installing Docker

Docker runs on Linux, macOS, and Windows. The installation method differs slightly per platform.

---

## Linux (Ubuntu/Debian)

The recommended way is using the official Docker repository:

```bash
# Remove old versions if any
sudo apt-get remove docker docker-engine docker.io containerd runc

# Install dependencies
sudo apt-get update
sudo apt-get install ca-certificates curl gnupg

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
sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
```

After installing, add your user to the docker group so you don't need `sudo`:

```bash
sudo usermod -aG docker $USER
newgrp docker
```

Verify:

```bash
docker --version
# Docker version 27.x.x, build xxxxxxx
```

---

## macOS

Install **Docker Desktop** — it includes the Docker Engine, CLI, and a GUI dashboard.

1. Download from [docs.docker.com/desktop/install/mac-install](https://docs.docker.com/desktop/install/mac-install/)
2. Open the `.dmg` and drag Docker to Applications
3. Launch Docker Desktop from Applications
4. Wait for the whale icon in the menu bar to stop animating

Verify in Terminal:

```bash
docker --version
```

---

## Windows

Install **Docker Desktop** with WSL 2 backend (recommended):

1. Install WSL 2 first: `wsl --install` in PowerShell (admin)
2. Download Docker Desktop from [docs.docker.com/desktop/install/windows-install](https://docs.docker.com/desktop/install/windows-install/)
3. Run the installer, ensure "Use WSL 2 instead of Hyper-V" is checked
4. Launch Docker Desktop
5. Verify in PowerShell: `docker --version`

---

## Verifying Your Installation

Once installed on any platform, run a quick sanity check:

```bash
# Check Docker version
docker --version

# Check Docker is running
docker info

# Run the test container (we'll do this properly in the next section)
docker run hello-world
```

If `docker info` returns engine information without errors, you're good to go.

---

## Common Issues

**Permission denied on Linux**
```bash
# You forgot to add yourself to the docker group
sudo usermod -aG docker $USER
# Then log out and back in, or run:
newgrp docker
```

**Docker Desktop not starting on Mac/Windows**
- Make sure virtualisation is enabled in BIOS (Windows)
- Check you have at least 4GB RAM available
- Restart Docker Desktop from the system tray

---

## Recap

- Linux: install via apt with the official Docker repository
- macOS/Windows: install Docker Desktop
- Always verify with `docker --version` and `docker info`
- On Linux, add yourself to the `docker` group to avoid `sudo`