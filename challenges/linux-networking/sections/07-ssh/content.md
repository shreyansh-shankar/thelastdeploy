## Secure Shell (SSH)

The **SSH (Secure Shell)** protocol is the industry standard for securely connecting to remote Linux servers, running commands, and transferring files over unencrypted networks.

---

## 1. Public Key Cryptography

SSH authentication typically uses public-key cryptography, which relies on a matching pair of keys:
- **Private Key**: Kept secretly on the client machine (never shared!).
- **Public Key**: Placed on remote servers to authorize access.

---

## 2. Generating Key Pairs (`ssh-keygen`)

To generate a new key pair:
```bash
ssh-keygen -t rsa -b 4096
# or modern ed25519
ssh-keygen -t ed25519
```
This creates:
- `~/.ssh/id_rsa` (Private key)
- `~/.ssh/id_rsa.pub` (Public key)

---

## 3. Configuring Passwordless Login (`authorized_keys`)

To enable passwordless access to a remote host:
1. **Append your public key**: You copy your public key to the remote server's `~/.ssh/authorized_keys` file.
2. **Standard utility**: The `ssh-copy-id` command simplifies this:
   ```bash
   ssh-copy-id user@remote-host
   ```
   *(Behind the scenes, it copies the public key and appends it to `~/.ssh/authorized_keys` on the remote server, while setting safe permissions).*

---

## Lab Tasks

### Task 1: Generate an SSH key pair
1. Start the lab in your terminal:
   ```bash
   tld start lnx-ssh-login
   ```
2. Generate a standard SSH key pair (e.g. RSA or ED25519) in your user's default SSH folder (`~/.ssh/`).
3. Verify the task:
   ```bash
   tld check
   ```

### Task 2: Setup passwordless login to localhost
1. Start the lab in your terminal:
   ```bash
   tld start lnx-passwordless-login
   ```
2. Configure passwordless SSH login to your own local user account (`localhost`).
3. You must be able to run `ssh localhost` without being prompted for a password.
4. Verify the task:
   ```bash
   tld check
   ```
