# Slide & Simulasi Informatika — SMA Negeri 11 Pinrang

Media pembelajaran berbasis web berisi **slide pertemuan** dan **simulasi interaktif** untuk
Informatika Kelas X (Fase E), XI, dan XII (Fase F). Setiap pertemuan memiliki minimal satu
salindia simulasi (ditandai 🧪) yang dapat langsung dicoba murid di tengah presentasi.

Penyusun: **Mutmainnah Syam, S.Pd., M.Pd.** — NIP 19930321 202421 2 034 · T.P. 2026/2027
Acuan: Capaian Pembelajaran BSKAP 046/H/KR/2025 · pendekatan Pembelajaran Mendalam.

## Isi

| Berkas | Keterangan |
|---|---|
| `index.html` | Aplikasi: 20 pertemuan, 17 simulasi interaktif, kuis formatif di setiap dek |
| `Slide Informatika Kelas X - SMAN 11 Pinrang.pptx` | 143 slide siap tayang / siap diimpor ke Canva |
| `Slide Informatika Kelas XI - SMAN 11 Pinrang.pptx` | 104 slide |
| `Slide Informatika Kelas XII - SMAN 11 Pinrang.pptx` | 103 slide |

## Alur setiap dek pertemuan

**Pembuka** — sampul dan sapaan hangat · tujuan pembelajaran · apersepsi (kaitan dengan pertemuan
lalu) · pertanyaan pemantik.
**Isi** — poin kunci berupa kata kunci singkat, visual pendukung, salindia simulasi interaktif (🧪),
dan salindia **cek pemahaman** yang disisipkan setiap selesai satu sub-bab.
**Aktivitas & penutup** — instruksi kerja kelompok (langkah bernomor, alokasi waktu, produk yang
dikumpulkan) · kuis interaktif 3 soal dengan umpan balik instan · refleksi terbuka · tindak lanjut,
materi pertemuan berikutnya, dan ucapan terima kasih.

Pada berkas `.pptx`, kunci jawaban kuis dan catatan guru tersimpan di bagian **Speaker Notes**.

## Menerbitkan di GitHub Pages

1. Buat repositori baru, misalnya `informatika-sman11pinrang`.
2. **Add file → Upload files**, unggah `index.html` dan ketiga berkas `.pptx`, lalu commit.
3. **Settings → Pages** → Source: *Deploy from a branch* → branch `main`, folder `/ (root)` → Save.
4. Buka tautan yang muncul, misalnya `https://namapengguna.github.io/informatika-sman11pinrang/`.

Tombol "Unduh seluruh slide" di halaman kelas mengarah ke berkas `.pptx` di repositori yang sama,
jadi pastikan berkas tersebut ikut diunggah.

## Memakai Canva

Ada dua cara memadukan media ini dengan Canva:

**1. Percantik slide di Canva.** Buka Canva → *Buat desain* → *Unggah* → pilih berkas `.pptx`.
Seluruh slide masuk sebagai desain yang dapat diubah warna, font, dan elemennya.

**2. Tempelkan desain Canva ke dalam aplikasi.** Di Canva: *Bagikan → Lainnya → Sematkan*, salin
tautan `https://www.canva.com/design/…/view?embed`. Buka menu **Pengaturan & Canva** pada aplikasi,
tempelkan tautan pada baris pertemuan yang sesuai. Slide Canva akan muncul sebagai salindia tambahan
di awal dek pertemuan tersebut (memerlukan internet saat ditayangkan).

## Mode presentasi

| Tombol | Fungsi |
|---|---|
| `←` `→` | Berpindah salindia |
| `F` | Masuk/keluar mode presentasi layar penuh |
| `Esc` | Keluar mode presentasi |

Tombol **Unduh slide (PDF)** pada tiap pertemuan membuka jendela cetak; pilih *Simpan sebagai PDF*.

## Daftar simulasi (17)

Pengurutan · Pencarian berurutan vs biner · Tumpukan dan antrean · Siklus Von Neumann ·
Konversi biner dan ASCII · Penelusuran pseudocode · Analisis data mini · Lembar kerja dan atribusi
lisensi · Latihan periksa fakta · Jaringan dan troubleshooting · Daur hidup produk digital ·
Penelusuran graf BFS/DFS · Brute force vs greedy · Keamanan kata sandi dan 2FA · Tinjauan kualitas
kode · Perancang spesifikasi komputer · Perencana projek akhir.

## Gambar dan mode luring

Gambar pendukung diambil sekali dari Wikimedia Commons (lisensi bebas) saat aplikasi pertama dibuka,
lalu disimpan permanen di IndexedDB peramban. Pembukaan berikutnya tidak mengunduh ulang dan tetap
berjalan tanpa internet; bila pengambilan gagal, dipakai ilustrasi SVG bawaan. Pengaturannya ada di
menu **Pengaturan & Canva**.

## Menyesuaikan isi

Materi berada pada `const MODULES = [...]` di dalam `index.html`. Setiap salindia memuat
`k` (label), `t` (judul), `b` (butir isi), `img` (kode gambar), dan `sim` (kode simulasi —
menyisipkan salindia simulasi tepat setelahnya).
