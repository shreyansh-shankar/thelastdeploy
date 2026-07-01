import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
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
