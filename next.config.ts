import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export: deploys anywhere (Vercel, GitHub Pages, Netlify).
  output: "export",
  images: { unoptimized: true },
};

export default nextConfig;
