/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  trailingSlash: true,
  i18n: {
    locales: ["at", "de", "en"],
    defaultLocale: "de",
  },
};

module.exports = nextConfig;
