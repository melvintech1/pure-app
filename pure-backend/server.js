// Memuat rahasia dari file .env
require('dotenv').config();

// Mengimpor library yang dibutuhkan
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Membuat aplikasi express
const app = express();

// Middleware
app.use(cors()); // Mengizinkan request dari frontend
app.use(express.json()); // Membantu backend membaca data JSON yang dikirim frontend


// Mengimpor rute untuk otentikasi
const authRoutes = require('./routes/authRoutes');
const bmiRoutes = require('./routes/bmiRoutes');
const bmrRoutes = require('./routes/bmrRoutes');     
const waterRoutes = require('./routes/waterRoutes');
const detoxRoutes = require('./routes/detoxRoutes');
const articleRoutes = require('./routes/articleRoutes');






// Menggunakan routes dengan awalan /api/auth
app.use('/api/auth', authRoutes);
app.use('/api/bmi', bmiRoutes);
app.use('/api/bmr', bmrRoutes);      
app.use('/api/water', waterRoutes);
app.use('/api/detox', detoxRoutes);
app.use('/api/articles', articleRoutes);
// --------------------------


// Mengecek apakah server hidup
app.get('/', (req, res) => {
  res.send('Server PURE Backend berjalan dengan lancar!');
});

// Konfigurasi Database MongoDB
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('✅ Berhasil terhubung ke MongoDB');
    // Menyalakan server
    app.listen(PORT, () => {
      console.log(`🚀 Server berjalan di http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ Gagal terhubung ke MongoDB:', err.message);
  });