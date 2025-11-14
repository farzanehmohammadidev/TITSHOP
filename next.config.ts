import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
      },
      {
        protocol: "https",
        hostname: "psnex.ir",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "banner.storage.c2.liara.space",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
