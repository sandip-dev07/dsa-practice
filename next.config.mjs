/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.google.com',
        pathname: '/s2/favicons/**',
      },
      {
        protocol: 'https',
        hostname: 'icons.duckduckgo.com',
        pathname: '/ip3/**',
      },
      {
        protocol: 'https',
        hostname: 'favicon.yandex.net',
        pathname: '/favicon/**',
      },
    ],
  },
};

export default nextConfig;
