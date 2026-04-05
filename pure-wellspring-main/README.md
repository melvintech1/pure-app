# 🌿 PURE - Health & Digital Detox App

> Mulai hidup lebih sehat, pantau kebiasaanmu, dan temukan keseimbangan digital bersama PURE.

PURE adalah aplikasi berbasis web yang dirancang khusus untuk membantu pengguna melacak kesehatan fisik dan mental secara terstruktur. Aplikasi ini dilengkapi dengan kalkulator kesehatan pintar dan fitur pelacakan *digital detox* untuk membatasi *screen time* berlebih.

## ✨ Fitur Utama

*  Autentikasi Aman:** Sistem pendaftaran dan login pengguna dengan token JWT. Dilengkapi *role-based access* (User & Admin).
*  Smart Calculator:** Perhitungan otomatis untuk *Body Mass Index* (BMI), *Basal Metabolic Rate* (BMR), dan target kebutuhan air harian.
*  Digital Detox:** Fitur pelacakan *screen time* (waktu layar) untuk membantu pengguna mengurangi kecanduan *gadget*.
*  Dashboard Interaktif:** Pantauan statistik mingguan dan harian dengan antarmuka pengguna (UI) yang bersih, minimalis, dan estetik.
*  Responsif:** Tampilan yang menyesuaikan dengan sempurna baik di layar *desktop* maupun perangkat *mobile*.

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
   cd pure-backend

2. Instal semua dependencies:

npm install
Buat file .env di dalam folder pure-backend dan isi dengan konfigurasi berikut:

Code snippet
PORT=5000
MONGO_URI=mongodb://localhost:27017/pure_db
JWT_SECRET=rahasia_jwt_anda_disini

Jalankan server:
node server.js
(Pastikan muncul tulisan "Berhasil terhubung ke MongoDB" dan "Server berjalan di port 5000")

3. Menjalankan Frontend (Client)
Buka terminal baru (biarkan terminal backend tetap berjalan) dan masuk ke folder root frontend.

Instal semua dependencies:
npm install

Jalankan server development:
npm run dev
Buka browser dan akses aplikasi di: http://localhost:8080

👥 Hak Cipta & Lisensi
Dibuat untuk memenuhi tugas Project Akhir.
© 2026 PURE Team. All rights reserved.


---

### Sedikit Tips untuk Presentasi Nanti:
Kalau dosen nanya, *"Apa keunggulan aplikasi kamu?"* Kamu tinggal jawab dengan percaya diri: **"Aplikasi ini menggabungkan pelacakan fisik (BMI & Air) dengan pelacakan mental (Digital Detox) dalam satu UI/UX yang modern, bersih, dan sangat responsif, dibangun dengan MERN Stack."**
