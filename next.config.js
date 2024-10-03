/** @type {import('next').NextConfig} */
import nextPwa from 'next-pwa';
const nextConfig = {};

const withPWA = nextPwa({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
});

const config = withPWA({
  ...nextConfig,
});

export default config;
