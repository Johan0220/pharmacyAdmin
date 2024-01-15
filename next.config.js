/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'pharmacyonline.azurewebsites.net',
      },
      {
        protocol: 'https',
        hostname: 'flowbite.com',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
    
    ]
  },
}

module.exports = nextConfig
