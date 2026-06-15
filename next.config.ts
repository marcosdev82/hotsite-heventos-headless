import type { NextConfig } from "next";
import { withFaust } from "@faustwp/core";

const nextConfig: NextConfig = {
  /**
   * Allow cross-origin requests from specified origins in development
   * Add 192.168.1.* to allow local network development
   */
  allowedDevOrigins: ["192.168.1.*"],

  output: "standalone",

  /**
   * Image optimization configuration
   * Allows remote images from any source
   */
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
    /**
     * Image optimization settings
     */
    minimumCacheTTL: 60 * 60 * 24 * 365, // 1 year
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  /**
   * Performance optimizations
   */
  experimental: {
    /**
     * Optimize package imports for faster builds
     */
    optimizePackageImports: ["@faustwp/blocks", "@faustwp/core"],

    /**
     * Enable React 19 features if available
     */
    reactCompiler: false,
  },

  /**
   * Custom webpack configuration (if needed)
   */
  webpack: (config) => {
    return config;
  },

  /**
   * Security headers
   */
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
        ],
      },
    ];
  },

  /**
   * Redirects for SEO and legacy URLs
   */
  async redirects() {
    return [
      // Add legacy URL redirects here
      // Example:
      // {
      //   source: "/old-path/:slug",
      //   destination: "/new-path/:slug",
      //   permanent: true,
      // },
    ];
  },

  /**
   * Rewrite rules
   */
  async rewrites() {
    return {
      beforeFiles: [
        // Add rewrites here if needed
      ],
    };
  },
};

export default withFaust(nextConfig);

