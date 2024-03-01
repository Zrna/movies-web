/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  webpack(nextConfig) {
    nextConfig.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    return nextConfig;
  },
};

module.exports = nextConfig;
