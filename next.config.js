/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    config.resolve.fallback = { fs: false, net: false, tls: false };
    return config;
  },
  images: {
    domains: [
      'localhost',
      'creator-console-assets.s3.ap-south-1.amazonaws.com',
      'nft-cdn.alchemy.com',
    ],
  },
};

module.exports = nextConfig;
