import http from 'node:http';

const PORT = process.env.PORT || 8787;
const WEBHOOK_SECRET = process.env.PAYMENT_WEBHOOK_SECRET || '';

function json(res, status, data) {
  res.writeHead(status, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(data));
}

const server = http.createServer(async (req, res) => {
  if (req.method === 'GET' && req.url === '/health') return json(res, 200, { ok: true, service: 'tulus-payment-webhook' });
  if (req.method !== 'POST' || req.url !== '/payment-webhook') return json(res, 404, { ok: false, message: 'Not found' });

  const signature = req.headers['x-tulus-signature'];
  if (WEBHOOK_SECRET && signature !== WEBHOOK_SECRET) return json(res, 401, { ok: false, message: 'Invalid webhook signature' });

  let body = '';
  req.on('data', (chunk) => { body += chunk; if (body.length > 1_000_000) req.destroy(); });
  req.on('end', () => {
    try {
      const event = JSON.parse(body || '{}');
      // TODO: verify provider event, update Supabase payment_requests, write audit log.
      return json(res, 200, { ok: true, received: event.type || 'manual' });
    } catch {
      return json(res, 400, { ok: false, message: 'Invalid JSON' });
    }
  });
});

server.listen(PORT, () => console.log(`TULUS payment webhook skeleton listening on ${PORT}`));
