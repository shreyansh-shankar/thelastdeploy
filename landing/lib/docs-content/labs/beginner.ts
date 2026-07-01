import type { DocPage } from "../types";
const page: DocPage = {
  title: "Beginner Labs",
  description: "Start here. Single-concept labs with guided hints.",
  section: "Labs", sectionId: "labs",
  toc: [{ id: "labs", text: "Labs", level: 2 }],
  content: [
    { type: "heading2", text: "Labs", id: "labs" },
    { type: "lab-list", labs: [
      { id: "lnx-basic-navigation", title: "Filesystem Navigation", description: "Navigate the Linux filesystem, find files, and understand directory structure.", difficulty: "beginner", timeEstimate: "10 min", track: "Linux" },
      { id: "lnx-file-permissions", title: "Fix File Permissions", description: "A script is failing because of incorrect permissions. Find and fix the issue.", difficulty: "beginner", timeEstimate: "15 min", track: "Linux" },
      { id: "dkr-fix-stopped-container", title: "Fix a Stopped Container", description: "A containerized web service has exited unexpectedly. Diagnose and restart it.", difficulty: "beginner", timeEstimate: "10 min", track: "Docker" },
      { id: "dkr-fix-broken-dockerfile", title: "Fix a Broken Dockerfile", description: "A Dockerfile has syntax and logic errors. Fix it so the image builds successfully.", difficulty: "beginner", timeEstimate: "15 min", track: "Docker" },
      { id: "git-undo-commit", title: "Undo the Last Commit", description: "You committed to the wrong branch. Undo it without losing your changes.", difficulty: "beginner", timeEstimate: "10 min", track: "Git" },
      { id: "k8s-fix-pod-crashloop", title: "Fix a CrashLoopBackOff Pod", description: "A pod keeps crashing. Read the logs, find the cause, and fix it.", difficulty: "beginner", timeEstimate: "15 min", track: "Kubernetes" },
    ]},
  ],
};
export default page;
