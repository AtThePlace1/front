/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
        port: '',
        search: '',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '10010',
        pathname: '/image/**',
      },
    ],
  },
};

export default nextConfig;
