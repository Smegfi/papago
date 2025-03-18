import type { NextConfig } from "next";

const nextConfig: NextConfig = {
   /* config options here */
   cacheMaxMemorySize: 0,
   output: "standalone",
   eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
