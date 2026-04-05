# 🌿 PURE - Health & Digital Detox App

> Mulai hidup lebih sehat, pantau kebiasaanmu, dan temukan keseimbangan digital bersama PURE.

PURE adalah aplikasi berbasis web yang dirancang khusus untuk membantu pengguna melacak kesehatan fisik dan mental secara terstruktur. Aplikasi ini dilengkapi dengan kalkulator kesehatan pintar dan fitur pelacakan *digital detox* untuk membatasi *screen time* berlebih.

## ✨ Fitur Utama

* **🔐 Autentikasi Aman:** Sistem pendaftaran dan login pengguna dengan token JWT. Dilengkapi *role-based access* (User & Admin).
* **🧮 Smart Calculator:** Perhitungan otomatis untuk *Body Mass Index* (BMI), *Basal Metabolic Rate* (BMR), dan target kebutuhan air harian.
* **📵 Digital Detox:** Fitur pelacakan *screen time* (waktu layar) untuk membantu pengguna mengurangi kecanduan *gadget*.
* **📊 Dashboard Interaktif:** Pantauan statistik mingguan dan harian dengan antarmuka pengguna (UI) yang bersih, minimalis, dan estetik.
* **📱 Responsif:** Tampilan yang menyesuaikan dengan sempurna baik di layar *desktop* maupun perangkat *mobile*.

## 🛠️ Teknologi yang Digunakan

**Bagian Frontend:**
* React.js (menggunakan Vite)
* Tailwind CSS (untuk *styling*)
* React Router DOM (sistem navigasi/routing)
* React Query & Context API (manajemen *state*)
* Lucide React (ikon)

**Bagian Backend:**
* Node.js & Express.js
* MongoDB & Mongoose (Database)
* JSON Web Token (JWT) untuk Autentikasi
* Bcrypt (enkripsi *password*)

## 🚀 Cara Menjalankan Projek (Local Development)

Ikuti langkah-langkah di bawah ini untuk menjalankan aplikasi PURE di komputer lokal Anda.

### Persyaratan Sistem
* Node.js (versi 16 atau lebih baru)
* MongoDB (berjalan secara lokal atau MongoDB Atlas)

### 1. Menjalankan Backend (Server)

1. Buka terminal dan masuk ke folder backend:
   ```bash
   cd pure-backend