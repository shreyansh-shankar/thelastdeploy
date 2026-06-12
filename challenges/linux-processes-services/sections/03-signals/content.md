## Process Signals (kill)

Processes communicate with each other and the operating system using asynchronous notifications called **signals**. Signals tell a process to stop, pause, resume, or reload configurations.

---

## 1. Common Linux Signals

Each signal has a name and a corresponding numeric value. The most important signals include:

| Signal Name | Number | Purpose | Can be caught/ignored? |
| --- | --- | --- | --- |
| **SIGTERM** | 15 | Gracefully terminate a process. This is the default signal sent by `kill`. Allows the process to save state and clean up resources. | Yes |
| **SIGKILL** | 9 | Forcefully and immediately terminate a process. The process cannot catch, block, or ignore this signal. | No |
| **SIGSTOP** | 19 / 17 | Suspend (pause) process execution. The process is paused until it receives a SIGCONT. | No |
| **SIGCONT** | 18 / 19 | Resume execution of a previously suspended process. | Yes |
| **SIGHUP** | 1 | Hangup. Often used to instruct daemon processes to reload configuration files without stopping. | Yes |

---

## 2. Sending Signals (`kill`, `pkill`, `killall`)

- **kill**: Sends a signal to a process by its PID.
  ```bash
  # Send SIGTERM (graceful)
  kill 1240
  
  # Send SIGKILL (forceful)
  kill -9 1240
  # or
  kill -SIGKILL 1240
  ```
- **pkill**: Sends a signal to processes matching a pattern or name.
  ```bash
  pkill -9 bad_process
  ```
- **killall**: Sends a signal to all processes running a specific command.
  ```bash
  killall -HUP nginx
  ```

---

## Lab Tasks

### Task 1: Terminate a misbehaving process
1. Start the lab in your terminal:
   ```bash
   tld start lnx-stop-misbehaving-process
   ```
2. The setup script spawned a background process named `bad_process`.
3. Locate this process on the system and terminate it.
4. Verify the task:
   ```bash
   tld check
   ```
