# Media Pembelajaran Informatika — SMA Negeri 11 Pinrang

Media pembelajaran berbasis web untuk mata pelajaran **Informatika** Kelas X (Fase E), XI, dan XII (Fase F),
selaras dengan perangkat ajar Tahun Pelajaran 2026/2027 dan Capaian Pembelajaran versi 2025
(Keputusan Kepala BSKAP Nomor 046/H/KR/2025).

Penyusun: **Mutmainnah Syam, S.Pd., M.Pd.** — NIP 19930321 202421 2 034

## Isi media

| Bagian | Keterangan |
|---|---|
| Materi dan slide | 20 modul, 120+ salindia presentasi siap tayang (mode layar penuh) |
| Simulasi interaktif | 15 simulasi: pengurutan, pencarian, tumpukan/antrean, Von Neumann, biner, penelusuran pseudocode, analisis data, periksa fakta, jaringan dan troubleshooting, graf BFS/DFS, strategi algoritmik, keamanan akun dan 2FA, tinjauan kode, perancang spesifikasi, perencana projek |
| Latihan soal | 3 paket (Kelas X, XI, XII): 10 pilihan ganda dinilai otomatis + 5 uraian dengan pokok jawaban |
| LKPD digital | 3 lembar kerja yang dapat diisi, tersimpan otomatis, dan dicetak/disimpan sebagai PDF |
| Panduan guru | Alur pemakaian 3M, program tahunan, rancangan asesmen, glosarium |

## Cara menerbitkan di GitHub Pages

1. Buat repositori baru di GitHub, misalnya `informatika-sman11pinrang` (boleh publik).
2. Klik **Add file → Upload files**, unggah berkas `index.html`, lalu **Commit changes**.
3. Buka **Settings → Pages**. Pada bagian *Source* pilih **Deploy from a branch**,
   cabang **main**, folder **/ (root)**, lalu **Save**.
4. Tunggu 1–2 menit. Alamat media akan muncul, misalnya
   `https://namapengguna.github.io/informatika-sman11pinrang/`.

Tidak diperlukan berkas tambahan, proses build, maupun berkas `.nojekyll`:
seluruh media berada dalam satu berkas `index.html`.

Media juga bisa dipakai tanpa GitHub — cukup salin `index.html` ke komputer atau flashdisk,
lalu klik dua kali untuk membukanya di peramban.

## Gambar dan mode luring

- Saat media dibuka **pertama kali** dan terhubung internet, gambar pendukung diambil dari
  **Wikimedia Commons** (berlisensi bebas) lalu disimpan permanen di penyimpanan internal
  peramban (**IndexedDB**). Media juga meminta status penyimpanan permanen agar tidak dihapus otomatis.
- Pembukaan berikutnya **tidak mengunduh ulang** gambar, sehingga hemat kuota dan tetap berjalan
  saat jaringan terputus.
- Jika gambar gagal diambil (tanpa internet atau sumber berubah), media otomatis memakai
  **ilustrasi SVG bawaan** yang sudah tertanam di dalam berkas, sehingga pembelajaran tetap berjalan.
- Status, pembaruan, dan penghapusan gambar dapat diatur pada menu **Penyimpanan Media**.
- Nama pembuat dan lisensi tiap gambar ditampilkan otomatis pada keterangan gambar.

## Catatan privasi

Kemajuan belajar, jawaban LKPD, dan nilai latihan disimpan di peramban masing-masing pengguna
(localStorage). Tidak ada data yang dikirim ke server mana pun.

## Pintasan papan ketik saat presentasi

| Tombol | Fungsi |
|---|---|
| `←` `→` atau `spasi` | Berpindah salindia |
| `F` | Layar penuh |
| `Esc` | Menutup presentasi |

## Menyesuaikan isi

Seluruh materi berada pada bagian `const MODULES = [...]` di dalam `index.html`.
Setiap modul memuat `judul`, `tp` (tujuan pembelajaran), dan daftar `slides`
berisi `t` (judul salindia), `b` (butir isi), `img` (kode gambar), dan `sim` (kode simulasi).
Bank soal ada pada `const QUIZ`, LKPD pada `const LKPD`, dan daftar gambar pada `const IMAGES`.
