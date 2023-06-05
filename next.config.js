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
};

module.exports = nextConfig;
