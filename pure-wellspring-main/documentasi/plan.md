

# PURE - Personal Unified Resource for Wellness & Efficiency

Aplikasi web wellness dengan desain dashboard-focused, menggunakan localStorage untuk simulasi data. Semua fitur berfungsi penuh di frontend.

## Pages & Navigation
- **Sidebar layout** dengan navigasi: Dashboard, Calculator (BMI/BMR/Water), Digital Detox, Articles, Admin Panel
- **Login & Register** pages dengan form validation (data user disimpan di localStorage, password di-hash client-side)
- **Protected routes** — redirect ke login jika belum authenticated

## Dashboard Page
- Card summary: BMI terakhir, BMR, kebutuhan air harian, screen time hari ini
- **Chart** (menggunakan Recharts): grafik BMI history dan screen time mingguan
- Desain data-dense dengan grid cards

## Calculator Page
- **BMI Calculator**: input berat & tinggi → hasil BMI + kategori (Kurus/Normal/Overweight/Obesitas) dengan indikator warna
- **BMR Calculator**: input umur, jenis kelamin, berat, tinggi → kebutuhan kalori harian (formula Harris-Benedict)
- **Water Calculator**: input berat → kebutuhan air harian (ml)
- Semua hasil tersimpan di localStorage dan muncul di dashboard

## Digital Detox Tracker
- Form input screen time harian (jam + tanggal)
- Tabel riwayat screen time
- Chart tren mingguan

## Article Page
- Daftar artikel wellness (dari localStorage)
- Baca artikel detail

## Admin Panel
- CRUD artikel (tambah, edit, hapus)
- Tabel daftar artikel dengan aksi

## Design
- Dashboard-focused: sidebar navigation, dark header, card-based layout
- Warna tema: hijau/teal untuk wellness
- Clean typography, data-dense cards dengan ikon

