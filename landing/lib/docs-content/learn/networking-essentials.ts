import type { DocPage } from "../types";
const page: DocPage = {
  title: "Networking Essentials",
  description: "DNS, TCP/IP, HTTP, ports, and the networking knowledge DevOps engineers need.",
  section: "Learn", sectionId: "learn",
  toc: [
    { id: "ip-ports", text: "IP addresses and ports", level: 2 },
    { id: "dns", text: "DNS", level: 2 },
    { id: "http", text: "HTTP", level: 2 },
  ],
  content: [
    { type: "heading2", text: "IP addresses and ports", id: "ip-ports" },
    { type: "paragraph", text: "Every machine on a network has an IP address. Every service on a machine listens on a port. Together, IP:port uniquely identifies a service." },
    { type: "code", lang: "bash", code: "# See your IP addresses\nip addr show\nhostname -I\n\n# See what is listening on ports\nss -tlnp           # modern\nnetstat -tlnp      # older systems\nlsof -i :80        # what is on port 80\n\n# Common ports\n# 22   SSH\n# 80   HTTP\n# 443  HTTPS\n# 5432 PostgreSQL\n# 6379 Redis" },
    { type: "heading2", text: "DNS", id: "dns" },
    { type: "paragraph", text: "DNS translates domain names like thelastdeploy.com to IP addresses. Every network request starts with a DNS lookup." },
    { type: "code", lang: "bash", code: "# Look up a domain\nnslookup thelastdeploy.com\ndig thelastdeploy.com\n\n# Local DNS config\ncat /etc/resolv.conf   # DNS servers\ncat /etc/hosts         # Local overrides" },
    { type: "heading2", text: "HTTP", id: "http" },
    { type: "paragraph", text: "HTTP is the protocol that powers the web. Every request has a method, headers, and optionally a body. Every response has a status code." },
    { type: "table", headers: ["Status code", "Meaning"], rows: [
      ["200 OK", "Success"],
      ["201 Created", "Resource created"],
      ["301/302", "Redirect"],
      ["400 Bad Request", "Client error — bad input"],
      ["401 Unauthorized", "Auth required"],
      ["403 Forbidden", "Auth succeeded but no permission"],
      ["404 Not Found", "Resource does not exist"],
      ["500 Internal Server Error", "Server-side bug"],
      ["502 Bad Gateway", "Upstream service failed"],
      ["503 Service Unavailable", "Service overloaded or down"],
    ]},
  ],
};
export default page;
