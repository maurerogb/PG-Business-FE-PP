import withBundleAnalyzer from "@next/bundle-analyzer";
import withPlugins from "next-compose-plugins";
import { env } from "./env.mjs";

/**
 * @type {import('next').NextConfig}
 */
const config = withPlugins([[withBundleAnalyzer({ enabled: env.ANALYZE })]], {
  reactStrictMode: true,
  images: {
    domains: ["137.184.47.182"],
  },
  rewrites() {
    return [
      // {
      //   source: "/payaccess/api/v1",
      //   destination: "http://137.184.47.182:8081/payaccess/api/v1",
      // },
      { source: "/healthz", destination: "/api/health" },
      { source: "/api/healthz", destination: "/api/health" },
      { source: "/health", destination: "/api/health" },
      { source: "/ping", destination: "/api/health" },
    ];
  },
});

export default config;
