import "server-only";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

// Server-only admin client for the shared Supabase project (the schema lives
// in the wedding-saas repo). It uses the service role key, which bypasses
// Row Level Security, so only call it from trusted server code such as the
// Stripe webhook. Returns null when the keys are missing.

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

let adminClient: SupabaseClient | null = null;

export function getSupabaseAdmin(): SupabaseClient | null {
  if (!url || !serviceKey) return null;
  adminClient ??= createClient(url, serviceKey, { auth: { persistSession: false, autoRefreshToken: false } });
  return adminClient;
}
