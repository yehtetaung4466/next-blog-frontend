/** @type {import('next').NextConfig} */
const nextConfig = {
  crossOrigin: 'anonymous',
  images: {
    remotePatterns: [
      {hostname: '*'}
    ],
  },
};

module.exports = nextConfig;
