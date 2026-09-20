/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  webpack: (config) => {
    // Tiled maps (.tmj) used by the live office are plain JSON text — load them as raw strings.
    config.module.rules.push({ test: /\.tmj$/, type: "asset/source" });
    return config;
  },
};

export default nextConfig;
