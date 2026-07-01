import type { DocPage } from "../types";

const page: DocPage = {
  title: "Your First Lab",
  description: "A complete walkthrough of starting, solving, and validating your first TLD lab.",
  section: "Getting Started",
  sectionId: "getting-started",
  toc: [
    { id: "pick-a-lab", text: "Pick a lab", level: 2 },
    { id: "start", text: "Start the lab", level: 2 },
    { id: "read-scenario", text: "Read the scenario", level: 2 },
    { id: "investigate", text: "Investigate", level: 2 },
    { id: "fix-it", text: "Fix it", level: 2 },
    { id: "validate", text: "Validate", level: 2 },
    { id: "cleanup", text: "Cleanup", level: 2 },
  ],
  content: [
    {
      type: "paragraph",
      text: "This walkthrough uses the `dkr-fix-stopped-container` lab — a beginner Docker lab where a container has stopped unexpectedly and you need to diagnose and restart it correctly.",
    },
    {
      type: "heading2",
      text: "Pick a lab",
      id: "pick-a-lab",
    },
    {
      type: "code",
      lang: "bash",
      code: "# See all available labs by track\ntld lab list\n\n# Filter by track\ntld lab list --track docker\n\n# Output:\n# TRACK              LAB ID                          DIFFICULTY   STATUS\n# docker             dkr-fix-stopped-container       beginner     available\n# docker             dkr-fix-broken-dockerfile       beginner     available\n# docker             dkr-container-networking        intermediate available\n# ...",
    },
    {
      type: "heading2",
      text: "Start the lab",
      id: "start",
    },
    {
      type: "code",
      lang: "bash",
      code: "tld lab start dkr-fix-stopped-container\n\n# Pulling lab environment... done\n# Starting containers...\n#\n# Lab: Fix the Stopped Container\n# Difficulty: Beginner\n# Track: Docker\n#\n# Something is wrong. A containerized web service has stopped.\n# Your job: get it running again and serving traffic on port 8080.\n#\n# Read the full scenario: cat ~/.tld/labs/current/README.md\n# When ready: tld check",
    },
    {
      type: "heading2",
      text: "Read the scenario",
      id: "read-scenario",
    },
    {
      type: "code",
      lang: "bash",
      code: "cat ~/.tld/labs/current/README.md",
    },
    {
      type: "callout",
      variant: "info",
      title: "Read the whole README",
      text: "The README contains the scenario, your objective, and any constraints. Skipping it means missing context that makes the fix obvious.",
    },
    {
      type: "heading2",
      text: "Investigate",
      id: "investigate",
    },
    {
      type: "code",
      lang: "bash",
      code: "# Check what containers exist\ndocker ps -a\n# CONTAINER ID  IMAGE          STATUS                    NAMES\n# a3f9b2c1d4e5  nginx:alpine   Exited (1) 2 minutes ago  web-service\n\n# Check the logs to see why it exited\ndocker logs web-service\n# nginx: [emerg] bind() to 0.0.0.0:80 failed (98: Address already in use)\n\n# Check what's using port 80\nlsof -i :80",
    },
    {
      type: "heading2",
      text: "Fix it",
      id: "fix-it",
    },
    {
      type: "code",
      lang: "bash",
      code: "# Kill the process occupying port 80\nsudo kill $(lsof -t -i:80)\n\n# Restart the container\ndocker start web-service\n\n# Verify it's running\ndocker ps\n# CONTAINER ID  IMAGE          STATUS        NAMES\n# a3f9b2c1d4e5  nginx:alpine   Up 3 seconds  web-service\n\n# Confirm it's serving\ncurl http://localhost:8080",
    },
    {
      type: "heading2",
      text: "Validate",
      id: "validate",
    },
    {
      type: "code",
      lang: "bash",
      code: "tld check\n\n# Running validator...\n# ✓ Container web-service is running\n# ✓ Container has been running for > 30 seconds\n# ✓ Port 8080 is accessible\n# ✓ HTTP 200 response from http://localhost:8080\n#\n# All 4 checks passed.\n# Lab complete! +150 XP earned.",
    },
    {
      type: "heading2",
      text: "Cleanup",
      id: "cleanup",
    },
    {
      type: "code",
      lang: "bash",
      code: "# Stop and remove the lab environment\ntld lab stop\n\n# Or force-remove everything including volumes\ntld lab stop --clean",
    },
    {
      type: "callout",
      variant: "tip",
      title: "Next steps",
      text: "Now try a lab without hints. Browse the Beginner Labs page for your next challenge.",
    },
  ],
};

export default page;
