import type { NextConfig } from "next";
import withPWA from "next-pwa";

const config = withPWA({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
  register: true,
  scope: "/app",
  sw: "service-worker.js",
});

const nextConfig: NextConfig = {
  ...config,
};

export default nextConfig;
