import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  // Disable server-side features for static export
  basePath: process.env.NODE_ENV === 'production' ? '/ecommerce-platform' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/ecommerce-platform/' : '',
};

export default nextConfig;
