# Purwokerto Intelligence Layer

## Deskripsi Project
**Purwokerto Intelligence Layer** adalah sebuah prototype smart city dashboard dan civic intelligence untuk wilayah Purwokerto. Project ini dibangun sebagai portofolio pembelajaran informatika untuk menerapkan visualisasi data perkotaan, algoritma prioritas berbasis aturan (*rule-based decision support*), pemodelan struktur data, dan rancangan UI/UX yang modern.

## Tujuan Project
1. **Penerapan Algoritma:** Menggunakan formula MCDM (*Multi-Criteria Decision Making*) linier sederhana untuk pembobotan urgensi wilayah.
2. **Visualisasi Civic Intelligence:** Menyediakan dashboard analitis yang memetakan prioritas pembangunan atau intervensi publik di setiap kecamatan.
3. **Sarana Pembelajaran:** Berfungsi sebagai pondasi portofolio rekayasa perangkat lunak modern menggunakan React, TypeScript, dan Tailwind CSS.

## Tech Stack
- **Framework:** React 19 (TypeScript)
- **Build Tool:** Vite
- **Styling:** Tailwind CSS (dengan Tailwind CSS v4)
- **Routing:** React Router v7
- **Iconography:** Lucide React
- **Standardisasi Code:** ESLint, Prettier

## Fitur Setup Awal
- **Landing Page:** Halaman pembuka interaktif dengan informasi umum project dan akses cepat menuju dashboard utama.
- **Dashboard Page:** Halaman utama yang memetakan data indikator dari 4 kecamatan di Purwokerto (Utara, Timur, Selatan, Barat). Setiap kecamatan memiliki:
  - Traffic Index (Indeks kemacetan lalu lintas)
  - Waste Index (Indeks penumpukan/pengelolaan sampah)
  - Public Service Index (Indeks kebutuhan/friksi pelayanan publik)
  - Student Mobility Index (Indeks mobilitas pelajar/mahasiswa)
  - Priority Score & Priority Status (Hasil kalkulasi tingkat prioritas intervensi)
- **Methodology Page:** Dokumentasi rumus pembobotan (*linear weighting formula*) dan tabel status prioritas.
- **About Page:** Informasi mengenai tujuan akademis project ini sebagai portofolio civic intelligence.

## Struktur Folder
```text
src/
├── components/
│   ├── layout/
│   │   └── Layout.tsx         # Layout navigasi & footer global
│   ├── ui/                    # UI components reusable (jika ada)
│   └── dashboard/
│       └── DistrictCard.tsx   # Card informasi indikator tiap kecamatan
├── data/
│   └── purwokertoDistricts.ts # Data simulasi 4 kecamatan
├── pages/
│   ├── LandingPage.tsx        # Halaman pembuka / welcome
│   ├── DashboardPage.tsx      # Dashboard utama peta prioritas
│   ├── MethodologyPage.tsx    # Dokumentasi formula & threshold
│   └── AboutPage.tsx          # Halaman portofolio & tech stack
├── utils/
│   └── scoring.ts             # Utility kalkulasi score & status prioritas
├── types/
│   └── index.ts               # Definisi type TypeScript (District, PriorityResult)
├── App.tsx                    # React Router routes setup
├── main.tsx                   # React root mount
└── index.css                  # Tailwind CSS import directives
```

## Cara Menjalankan Project

### Prerequisites
Pastikan Anda sudah menginstal **Node.js** (rekomendasi LTS v18 ke atas) dan **npm** di komputer Anda.

### Langkah Instalasi
1. Clone repository ini atau buka folder workspace.
2. Instal semua dependensi:
   ```bash
   npm install
   ```

### Menjalankan Development Server
Untuk menjalankan project secara lokal dengan hot-reload:
```bash
npm run dev
```
Setelah dijalankan, buka alamat yang tertera di terminal (biasanya `http://localhost:5173`) di browser Anda.

### Build untuk Produksi
Untuk melakukan kompilasi file menjadi aset siap produksi (HTML, JS, CSS teroptimasi di dalam folder `dist/`):
```bash
npm run build
```
Anda juga dapat mengetes hasil build produksi secara lokal dengan perintah:
```bash
npm run preview
```

## Catatan Simulasi Data
> **PENTING:** Seluruh data indikator (Traffic, Waste, Public Service, Student Mobility) yang ditampilkan di dalam project ini adalah **data simulasi/mock** untuk kepentingan demonstrasi dan akademik. Project ini **bukan** sistem resmi pemerintah Kabupaten Banyumas atau Kota Purwokerto.

## Roadmap Pengembangan
- [ ] **Phase 1 (Current):** Setup initial frontend prototype foundation (React + TS + Tailwind + Routing).
- [ ] **Phase 2:** Integrasi visualisasi grafik menggunakan library chart (seperti Recharts) untuk tren indikator.
- [ ] **Phase 3:** Penambahan peta interaktif (Leaflet / Mapbox) untuk visualisasi spasial kecamatan di Purwokerto.
- [ ] **Phase 4:** Fitur simulasi dinamis (Slider control) agar user dapat menyesuaikan sendiri bobot (*weights*) formula prioritas secara real-time.
- [ ] **Phase 5:** Pembuatan mock backend API atau integrasi dengan serverless functions untuk persistence data.
