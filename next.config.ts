import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow Lovable preview hosts to load Next.js dev resources (fonts, HMR, etc.)
  allowedDevOrigins: ["*.lovableproject.com", "*.lovable.app", "*.lovable.dev"],
  env: {
    // Bridge legacy VITE_* env (auto-provisioned by Lovable Cloud) to Next public vars
    NEXT_PUBLIC_SUPABASE_URL: "https://cubbqugznqmoizzkxnnh.supabase.co",
    NEXT_PUBLIC_SUPABASE_ANON_KEY:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN1YmJxdWd6bnFtb2l6emt4bm5oIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzcwMTcwOTksImV4cCI6MjA5MjU5MzA5OX0.KFFl_HA8RaGuvS4CFJVzndOBELm_kWmnWTWZcuxqwiI",
    NEXT_PUBLIC_SUPABASE_PROJECT_ID: "cubbqugznqmoizzkxnnh",
  },
};

export default nextConfig;
