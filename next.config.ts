/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // ✅ Allows images from ANY domain
      },
    ],
    domains: ["your-supabase-url.supabase.co", "cdn.example.com"], // ✅ Add specific known domains if needed
  },
};

module.exports = nextConfig;
