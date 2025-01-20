import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    formats: ["image/webp"],
    deviceSizes: [],
    imageSizes: [160, 1000],
  },
};

export default nextConfig;
