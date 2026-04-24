import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow Lovable preview hosts to load Next.js dev resources (fonts, HMR, etc.)
  allowedDevOrigins: [
    "*.lovableproject.com",
    "*.lovable.app",
    "*.lovable.dev",
  ],
  env: {
    // Bridge legacy VITE_* env (auto-provisioned by Lovable Cloud) to Next public vars
    NEXT_PUBLIC_SUPABASE_URL: process.env.VITE_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.VITE_SUPABASE_PUBLISHABLE_KEY,
    NEXT_PUBLIC_SUPABASE_PROJECT_ID: process.env.VITE_SUPABASE_PROJECT_ID,
  },
};

export default nextConfig;
