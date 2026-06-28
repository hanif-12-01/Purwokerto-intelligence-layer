# 🗺️ Purwokerto Intelligence Layer (PIL)
> *Platform Intelijen Publik & Dashboard GIS Interaktif Prioritas Pembangunan Kota Purwokerto*

[![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD627)](https://vite.dev/)
[![React 19](https://img.shields.io/badge/React_19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS_v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Leaflet GIS](https://img.shields.io/badge/Leaflet_GIS-199900?style=for-the-badge&logo=leaflet&logoColor=white)](https://leafletjs.com/)

---

## 📌 Deskripsi Proyek
**Purwokerto Intelligence Layer (PIL)** adalah prototipe sistem penunjang keputusan perkotaan (*smart city decision support system*) dan dashboard *Civic Intelligence* interaktif untuk wilayah Kecamatan Pusat Purwokerto (Purwokerto Utara, Purwokerto Timur, Purwokerto Selatan, Purwokerto Barat). 

Platform ini dirancang khusus untuk mensimulasikan agregasi data indikator perkotaan, memetakan secara spasial prioritas penanganan wilayah menggunakan Leaflet GIS, menguji sensitivitas kebijakan lewat simulator bobot dinamis, serta meningkatkan akuntabilitas melalui penyelesaian keluhan warga.

---

## 🌟 Fitur Utama (Features)

### 1. 🗺️ Peta Prioritas Perkotaan GIS (Interactive Leaflet Map)
*   **Interaktif & Spasial:** Visualisasi batas wilayah administratif 4 kecamatan pusat Purwokerto menggunakan poligon GeoJSON.
*   **Layer Dinamis:** Ganti visualisasi peta secara instan antara:
    *   *Skor Prioritas Utama* (Formula Pembobotan)
    *   *Lalu Lintas & Mobilitas*
    *   *Drainase & Banjir*
    *   *Sampah & Kebersihan*
    *   *Mobilitas Pelajar*
    *   *Urgensi Laporan Warga*
    *   *Tingkat Keyakinan Data*
*   **Penanda Detail (Interactive Markers):** Klik marker berdesain modern di setiap pusat kecamatan untuk menampilkan skor dinamis dan melihat detail indikator secara instan pada panel kanan.

### 2. 🎛️ Simulator Kebijakan Dinamis (Policy Simulator)
*   **Penyesuaian Bobot Kriteria:** Geser slider bobot indikator secara real-time untuk melihat pergeseran prioritas pembangunan.
*   **Presets Skenario Perkotaan:** Pilih skenario siap pakai seperti *Prioritas Musim Hujan* (banjir & sampah), *Lalu Lintas Padat* (kemacetan & pelajar), *Responsif Warga* (laporan), atau *Reset Setelan Pabrik*.
*   **Perhitungan Real-time:** Peringkat kecamatan diperbarui secara langsung saat bobot digeser.

### 3. 💬 Sinyal Umpan Balik Warga (Civic Feedback Signals)
*   **Agregasi Keluhan Warga:** Modul analitis untuk meninjau sentimen keluhan publik dari media sosial, SMS, dan platform laporan resmi.
*   **Kategori Masalah:** Pelabelan otomatis untuk kemacetan, drainase, persampahan, dan fasilitas publik.
*   **Sanitasi Data:** Fitur sensor otomatis kata sandi, email, dan NIK demi perlindungan privasi data warga.

### 4. 📄 Draf Ringkasan Kebijakan AI (AI Policy Brief Draft)
*   **Generasi Ringkasan Eksekutif:** Secara otomatis membuat dokumen brief kebijakan dengan menyoroti area darurat utama, rekomendasi penanganan taktis, dan pemaparan metodologi pembobotan.
*   **Aksi Cepat Ekspor:** Cetak dokumen langsung menggunakan gaya ramah cetak (print-friendly stylesheet) untuk rapat koordinasi dinas.

### 5. ⚖️ Akuntabilitas Resolusi (Resolution Accountability)
*   **Peta Jalan Validasi Lapangan:** Memetakan status penanganan (Selesai, Sedang Diverifikasi, Proses Lapangan) dan tingkat keyakinan data (*Data Confidence Score*) guna memastikan transparansi audit fisik sebelum anggaran dialokasikan.

---

## ⚙️ Arsitektur & Teknologi (Tech Stack)

*   **Frontend Library:** React 19 (Hooks, Context, State Management)
*   **Programming Language:** TypeScript (Strict Type-Safety)
*   **Build Tool & Dev Server:** Vite 8
*   **Styling Engine:** Tailwind CSS v4 (Sistem grid modern, flexbox, utilitas transisi, dan filter backdrop blur)
*   **Mapping Engine:** Leaflet JS & React Leaflet (Rendering peta, kontrol layer, marker dinamis, popup tooltip)
*   **Routing System:** React Router v7
*   **Icon Library:** Lucide React

---

## 📂 Struktur Direktori Proyek

```text
Purwokerto-intelligence-layer/
├── Asset/                     # Aset gambar & ilustrasi
├── public/                    # Aset publik statis (Favicon, Icons)
├── src/
│   ├── assets/                # Gambar yang diproses oleh build tool
│   ├── components/            # Komponen modular reusable
│   │   ├── accountability/    # Detail laporan & progres verifikasi lapangan
│   │   ├── dashboard/         # Widget ringkasan, preview civic, & metrik
│   │   ├── feedback/          # Filter & daftar keluhan warga
│   │   ├── map/               # Peta GIS Canvas, Kontrol Layer, Legenda, & Detail
│   │   ├── signalReview/      # Analisis sentimen laporan
│   │   ├── simulator/         # Slider bobot dinamis & kontrol skenario preset
│   │   └── ui/                # Elemen antarmuka generik
│   ├── data/                  # GeoJSON boundaries & dataset simulasi kecamatan
│   ├── pages/                 # Halaman utama rute aplikasi
│   │   ├── DashboardPage.tsx  # Halaman dashboard & peta GIS utama
│   │   ├── SimulatorPage.tsx  # Simulasi bobot kebijakan publik
│   │   ├── FeedbackPage.tsx   # Pusat keluhan warga & sanitasi data
│   │   ├── PolicyBriefPage.tsx# Draf laporan ringkasan kebijakan otomatis
│   │   ├── AccountabilityPage.tsx # Validasi lapangan & status resolusi
│   │   └── AboutPage.tsx      # Latar belakang akademik & profil
│   ├── types/                 # Definisi tipe TypeScript
│   ├── utils/                 # Logika pembobotan (scoring) & penyimpanan lokal
│   ├── App.tsx                # Konfigurasi rute React Router
│   ├── main.tsx               # Entrypoint inisialisasi React
│   └── index.css              # Setup Tailwind & kustomisasi global
├── index.html                 # Template HTML utama
├── tailwind.config.js         # Konfigurasi Tailwind CSS
├── tsconfig.json              # Konfigurasi TypeScript compiler
└── vite.config.ts             # Konfigurasi bundler Vite
```

---

## 🚀 Cara Menjalankan Aplikasi di Komputer Anda

### 📦 Prasyarat (Prerequisites)
Pastikan komputer Anda sudah terpasang **Node.js** (LTS v18 atau yang lebih baru) dan **npm**.

### 🛠️ Langkah Instalasi & Menjalankan

1.  **Unduh Repositori & Masuk Folder:**
    ```bash
    git clone https://github.com/hanif-12-01/Purwokerto-intelligence-layer.git
    cd Purwokerto-intelligence-layer
    ```

2.  **Instal Dependensi Project:**
    ```bash
    npm install
    ```

3.  **Jalankan Mode Pengembangan (Development Server):**
    ```bash
    npm run dev
    ```
    *Aplikasi akan berjalan secara lokal. Buka alamat yang muncul di terminal Anda (contohnya `http://localhost:5173` atau `http://localhost:5177`).*

4.  **Kompilasi Aset untuk Produksi (Production Build):**
    ```bash
    npm run build
    ```
    *Hasil kompilasi file statis optimal siap diunggah akan berada di dalam folder `dist/`.*

---

## 🧠 Metodologi Pembobotan Skor Prioritas
Penetapan prioritas pembangunan dihitung menggunakan pendekatan **Multi-Criteria Decision Making (MCDM)** terbobot:

$$\text{Skor Prioritas} = \sum (I_i \times W_i)$$

Di mana:
*   $I_i$ = Indeks ternormalisasi (0 - 100) untuk masing-masing kriteria (Lalu lintas, Drainase, Sampah, Jalan, Keluhan, Mobilitas Pelajar, Beban Layanan).
*   $W_i$ = Bobot kriteria ($0 - 1$) yang dapat disesuaikan secara interaktif pada menu **Simulator**.

---

## 🔒 Pernyataan Data Simulasi
> ⚠️ **Pernyataan Penting:** Seluruh indikator kinerja perkotaan, batasan kecamatan, keluhan warga, dan analisis skor di dalam platform ini adalah **data simulasi/buatan (mock data)** yang ditujukan sebagai materi demonstrasi portofolio rekayasa perangkat lunak dan analisis spasial dasar. Platform ini **bukan** representasi atau sistem operasional resmi milik Pemerintah Kabupaten Banyumas maupun Pemerintah Daerah Kota Purwokerto.

---

## 🧑‍💻 Hak Cipta & Kontribusi
Dikembangkan dengan penuh dedikasi sebagai platform portofolio teknologi civic intelligence interaktif Purwokerto. 

*Design & Development by [Hanif](https://github.com/hanif-12-01).*
