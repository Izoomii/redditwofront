/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  //added to redirect to main page

  async redirects() {
    return [
      {
        source: "/",
        destination: "/main",
        permanent: true,
      },
    ];
  },

};
