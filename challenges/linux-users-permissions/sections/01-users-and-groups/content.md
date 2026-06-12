## Users and Groups in Linux

Linux is a multi-user operating system from the ground up. Multiple users can log in simultaneously, each running processes, managing files, and connecting to services. To maintain security, Linux uses **Users** and **Groups** to control access.

---

## 1. User Accounts and UIDs

Every user account on a Linux system is identified by a unique username and a corresponding numerical **User ID (UID)**.
- **Root User (UID 0)**: The superuser or system administrator. Has unrestricted access to all files and commands.
- **System Users (UIDs 1–999)**: Created by the OS to run background services and daemons (e.g., `nobody`, `daemon`, `nginx`). They usually do not have login shells.
- **Regular Users (UIDs 1000+)**: Standard accounts created for humans to interact with the system.

User account definitions are stored in the world-readable text file `/etc/passwd`. Each line has the following format:
```
username:x:UID:GID:Full Name:Home Directory:Login Shell
```
*(The `x` indicates that encrypted password hashes are stored securely in `/etc/shadow` instead of `/etc/passwd`.)*

---

## 2. Groups and GIDs

A **Group** is a logical collection of user accounts. Standardizing permissions for a group makes it simple to grant access to multiple users at once.
- **Primary Group**: Every user belongs to exactly one primary group (usually matching their username on modern distributions). When a user creates a file, the file's group ownership defaults to the user's primary group.
- **Secondary Groups**: A user can belong to zero or more secondary (or supplementary) groups to gain additional system permissions (e.g., `sudo`, `docker`, `wheel`).

Group definitions are stored in the world-readable text file `/etc/group`:
```
group_name:x:GID:member_user1,member_user2
```

---

## 3. Querying User and Group Info

You can identify users and groups using standard system queries:
- **whoami**: Prints the username associated with the current effective user ID.
- **id**: Displays the active UID, GID, and a complete list of groups the current user belongs to.
- **groups**: A shorthand command that prints only the names of all groups the user belongs to.

---

## Lab Tasks

### Task 1: Identify your active username
1. Start the lab in your terminal:
   ```bash
   tld start lnx-identify-user
   ```
2. Query the system to find the active username of your current session.
3. Save that exact username string on a single line to a file named `current_user.txt` inside a new directory named `users-groups-test` in your home directory.
4. Verify the task:
   ```bash
   tld check
   ```

### Task 2: Check your group memberships
1. Start the lab in your terminal:
   ```bash
   tld start lnx-group-membership
   ```
2. Query the system to find all the group names that your active user account belongs to.
3. Save that list of group names, separated by spaces or on new lines, to a file named `my_groups.txt` inside the `~/users-groups-test` directory.
4. Verify the task:
   ```bash
   tld check
   ```
