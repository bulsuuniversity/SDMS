/** @type {import('next').NextConfig} */
module.exports = {
  concurrentFeatures: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
    ],
  },
}
