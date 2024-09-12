/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  transpilePackages: ['@repo/shared'],
  webpack: (config) => {
    config.resolve.alias['@'] = path.resolve(__dirname, 'src'); // '@/...' -> 'src/...'
    return config;
  },
};
