import { serve } from 'https://deno.land/std@0.224.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS'
}

async function isOwner(supabase: any, userId: string) {
  const { data } = await supabase.from('user_roles').select('role').eq('user_id', userId).eq('role', 'owner').maybeSingle()
  return Boolean(data)
}

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })
  if (req.method !== 'POST') return new Response(JSON.stringify({ error: 'method_not_allowed' }), { status: 405, headers: corsHeaders })

  const supabaseUrl = Deno.env.get('SUPABASE_URL')!
  const serviceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
  const authHeader = req.headers.get('Authorization') || ''
  const supabase = createClient(supabaseUrl, serviceKey, { global: { headers: { Authorization: authHeader } } })
  const { data: { user } } = await supabase.auth.getUser(authHeader.replace('Bearer ', ''))
  if (!user || !(await isOwner(supabase, user.id))) return new Response(JSON.stringify({ error: 'not_found' }), { status: 404, headers: corsHeaders })

  const body = await req.json().catch(() => ({}))
  const action = new URL(req.url).pathname.split('/').filter(Boolean).pop() || ''
  const table = supabase.from('music_recommendations')

  if (action === 'create-music-recommendation') {
    const allowed = ['title','artist','mood','category','audio_url','cover_url','is_premium','is_active','sort_order']
    const payload = Object.fromEntries(Object.entries(body).filter(([k]) => allowed.includes(k)))
    if (!payload.title) return new Response(JSON.stringify({ error: 'title_required' }), { status: 400, headers: corsHeaders })
    const { data, error } = await table.insert(payload).select().single()
    if (error) return new Response(JSON.stringify({ error: 'create_failed' }), { status: 400, headers: corsHeaders })
    return new Response(JSON.stringify({ data }), { headers: { ...corsHeaders, 'content-type': 'application/json' } })
  }

  if (action === 'update-music-recommendation') {
    if (!body.id) return new Response(JSON.stringify({ error: 'id_required' }), { status: 400, headers: corsHeaders })
    const allowed = ['title','artist','mood','category','audio_url','cover_url','is_premium','is_active','sort_order']
    const payload = Object.fromEntries(Object.entries(body).filter(([k]) => allowed.includes(k)))
    const { data, error } = await table.update({ ...payload, updated_at: new Date().toISOString() }).eq('id', body.id).select().single()
    if (error) return new Response(JSON.stringify({ error: 'update_failed' }), { status: 400, headers: corsHeaders })
    return new Response(JSON.stringify({ data }), { headers: { ...corsHeaders, 'content-type': 'application/json' } })
  }

  if (action === 'delete-music-recommendation') {
    if (!body.id) return new Response(JSON.stringify({ error: 'id_required' }), { status: 400, headers: corsHeaders })
    const { error } = await table.delete().eq('id', body.id)
    if (error) return new Response(JSON.stringify({ error: 'delete_failed' }), { status: 400, headers: corsHeaders })
    return new Response(JSON.stringify({ ok: true }), { headers: { ...corsHeaders, 'content-type': 'application/json' } })
  }

  return new Response(JSON.stringify({ error: 'unknown_action' }), { status: 400, headers: corsHeaders })
})
