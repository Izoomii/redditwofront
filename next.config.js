/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  // async redirects() {
  //   return [
  //     {
  //       source: "/about",
  //       destination: "/",
  //       permanent: true,
  //     },
  //   ];
  // },
};
