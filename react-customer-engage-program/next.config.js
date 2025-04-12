/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
      },
      {
        protocol: "http",
        hostname: "172.24.2.175",
      },
    ],
    minimumCacheTTL: 15000000,
  },
};

module.exports = nextConfig;
