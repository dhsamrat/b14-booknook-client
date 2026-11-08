import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: false,
  partialPrefetching: false,
  reactCompiler: true,

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
       {
        protocol: "https",
        hostname: "covers.openlibrary.org",
      },
       {
        protocol: "https",
        hostname: "images-na.ssl-images-amazon.com",
      },
    ],
  },

  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;