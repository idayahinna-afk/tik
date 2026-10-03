process.env.SITE_PASSWORD = 'rahasia123';
process.env.SESSION_SECRET = 'kunci-uji-coba';
const idx = require('./api/index.js');
const login = require('./api/login.js');
const file = require('./api/file.js');

function buatRes() {
  return {
    statusCode: 200, headers: {}, body: null,
    setHeader(k, v) { this.headers[k.toLowerCase()] = v; },
    end(b) { this.body = b; this._done && this._done(); }
  };
}
function jalan(fn, req) {
  const res = buatRes();
  return new Promise(r => { res._done = () => r(res); const h = fn(req, res); if (h && h.then) h.then(() => {}); });
}
const galat = [];
(async () => {
  // 1. tanpa cookie → halaman password
  let r = await jalan(idx, { headers: {} });
  if (!/password/i.test(r.body)) galat.push('1. halaman password tidak tampil');
  if (/MODULES|buildDeck/.test(r.body)) galat.push('1. isi aplikasi BOCOR sebelum login!');

  // 2. password salah
  r = await jalan(login, { method: 'POST', headers: {}, body: { password: 'salah' } });
  if (r.statusCode !== 401) galat.push('2. password salah tidak ditolak');
  if (r.headers['set-cookie']) galat.push('2. cookie diberikan padahal password salah!');

  // 3. password benar
  r = await jalan(login, { method: 'POST', headers: {}, body: { password: 'rahasia123' } });
  if (r.statusCode !== 200 || !r.headers['set-cookie']) galat.push('3. login benar gagal');
  const ck = String(r.headers['set-cookie'] || '');
  if (!/HttpOnly/.test(ck) || !/Secure/.test(ck)) galat.push('3. cookie tidak HttpOnly/Secure');
  const nilai = ck.split(';')[0];

  // 4. aplikasi tersaji setelah login
  r = await jalan(idx, { headers: { cookie: nilai } });
  if (r.statusCode !== 200) galat.push('4. aplikasi tidak tersaji (status ' + r.statusCode + ')');
  if (!/Slide &amp; Simulasi|Slide & Simulasi/.test(r.body)) galat.push('4. isi aplikasi tidak ditemukan');
  if (!/api\/file\?nama=/.test(r.body)) galat.push('4. pengalih unduhan tidak disisipkan');
  if (!/pptx\|ppt\|pdf/.test(r.body)) galat.push('4. penangkap klik berkas tidak aktif');
  if (!/contextmenu/.test(r.body)) galat.push('4. perisai klik kanan tidak disisipkan');
  if (/github\.io/i.test(r.body)) galat.push('4. alamat github masih muncul di halaman');

  // 5. unduhan tanpa cookie ditolak
  r = await jalan(file, { headers: {}, query: { nama: 'Slide Informatika Kelas X - SMAN 11 Pinrang.pptx' } });
  if (r.statusCode !== 401) galat.push('5. unduhan tanpa login tidak ditolak');

  // 6. unduhan dengan cookie berhasil
  r = await jalan(file, { headers: { cookie: nilai }, query: { nama: 'Slide Informatika Kelas X - SMAN 11 Pinrang.pptx' } });
  if (r.statusCode !== 200 || !r.body || r.body.length < 100000) galat.push('6. unduhan gagal (status ' + r.statusCode + ')');
  if (!/attachment/.test(String(r.headers['content-disposition']))) galat.push('6. header unduhan salah');

  // 7. percobaan menjelajah folder
  r = await jalan(file, { headers: { cookie: nilai }, query: { nama: '../../lib/auth.js' } });
  if (r.statusCode === 200) galat.push('7. BAHAYA: path traversal berhasil!');
  r = await jalan(file, { headers: { cookie: nilai }, query: { nama: 'index.html' } });
  if (r.statusCode === 200) galat.push('7. BAHAYA: index.html bisa diunduh lewat /api/file!');

  // 8. cookie palsu ditolak
  r = await jalan(idx, { headers: { cookie: 'sesi=9999999999.palsu' } });
  if (/MODULES|buildDeck/.test(r.body)) galat.push('8. cookie palsu diterima — isi aplikasi bocor!');

  console.log(galat.length ? 'MASALAH:\n' + galat.join('\n') : 'SEMUA UJI KEAMANAN LULUS (8 skenario)');
})();
