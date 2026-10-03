/** api/login.js — memeriksa password lalu memasang cookie sesi. */
const { sandiCocok, pasangSesi, kepalaAman } = require('../lib/auth');

module.exports = async function (req, res) {
  kepalaAman(res);
  res.setHeader('Content-Type', 'application/json; charset=utf-8');

  if (req.method !== 'POST') {
    res.statusCode = 405;
    return res.end(JSON.stringify({ ok: false, pesan: 'Metode tidak diizinkan' }));
  }

  let body = req.body;
  if (typeof body === 'string') { try { body = JSON.parse(body); } catch (e) { body = {}; } }
  if (!body) body = {};

  // perlambat percobaan tebak-tebakan
  await new Promise(r => setTimeout(r, 600));

  if (!process.env.SITE_PASSWORD) {
    res.statusCode = 500;
    return res.end(JSON.stringify({ ok: false, pesan: 'SITE_PASSWORD belum diatur di Vercel' }));
  }
  if (!sandiCocok(body.password)) {
    res.statusCode = 401;
    return res.end(JSON.stringify({ ok: false, pesan: 'Password salah' }));
  }
  pasangSesi(res);
  return res.end(JSON.stringify({ ok: true }));
};
