const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS'
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })
  try {
    const { message, context } = await req.json()
    const apiKey = Deno.env.get('OPENAI_API_KEY')
    const model = Deno.env.get('OPENAI_MODEL') || 'gpt-5.5'
    if (!apiKey) {
      return Response.json({ answer: 'bekiw AI belum aktif karena OPENAI_API_KEY belum diisi di server. Help center tetap bisa menjawab basic dari knowledge lokal.' }, { headers: corsHeaders })
    }
    const system = `You are bekiw, the friendly AI support inside TULUS. Answer naturally in the same language as the user. You know the TULUS platform: auth, profile pages, dashboard, music, uploads, effects, custom cursor, premium, owner panel, Supabase, Turnstile, storage, security, and payment flow. Keep answers clear and step-by-step. Context:\n${context || ''}`
    const res = await fetch('https://api.openai.com/v1/responses', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${apiKey}` },
      body: JSON.stringify({ model, input: [{ role: 'system', content: system }, { role: 'user', content: String(message || '') }] })
    })
    const data = await res.json()
    const answer = data.output_text || data.output?.flatMap((o) => o.content || []).map((c) => c.text || '').join('\n') || 'Maaf, bekiw belum bisa menjawab sekarang.'
    return Response.json({ answer }, { headers: corsHeaders })
  } catch (error) {
    return Response.json({ answer: 'Maaf, bekiw lagi gangguan sebentar. Coba lagi nanti.', error: String(error?.message || error) }, { status: 200, headers: corsHeaders })
  }
})
