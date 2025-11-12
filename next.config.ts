import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  experimental: {},
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.technolife.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "pspro.ir",
        pathname: "/**",
      },{
        protocol: "https",
        hostname: "psnex.ir",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
