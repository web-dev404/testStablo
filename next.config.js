/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        hostname: "**",
      },
    ],
  },
  env:{
    BASE_URL: process.env.BASE_URL,
  }
}
