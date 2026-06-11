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
  try {
    const { user, admin } = await getAuthedClient(req)
    const { plan } = await req.json()
    if (!['plus','pro','lifetime'].includes(plan)) return json({ ok: false, message: 'Choose a valid plan.' }, 400)
    const amount = plan === 'plus' ? 29000 : plan === 'pro' ? 59000 : 199000
    const { data, error } = await admin.from('payments').insert({ user_id: user.id, plan, amount, status: 'draft', provider: 'manual' }).select('*').single()
    if (error) throw error
    return json({ ok: true, payment: data, message: 'Manual payment draft created.' })
  } catch {
    return json({ ok: false, message: 'Could not create checkout session.' }, 400)
  }
})
