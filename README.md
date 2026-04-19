# ☁️ Lumina REST API Serverless

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![Vercel](https://img.shields.io/badge/Vercel-Serverless-black.svg?logo=vercel)
![Node.js](https://img.shields.io/badge/Node.js-v18+-green.svg)
![License](https://img.shields.io/badge/license-MIT-purple.svg)

**Lumina API** adalah REST API kustom berbasis Serverless yang dirancang secara mandiri untuk memproses dan mengekstrak media dari berbagai platform sosial media. Proyek ini dioptimalkan khusus untuk *deployment* di infrastruktur **Vercel** guna memastikan skalabilitas tinggi dan *bypass* anti-blokir.

---

## ✨ Keunggulan Arsitektur

* **🚀 Serverless Edge Functions:** Tidak memerlukan RAM server konvensional. API langsung hidup ketika dipanggil dan mati (*idle*) saat tidak digunakan, memangkas biaya server hingga 0.
* **🛡️ Stealth Proxy (Anti-Block):** Bertindak sebagai tameng/proxy pelindung bagi bot Telegram utama sehingga IP server bot terhindar dari pemblokiran API pihak ketiga.
* **🗃️ Standardized JSON Output:** Semua *endpoint* dirancang untuk mengembalikan format objek JSON yang konsisten, mempermudah pengikatan data (*data binding*) di aplikasi Front-End atau Bot apa pun.
* **⚡ Smart Type Detection:** Algoritma presisi tinggi yang otomatis mendeteksi apakah media berupa Video HD tunggal atau *Carousel/Slide* Foto (seperti pada TikTok).

---

## 📡 Endpoints (Tahap 1)

**Base URL:** `https://nama-domain-vercel-anda.vercel.app`

### 1. `GET /api/tiktok`
Mengambil data media tanpa *watermark* dari tautan TikTok.
* **Query Params:** `?url=<TAUTAN_TIKTOK>`
* **Contoh Request:** `/api/tiktok?url=https://vt.tiktok.com/xxxxxx/`
* **Format Respons:**
  ```json
  {
    "success": true,
    "platform": "tiktok",
    "type": "video", // atau "slide"
    "title": "Judul Video",
    "author": "Username TikTok",
    "media": [
      "[https://url-media-hd.mp4](https://url-media-hd.mp4)"
    ],
    "music": "[https://url-music.mp3](https://url-music.mp3)",
    "cover": "[https://url-thumbnail.jpg](https://url-thumbnail.jpg)",
    "stats": {
      "views": 1000,
      "likes": 500,
      "comments": 10,
      "shares": 5
    }
  }

  
🛠️ Panduan Deployment ke Vercel
Pastikan Anda telah membuat repositori di GitHub dan mengunggah semua file proyek ini.
Buka dashboard Vercel.
Klik Add New Project dan import repositori GitHub ini.
Biarkan konfigurasi default dari Vercel bekerja (tidak perlu mengatur Framework Preset).
Klik Deploy.
Selesai! API Anda sudah aktif secara publik.
<div align="center">
Lumina Ultimate Core System - Dibuat untuk Kecepatan dan Stabilitas
</div>
