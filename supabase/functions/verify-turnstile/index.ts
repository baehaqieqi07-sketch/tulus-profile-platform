import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS'
}

function json(body: Record<string, unknown>, status = 200) {
  return new Response(JSON.stringify(body), { status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } })
}

async function getAuthedClient(req: Request) {
  const authHeader = req.headers.get('Authorization') || ''
  const supabase = createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_ANON_KEY')!, {
    global: { headers: { Authorization: authHeader } }
  })
  const admin = createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!)
  const { data, error } = await supabase.auth.getUser()
  if (error || !data.user) throw new Error('unauthorized')
  const { data: roleData } = await admin.from('user_roles').select('role').eq('user_id', data.user.id).in('role', ['owner', 'moderator']).limit(1)
  return { user: data.user, admin, role: roleData?.[0]?.role || 'user' }
}

async function requireOwner(req: Request) {
  const ctx = await getAuthedClient(req)
  if (ctx.role !== 'owner') throw new Error('not_found')
  return ctx
}

async function logAction(admin: any, actor_user_id: string, actor_role: string, action: string, target_type?: string, target_id?: string, metadata = {}) {
  await admin.from('activity_logs').insert({ actor_user_id, actor_role, action, target_type, target_id, metadata })
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })
  if (req.method !== 'POST') return json({ ok: false, message: 'Method not allowed.' }, 405)
  try {
    const { token, action } = await req.json()
    if (!token) return json({ ok: false, message: 'Verification is required.' }, 400)
    const secret = Deno.env.get('TURNSTILE_SECRET_KEY')
    if (!secret) return json({ ok: false, message: 'Turnstile secret is missing.' }, 500)
    const form = new FormData()
    form.append('secret', secret)
    form.append('response', token)
    form.append('remoteip', req.headers.get('CF-Connecting-IP') || '')
    const verify = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', { method: 'POST', body: form })
    const result = await verify.json()
    return json({ ok: Boolean(result.success), action: action || 'generic', result })
  } catch {
    return json({ ok: false, message: 'Verification failed softly.' }, 400)
  }
})
