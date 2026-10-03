/**
 * lib/auth.js — sesi login, penjaga akses, dan halaman password.
 * Tidak memakai pustaka luar; hanya modul bawaan Node.
 */
const crypto = require('crypto');

const MASA_SESI = 3 * 60 * 60;            // 3 jam (detik)
const NAMA_COOKIE = 'sesi';

function rahasia() {
  return process.env.SESSION_SECRET || 'ganti-nilai-ini-di-environment-variables';
}
function sandi() {
  return process.env.SITE_PASSWORD || '';
}

/* -------- tanda tangan sesi -------- */
function tandaTangan(payload) {
  return crypto.createHmac('sha256', rahasia()).update(payload).digest('hex');
}
function buatNilaiCookie() {
  const kedaluwarsa = Math.floor(Date.now() / 1000) + MASA_SESI;
  const payload = String(kedaluwarsa);
  return payload + '.' + tandaTangan(payload);
}
function cookieValid(nilai) {
  if (!nilai || nilai.indexOf('.') < 0) return false;
  const [payload, sig] = nilai.split('.');
  const benar = tandaTangan(payload);
  if (sig.length !== benar.length) return false;
  if (!crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(benar))) return false;
  return Number(payload) > Math.floor(Date.now() / 1000);
}
function ambilCookie(req, nama) {
  const raw = req.headers.cookie || '';
  const bagian = raw.split(';');
  for (const b of bagian) {
    const i = b.indexOf('=');
    if (i > 0 && b.slice(0, i).trim() === nama) return decodeURIComponent(b.slice(i + 1).trim());
  }
  return null;
}
function sudahMasuk(req) {
  return cookieValid(ambilCookie(req, NAMA_COOKIE));
}
function pasangSesi(res) {
  res.setHeader('Set-Cookie',
    NAMA_COOKIE + '=' + buatNilaiCookie() +
    '; Path=/; HttpOnly; Secure; SameSite=None; Max-Age=' + MASA_SESI);
}
function hapusSesi(res) {
  res.setHeader('Set-Cookie', NAMA_COOKIE + '=; Path=/; HttpOnly; Secure; SameSite=None; Max-Age=0');
}

/* -------- perbandingan kata sandi tahan-waktu -------- */
function sandiCocok(masukan) {
  const a = Buffer.from(String(masukan || ''));
  const b = Buffer.from(String(sandi()));
  if (!b.length) return false;              // env belum diisi: tolak semua
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
}

/* -------- kepala tanggapan yang aman -------- */
function kepalaAman(res) {
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, private');
  res.setHeader('X-Robots-Tag', 'noindex, nofollow, noarchive, nosnippet');
  res.setHeader('Referrer-Policy', 'no-referrer');
  res.setHeader('X-Content-Type-Options', 'nosniff');
}

/* -------- halaman password -------- */
function halamanLogin(pesan) {
  return `<!DOCTYPE html>
<html lang="id"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex, nofollow">
<title>Media Pembelajaran — Akses Terbatas</title>
<style>
 html,body{height:100%;margin:0}
 body{font-family:system-ui,-apple-system,Segoe UI,Arial,sans-serif;background:#0f172a;color:#e2e8f0;
      display:grid;place-items:center}
 .kotak{width:min(390px,92vw);padding:30px;background:#1e293b;border-radius:18px;
        box-shadow:0 24px 60px rgba(0,0,0,.5)}
 h1{margin:0 0 6px;font-size:20px}
 p{margin:0 0 18px;font-size:13px;color:#94a3b8}
 input{width:100%;box-sizing:border-box;padding:13px;margin:6px 0;border:none;border-radius:11px;font-size:16px}
 button{width:100%;padding:13px;margin-top:6px;border:none;border-radius:11px;background:#38bdf8;
        color:#0f172a;font-weight:700;font-size:16px;cursor:pointer}
 button:disabled{opacity:.5;cursor:wait}
 #err{color:#f87171;font-size:13px;min-height:19px;margin-top:8px}
 .kaki{margin-top:14px;font-size:11px;color:#64748b;text-align:center}
</style></head>
<body>
 <form class="kotak" id="f" autocomplete="off">
   <h1>Media Pembelajaran Informatika</h1>
   <p>SMA Negeri 11 Pinrang · masukkan password kelas untuk membuka slide dan simulasi.</p>
   <input id="pwd" type="password" placeholder="Password" autocomplete="current-password" required>
   <button id="btn" type="submit">Buka</button>
   <div id="err">${pesan ? String(pesan).replace(/</g, '&lt;') : ''}</div>
   <div class="kaki">Mutmainnah Syam, S.Pd., M.Pd.</div>
 </form>
<script>
 var f=document.getElementById('f'),btn=document.getElementById('btn'),err=document.getElementById('err');
 f.addEventListener('submit',function(ev){
   ev.preventDefault();
   var p=document.getElementById('pwd').value;
   if(!p){err.textContent='Password wajib diisi';return}
   err.textContent='';btn.disabled=true;btn.textContent='Memeriksa…';
   fetch('/api/login',{method:'POST',headers:{'Content-Type':'application/json'},
     credentials:'same-origin',body:JSON.stringify({password:p})})
   .then(function(r){return r.json()})
   .then(function(j){
     if(j.ok){location.replace('/')}
     else{btn.disabled=false;btn.textContent='Buka';err.textContent=j.pesan||'Password salah';}
   })
   .catch(function(){btn.disabled=false;btn.textContent='Buka';err.textContent='Gangguan jaringan';});
 });
</script>
</body></html>`;
}

module.exports = { sudahMasuk, pasangSesi, hapusSesi, sandiCocok, halamanLogin, kepalaAman, MASA_SESI };
