# Telco — UI untuk Recommendation System

Repositori demo aplikasi frontend + backend minimal (Express + JSON store) berisi UI admin dan user untuk sistem rekomendasi paket telekomunikasi.

Fitur utama:
- Frontend: React + Vite (TypeScript)
- UI components & pages di `src/components`
- Backend minimal di `server/` untuk auth demo dan penyimpanan berbasis JSON

## Cara menjalankan (lokal)

1. Install dependensi:

```powershell
npm install
```

2. Jalankan frontend (Vite):

```powershell
npm run dev
```

3. Untuk menggunakan backend demo (opsional):

```powershell
npm run server
```

4. Contoh file `.env` (aktifkan backend):

```
VITE_USE_BACKEND=true
VITE_API_BASE=http://localhost:4000
```

5. Demo kredensial admin (jika backend aktif):

- Email: `admin@telco.dev`
- Password: `Admin123`

## Struktur proyek singkat

- `src/` — kode frontend (komponen, page, utilitas)
- `server/` — backend demo (Express)

## CI / Workflow
Repo ini sudah saya tambahkan file workflow GitHub Actions sederhana untuk melakukan instalasi dan build saat push.

---

Butuh bantuan lain? Saya bisa bantu:
- Menyiapkan deskripsi repo / topic di GitHub
- Membuat release / tag
- Menyambungkan ke layanan hosting (Vercel / Netlify)
- Memperbaiki masalah TypeScript dan menambahkan test

  ## Running the code

  Run `npm i` to install the dependencies.

  Run `npm run dev` to start the development server.
  