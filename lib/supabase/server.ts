import { createClient } from "@supabase/supabase-js"

// Types generated via: npx supabase gen types typescript --local > types/supabase.ts
// For now, use generic Database type placeholder.

export function createServerClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
