import type { NextConfig } from "next";

const MAIN_DOMAIN = "www.sreedhanalakshmienterprises.in";

const nextConfig: NextConfig = {
  reactCompiler: true,

  // Block Vercel preview domain from being indexed by Google
  async headers() {
    return [
      {
        // Apply to all routes on the Vercel preview domain
        source: "/:path*",
        headers: [
          {
            key: "X-Robots-Tag",
            value: "noindex, nofollow",
          },
        ],
        // Only apply this header on the Vercel preview domain, not main
        has: [
          {
            type: "host",
            value: "(?!www\\.sreedhanalakshmienterprises\\.in).*",
          },
        ],
      },
    ];
  },

  // Redirect all traffic from Vercel preview URL to main domain
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "sde-enterprises.vercel.app",
          },
        ],
        destination: `https://${MAIN_DOMAIN}/:path*`,
        permanent: true, // 301 redirect — tells Google to transfer SEO equity
      },
    ];
  },
};

export default nextConfig;
