import type { DocPage } from "../types";
const page: DocPage = {
  title: "Docker Concepts",
  description: "Containers, images, registries, and the Docker architecture explained.",
  section: "Learn", sectionId: "learn",
  toc: [
    { id: "what-is-docker", text: "What is Docker?", level: 2 },
    { id: "images-vs-containers", text: "Images vs Containers", level: 2 },
    { id: "networking", text: "Networking", level: 2 },
  ],
  content: [
    { type: "heading2", text: "What is Docker?", id: "what-is-docker" },
    { type: "paragraph", text: "Docker is a platform for building, shipping, and running applications in containers. A container is a lightweight, isolated environment that packages your application and its dependencies together." },
    { type: "paragraph", text: "Unlike virtual machines, containers share the host OS kernel. This makes them start in milliseconds and use far less memory than VMs." },
    { type: "heading2", text: "Images vs Containers", id: "images-vs-containers" },
    { type: "table", headers: ["Concept", "Analogy", "Description"], rows: [
      ["Image", "Blueprint / recipe", "Read-only template that defines what the container will contain"],
      ["Container", "Running instance", "A live, running process created from an image"],
      ["Registry", "App store", "A place to store and distribute images (Docker Hub, GHCR)"],
      ["Dockerfile", "Build instructions", "A text file that defines how to build an image"],
    ]},
    { type: "heading2", text: "Networking", id: "networking" },
    { type: "paragraph", text: "Docker creates virtual networks that containers can join. By default, containers on the same network can communicate with each other by container name." },
    { type: "code", lang: "bash", code: "# Create a network\ndocker network create my-network\n\n# Run containers on the same network\ndocker run -d --name db --network my-network postgres\ndocker run -d --name app --network my-network my-app\n\n# app can reach db at hostname 'db'" },
    { type: "callout", variant: "tip", title: "Practice with TLD", text: "The Docker Networking track has labs where you fix broken container network configurations." },
  ],
};
export default page;
