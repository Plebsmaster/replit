/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: false,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  images: {
    unoptimized: true,
  },
  // Optimize webpack for deployment stability
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Reduce webpack parallel processing to avoid Jest worker conflicts
    if (!dev) {
      config.parallelism = 1;
      config.optimization = {
        ...config.optimization,
        minimize: true,
      };
    }
    return config;
  },
  // Allow all hosts for Replit proxy environment
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
        ],
      },
    ];
  },
  // Configure for development in Replit
  experimental: {
    allowedRevalidateHeaderKeys: [],
    // Reduce memory usage during builds
    webpackBuildWorker: false,
  },
  // Output configuration for better caching
  output: 'standalone',
}

export default nextConfig