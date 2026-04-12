# PURE App 

PURE adalah aplikasi berbasis web yang dirancang untuk membantu pengguna melacak aktivitas detoksifikasi digital dan memantau kesehatan mental serta fisik mereka. Aplikasi ini dibangun sebagai bagian dari Capstone Project Coding Camp 2026.

**Live Demo:** [Kunjungi Aplikasi PURE](https://pure-app-jdgq.vercel.app)

## Tech Stack

**Frontend:**
* React (menggunakan Vite)
* Deployment: Vercel

**Backend:**
* Node.js & Express.js
* Deployment: Railway

**Database:**
* MongoDB (Mongoose)

## Fitur Utama

* **Otentikasi Pengguna:** Register dan Login dengan aman.
* **Manajemen Artikel:** Pengguna dapat membuat, membaca, mengedit, dan menghapus artikel (CRUD).
* **Responsive Design:** Antarmuka yang ramah pengguna.
* **RESTful API:** Komunikasi yang lancar antara frontend dan backend.

## Cara Menjalankan Secara Lokal (Local Development)

Jika Anda ingin menjalankan proyek ini di komputer Anda sendiri, ikuti langkah-langkah berikut:

### Prasyarat
Pastikan Anda sudah menginstal [Node.js](https://nodejs.org/) dan memiliki akun MongoDB/MongoDB Compass.

### 1. Clone Repository
```bash
git clone [https://github.com/dewimasulul/pure-app.git]
```

### 2. Setup Backend (Server)
Buka terminal baru dan arahkan ke folder backend:
```bash
cd backend
npm install
```
Buat file `.env` di dalam folder `backend` dan isi dengan variabel berikut:
```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/pure-db   # Atau link MongoDB Atlas Anda
JWT_SECRET=rahasia_banget_123                 # Ganti dengan secret key yang aman
```
Jalankan server backend:
```bash
npm start
```

### 3. Setup Frontend (Client)
Buka terminal baru (biarkan terminal backend tetap berjalan), dan arahkan ke folder frontend:
```bash
cd frontend
npm install
```
Jika Anda menjalankan ini secara lokal, pastikan URL fetch di kodingan mengarah ke `http://localhost:5000`. Jika menggunakan backend produksi, arahkan ke link Railway.

Jalankan server frontend:
```bash
npm run dev


---
Dibuat oleh Tim CC26-PS093 untuk Capstone Project Coding Camp 2026.