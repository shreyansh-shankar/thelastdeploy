import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // docs.thelastdeploy.com → thelastdeploy.com/docs
      {
        source: "/:path*",
        has: [{ type: "host", value: "docs.thelastdeploy.com" }],
        destination: "https://thelastdeploy.com/docs/:path*",
        permanent: false,
      },
      // /docs root → welcome page
      {
        source: "/docs",
        destination: "/docs/introduction/welcome",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
