const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Fungsi 'protect' ini adalah Satpam kita
exports.protect = async (req, res, next) => {
  let token;

  // Mengecek apakah ada "Tiket Masuk" (Token) yang dikirim oleh frontend
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Mengambil token-nya saja
      token = req.headers.authorization.split(' ')[1];

      // Membaca isi token menggunakan rahasia kita
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Mencari data user di database berdasarkan isi token, lalu menempelkannya ke request
      req.user = await User.findById(decoded.id).select('-password');
      
      next(); // Silakan lewat!
    } catch (error) {
      return res.status(401).json({ success: false, message: 'Sesi tidak valid, silakan login ulang' });
    }
  }

  if (!token) {
    return res.status(401).json({ success: false, message: 'Anda belum login' });
  }
};