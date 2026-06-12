## Understanding Processes in Linux

In Linux, a **process** is simply an executing instance of a program. Every action you take in a terminal, every server daemon running in the background, and every user application is represented by one or more processes.

---

## 1. Process IDs and Parentage

Every process is assigned a unique identifier called a **Process ID (PID)** when it is created.
- **PID 1 (init/systemd)**: The first process started by the Linux kernel during system boot. It is the direct or indirect ancestor of every other process on the system.
- **PPID (Parent Process ID)**: The process that spawned the current process. For example, when you run a command in `bash`, the `bash` process is the parent (PPID), and the command you executed is the child (PID).

---

## 2. Process Lifecycle and States

Processes are created using a `fork()` system call (which duplicates the parent process) followed by an `exec()` system call (which replaces the process's memory space with the new program).

During its lifetime, a process can be in one of the following major states:
- **Running / Runnable (R)**: The process is actively executing on a CPU core, or is in the queue ready to be scheduled.
- **Sleeping (S / D)**: The process is waiting for an event (such as user keyboard input, disk read, or network packet).
  - *S (Interruptible Sleep)*: Can be woken up by process signals.
  - *D (Uninterruptible Sleep)*: Usually waiting on direct hardware I/O and cannot be interrupted by signals.
- **Stopped (T)**: The process has been suspended (usually by a SIGSTOP signal or by pressing `Ctrl+Z`).
- **Zombie (Z)**: The process has finished execution but its entry is still in the process table because the parent process hasn't read its exit status yet.

---

## Summary

Understanding process structures and lifecycles forms the bedrock of monitoring system load and troubleshooting misbehaving application services. Proceed to the next section to learn how to actively list and monitor processes.
