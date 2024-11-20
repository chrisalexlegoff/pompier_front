/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: new URL(process.env.NEXT_PUBLIC_IMAGE_BASE_URL).hostname,
        pathname: '/images/**',
      },
    ],
  },
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    NEXT_PUBLIC_IMAGE_BASE_URL: process.env.NEXT_PUBLIC_IMAGE_BASE_URL,
  },
  experimental: {
    fetchCache: false,
  },
  webpack: (config) => {
    config.resolve.fallback = { ...config.resolve.fallback, https: false };
    return config;
  },
};

export default nextConfig;
