import type { DocPage } from "../types";
const page: DocPage = {
  title: "Linux Basics",
  description: "Essential Linux knowledge every DevOps engineer needs.",
  section: "Learn", sectionId: "learn",
  toc: [
    { id: "filesystem", text: "Filesystem hierarchy", level: 2 },
    { id: "permissions", text: "File permissions", level: 2 },
    { id: "processes", text: "Processes", level: 2 },
  ],
  content: [
    { type: "heading2", text: "Filesystem hierarchy", id: "filesystem" },
    { type: "table", headers: ["Directory", "Purpose"], rows: [
      ["/", "Root of the filesystem"],
      ["/etc", "System-wide configuration files"],
      ["/var", "Variable data — logs, caches, databases"],
      ["/tmp", "Temporary files — cleared on reboot"],
      ["/usr/bin", "User binaries — most commands live here"],
      ["/home", "User home directories"],
      ["/proc", "Virtual filesystem — kernel and process info"],
    ]},
    { type: "heading2", text: "File permissions", id: "permissions" },
    { type: "code", lang: "bash", code: "ls -la /etc/nginx/nginx.conf\n# -rw-r--r-- 1 root root 2611 Jan 15 10:23 /etc/nginx/nginx.conf\n#\n# Permission breakdown:\n# owner: read + write\n# group: read only\n# other: read only\n\n# Change permissions\nchmod 644 myfile.txt     # owner rw, group r, other r\nchmod +x script.sh       # add execute for all\nchown user:group file    # change owner and group" },
    { type: "heading2", text: "Processes", id: "processes" },
    { type: "code", lang: "bash", code: "# List processes\nps aux                   # all processes\nps aux | grep nginx      # filter by name\ntop                      # interactive process viewer\n\n# Kill a process\nkill 1234                # graceful SIGTERM\nkill -9 1234             # force kill SIGKILL\npkill nginx              # kill by name" },
    { type: "callout", variant: "tip", title: "Practice in TLD", text: "The Linux track has labs covering filesystem navigation, file permissions, process management, and networking." },
  ],
};
export default page;
