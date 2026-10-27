import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
  async rewrites() {
    return [
      {
        // Public-facing artifact URLs stay on the portfolio's own domain with
        // no /api prefix, e.g. https://abdul-samad-portfolio.example.com/artifacts/<slug>/<file>.
        source: "/artifacts/:slug/:file",
        destination: "/api/artifacts/:slug/:file",
      },
    ];
  },
};

export default nextConfig;
