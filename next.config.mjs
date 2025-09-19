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
  // Disable telemetry
  telemetry: false,
  // Optimize webpack for deployment stability
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Reduce webpack parallel processing to avoid Jest worker conflicts
    if (!dev) {
      config.optimization.minimize = true;
      config.optimization.parallelism = 1;
      config.stats = 'errors-only';
      
      // Limit chunk size to avoid memory issues
      config.optimization.splitChunks = {
        ...config.optimization.splitChunks,
        maxSize: 244000,
        cacheGroups: {
          ...config.optimization.splitChunks.cacheGroups,
          default: {
            minChunks: 1,
            priority: -20,
            reuseExistingChunk: true,
          },
        },
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