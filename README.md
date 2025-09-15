# Quote Al-Qur'an

````markdown
# Quote Al-Qur'an

Website sederhana untuk menampilkan kutipan (quote) ayat Al-Qur'an secara acak, lengkap dengan terjemahan, nama surah, fitur audio (nada jiharkah tersedia) dan fitur generate gambar siap upload Instagram (rasio 4:5).

## Fitur

- Menampilkan ayat Al-Qur'an acak (API `equran.id`, fallback `alquran.cloud`)
- Teks Arab, terjemahan, dan nama surah tampil rapi
- Tombol "Tampilkan Quote Lain" untuk refresh kutipan
- Tombol "Salin Teks" untuk copy ayat + terjemahan + surah
- Tombol "Generate Gambar" untuk membuat gambar siap upload Instagram
- Preview gambar dalam modal popup, bisa langsung di-download
- Audio ayat: pemutaran otomatis dari sumber yang tersedia (default: Sheikh Mishary Rasyid Al-Afasy). Backend mencoba beberapa sumber audio sebelum mengembalikan hasil ke frontend.
- Desain modern, responsif, dan mudah digunakan

## Cara Menjalankan (lokal)

1. Clone repository:
   ```bash
   git clone https://github.com/Alfandy516/quote-alquran.github.io.git
   cd quote-alquran.github.io
   ```
2. Jalankan web server sederhana (direkomendasikan untuk menghindari masalah CORS saat fetch API):

   - Dengan Python 3:
     ```bash
     python -m http.server 8000
     ```
   - Buka browser ke `http://localhost:8000`.

3. Atau cukup buka `index.html` secara langsung di browser (fitur audio dan fetch API bekerja lebih andal melalui server lokal).

## Deploy ke GitHub Pages

Repository dengan nama `username.github.io` (mis. `Alfandy516.github.io`) dapat langsung di-push ke branch `main` dan akan di-deploy otomatis oleh GitHub Pages.

Contoh push:

```bash
git add .
git commit -m "Deploy website"
git push -u origin main
```

> Jika push gagal karena autentikasi, lihat bagian "Autentikasi" di bawah.

## Autentikasi (push ke GitHub)

Dua opsi umum:

- SSH (direkomendasikan): buat SSH key (`ssh-keygen`), tambahkan `id_ed25519.pub` ke `GitHub -> Settings -> SSH and GPG keys`, lalu ubah remote ke `git@github.com:USERNAME/REPO.git`.
- Personal Access Token (HTTPS): buat PAT di `https://github.com/settings/tokens` dengan scope `repo`, dan gunakan PAT sebagai password ketika Git meminta credential.

Jika Anda menggunakan Windows, Anda bisa menyimpan PAT di Credential Manager agar Git tidak meminta ulang.

## Catatan Audio

- Aplikasi mencoba beberapa sumber audio (everyayah.com, alquran.cloud, dll.) untuk menemukan file audio. Untuk pengalaman terbaik, server backend sebaiknya yang melakukan pencarian sumber dan hanya mengembalikan URL final ke frontend.
- Default audio yang saat ini digunakan di kode adalah Sheikh Mishary Rasyid Al-Afasy. Jika Anda lebih memilih nada lain (mis. Jiharkah), saya bisa bantu mengganti prioritas sumber audio di `script.js` atau membuat backend yang selalu mengembalikan URL audio prioritas Anda bila tersedia.

## Sumber API

- `https://api.equran.id/api/v2/ayat/acak`
- `https://api.alquran.cloud/v1/`

## Lisensi

MIT License

---

> Dibuat dengan ❤️ oleh Alfandy516
````
