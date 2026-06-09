import type { NextConfig } from "next";
import { withFaust } from "@faustwp/core";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "http",
        hostname: "localhost",
      },
    ],
  },
  experimental: {
    optimizePackageImports: ["@faustwp/blocks", "@faustwp/core"],
  },
};

export default withFaust(nextConfig);
