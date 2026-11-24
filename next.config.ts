import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Lets a local production build use its own folder (NEXT_DIST_DIR=.next-prod)
  // so it never overwrites the dev server's .next while both are running.
  distDir: process.env.NEXT_DIST_DIR || ".next",
};

export default nextConfig;
