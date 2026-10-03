/**
 * api/index.js — pintu utama.
 * Belum masuk  → halaman password.
 * Sudah masuk  → aplikasi dikirim dari folder /private (tidak pernah
 *                tersedia sebagai berkas statis, jadi tidak punya URL sendiri).
 */
const fs = require('fs');
const path = require('path');
const { sudahMasuk, halamanLogin, kepalaAman } = require('../lib/auth');

let cache = null;   // disimpan di memori instance agar pembukaan berikutnya cepat

function bacaAplikasi() {
  if (cache) return cache;
  const berkas = path.join(process.cwd(), 'private', 'index.html');
  let html = fs.readFileSync(berkas, 'utf8');

  // 1. Tautan berkas slide dialihkan ke jalur terlindungi
  html = html.replace(/href=["']([^"'#?:]+\.(?:pptx|ppt|pdf|docx|xlsx|zip))["']/gi,
    function (all, berkasNama) {
      let nama = berkasNama;
      try { nama = decodeURIComponent(berkasNama); } catch (e) {}
      return 'href="/api/file?nama=' + encodeURIComponent(nama) + '"';
    });

  // 2. Tautan berkas yang dibuat oleh skrip aplikasi (bukan HTML statis)
  //    ditangkap saat diklik, lalu dialihkan ke jalur terlindungi.
  //    Juga: penghalang ringan klik kanan dan pintasan alat pengembang.
  const perisai =
    '<script>(function(){' +
    'document.addEventListener("click",function(e){' +
    'var a=e.target&&e.target.closest?e.target.closest("a[href]"):null; if(!a)return;' +
    'var h=a.getAttribute("href")||"";' +
    'if(/^https?:/i.test(h)||h.charAt(0)==="#")return;' +
    'if(!/\\.(pptx|ppt|pdf|docx|xlsx|zip)(\\?|$)/i.test(h))return;' +
    'e.preventDefault();' +
    'var nama=h.split("?")[0]; try{nama=decodeURIComponent(nama)}catch(x){}' +
    'window.location.href="/api/file?nama="+encodeURIComponent(nama);' +
    '},true);' +
    'document.addEventListener("contextmenu",function(e){e.preventDefault()});' +
    'document.addEventListener("keydown",function(e){' +
    'var k=(e.key||"").toLowerCase();' +
    'if(e.key==="F12"||(e.ctrlKey&&e.shiftKey&&(k==="i"||k==="j"||k==="c"))||(e.ctrlKey&&k==="u")){' +
    'e.preventDefault();e.stopPropagation();return false;}});' +
    'document.addEventListener("dragstart",function(e){e.preventDefault()});' +
    '})();<\/script>';

  html = /<\/body>/i.test(html) ? html.replace(/<\/body>/i, perisai + '</body>') : html + perisai;
  cache = html;
  return html;
}

module.exports = function (req, res) {
  kepalaAman(res);
  res.setHeader('Content-Type', 'text/html; charset=utf-8');

  if (!sudahMasuk(req)) {
    res.statusCode = 200;   // tetap 200 agar aman saat disematkan di Blogger
    return res.end(halamanLogin(''));
  }
  try {
    return res.end(bacaAplikasi());
  } catch (e) {
    res.statusCode = 500;
    return res.end('<p style="font-family:system-ui;padding:24px">Berkas aplikasi tidak ditemukan di folder <code>private/index.html</code>.</p>');
  }
};
