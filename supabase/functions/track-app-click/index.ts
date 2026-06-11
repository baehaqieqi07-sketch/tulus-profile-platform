// TULUS Supabase Edge Function placeholder.
// Add provider-specific secrets in Supabase dashboard before production use.
import { serve } from 'https://deno.land/std@0.224.0/http/server.ts'

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type' } })
  return Response.json({ ok: true, message: 'TULUS function is ready. Connect secure server-side logic before production action.' }, { headers: { 'Access-Control-Allow-Origin': '*' } })
})
