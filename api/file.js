/**
 * api/file.js — menyalurkan berkas dari folder /private/files.
 * Hanya bisa diakses setelah login; nama berkas dibersihkan agar
 * tidak bisa dipakai menjelajah folder lain.
 */
const fs = require('fs');
const path = require('path');
const { sudahMasuk, kepalaAman } = require('../lib/auth');

const TIPE = {
  '.pptx': 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  '.ppt' : 'application/vnd.ms-powerpoint',
  '.pdf' : 'application/pdf',
  '.docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  '.xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  '.zip' : 'application/zip'
};

module.exports = function (req, res) {
  kepalaAman(res);

  if (!sudahMasuk(req)) {
    res.statusCode = 401;
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    return res.end('Akses ditolak. Silakan masuk terlebih dahulu.');
  }

  const q = (req.query && req.query.nama) || '';
  const nama = path.basename(String(q));                 // buang jalur folder
  const ext  = path.extname(nama).toLowerCase();

  if (!nama || !TIPE[ext]) {
    res.statusCode = 400;
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    return res.end('Jenis berkas tidak diizinkan.');
  }

  const berkas = path.join(process.cwd(), 'private', 'files', nama);
  if (!berkas.startsWith(path.join(process.cwd(), 'private', 'files')) || !fs.existsSync(berkas)) {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    return res.end('Berkas tidak ditemukan: ' + nama);
  }

  const isi = fs.readFileSync(berkas);
  res.setHeader('Content-Type', TIPE[ext]);
  res.setHeader('Content-Length', isi.length);
  res.setHeader('Content-Disposition',
    'attachment; filename="' + nama.replace(/"/g, '') + '"; filename*=UTF-8\'\'' + encodeURIComponent(nama));
  return res.end(isi);
};
