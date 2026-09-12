/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,
  devIndicators: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "layouts.divi-templatespro.com",
      },
    ],
  },
};

export default nextConfig;
