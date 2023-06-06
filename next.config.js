/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/projects',
        permanent: process.env.NODE_ENV === 'production',
      },
    ];
  },
  images: {
    loader: 'custom',
    loaderFile: './imgLoader.js',
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.ctfassets.net',
        port: '',
      },
    ],
  },
};

module.exports = nextConfig;
