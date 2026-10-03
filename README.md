# Media Pembelajaran Informatika — Versi Vercel (terlindungi password)

SMA Negeri 11 Pinrang · Mutmainnah Syam, S.Pd., M.Pd.

Proyek ini menyajikan aplikasi slide dan simulasi **hanya setelah password benar**.
Berkas `index.html` dan seluruh berkas slide disimpan di folder `private/` yang **tidak
pernah disajikan sebagai berkas statis**, sehingga tidak punya alamat URL sendiri dan
tidak bisa diunduh langsung oleh siapa pun.

## Isi proyek

```
├── api/
│   ├── index.js      ← pintu utama: halaman password atau aplikasi
│   ├── login.js      ← memeriksa password, memasang cookie sesi
│   ├── logout.js     ← keluar
│   └── file.js       ← menyalurkan berkas slide (hanya setelah login)
├── lib/
│   └── auth.js       ← sesi bertanda tangan + halaman password
├── private/          ← TIDAK PERNAH TERBUKA KE PUBLIK
│   ├── index.html    ← aplikasi slide & simulasi
│   └── files/        ← berkas .pptx
├── vercel.json
└── package.json
```

## Langkah pemasangan

**1. Unggah ke GitHub (repositori boleh Private).**
Buat repositori baru, unggah seluruh isi folder ini apa adanya — pertahankan struktur
foldernya. Jangan letakkan `index.html` di akar repositori.

**2. Hubungkan ke Vercel.**
Buka vercel.com → **Add New → Project** → pilih repositori tadi → **Deploy**.
Tidak perlu mengubah pengaturan build apa pun.

**3. Isi dua Environment Variables.**
Di dasbor Vercel: **Settings → Environment Variables**, tambahkan untuk
*Production, Preview, dan Development*:

| Name | Value |
|---|---|
| `SITE_PASSWORD` | password kelas, misalnya `informatika2026` |
| `SESSION_SECRET` | teks acak panjang, misalnya 40 karakter campuran huruf-angka |

Setelah menambahkannya, buka tab **Deployments** → titik tiga pada deployment terakhir →
**Redeploy**, supaya nilainya terbaca.

**4. Buka alamatnya**, misalnya `https://nama-proyek.vercel.app`.
Akan muncul halaman password; setelah diisi benar, aplikasi terbuka.

**5. Menyematkan di Blogger** (opsional):

```html
<iframe src="https://nama-proyek.vercel.app/" width="100%" height="700"
        style="border:0" allowfullscreen></iframe>
```

Cookie sesi sudah disetel `SameSite=None; Secure` agar tetap bekerja di dalam iframe,
dan header `Content-Security-Policy` sudah mengizinkan domain blogspot.

## Memperbarui materi

Ganti berkas di `private/` lalu commit ke GitHub. Vercel otomatis membangun ulang
dalam satu dua menit. Tidak ada cache yang perlu dibersihkan manual.

## Apa yang benar-benar terlindungi

**Terlindungi:**
- Berkas `index.html` dan `.pptx` tidak punya URL publik — mencoba membuka
  `/private/index.html` akan menghasilkan 404.
- Repositori GitHub boleh **Private**; Vercel tetap bisa membangunnya.
- Isi aplikasi hanya dikirim kepada peramban yang memegang cookie sesi yang sah;
  cookie ditandatangani HMAC, `HttpOnly` (tak terbaca JavaScript), dan kedaluwarsa 3 jam.
- Berkas slide hanya tersalurkan lewat `/api/file` setelah login, lengkap dengan
  penyaring nama berkas agar tidak bisa dipakai menjelajah folder lain.
- Halaman ditandai `noindex` sehingga tidak muncul di mesin pencari.
- Klik kanan, seret gambar, serta pintasan F12 / Ctrl+Shift+I / Ctrl+U dihambat.

**Tidak bisa dijanjikan:**
Setelah halaman tampil di layar, isinya tetap bisa dibaca melalui alat pengembang.
Peramban wajib menerima HTML dan JavaScript untuk dapat menampilkannya, jadi tidak ada
teknik mana pun — di Vercel maupun tempat lain — yang membuatnya mustahil dibaca.
Penghalang klik kanan dan F12 hanya menghambat murid pada umumnya, bukan pengamanan
sungguhan. Yang benar-benar aman adalah: berkas sumbernya tidak dapat diunduh, dan
isinya tidak dikirim sama sekali kepada orang yang tidak punya password.

Bila ingin perlindungan lebih kuat lagi, langkah berikutnya biasanya: memperpendek masa
sesi, memberi password berbeda per kelas, atau memberi setiap murid akun sendiri.

## Menguji sendiri sebelum mengunggah

```bash
node uji-lokal.js
```

Perintah itu memeriksa delapan skenario keamanan: isi aplikasi tidak bocor sebelum login,
password salah ditolak, cookie palsu ditolak, berkas tidak bisa diunduh tanpa login,
dan percobaan menjelajah folder digagalkan.
