import type { NextConfig } from "next";
import withPWA from "next-pwa";

const config = withPWA({
  dest: "public",
});

const nextConfig: NextConfig = {
  ...config,
};

export default nextConfig;
