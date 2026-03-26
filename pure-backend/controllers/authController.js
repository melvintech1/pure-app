const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Logika untuk Register (Daftar Akun)
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Cek apakah email sudah pernah didaftarkan
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ success: false, message: 'Email sudah terdaftar' });
    }

    // Mengacak (hash) password agar tidak bisa dibaca sembarangan di database
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Membuat user baru di database
    const user = await User.create({
      name,
      email,
      password: hashedPassword
    });

    res.status(201).json({ success: true, message: 'Registrasi berhasil, silakan login' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Terjadi kesalahan pada server', error: error.message });
  }
};

// Logika untuk Login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Cari user berdasarkan email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ success: false, message: 'Email atau password salah' });
    }

    // Cocokkan password yang diketik dengan yang ada di database
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: 'Email atau password salah' });
    }

    // Membuat "Tiket Masuk" (Token JWT) agar user tetap login
    const token = jwt.sign(
      { id: user._id, role: user.role }, 
      process.env.JWT_SECRET, 
      { expiresIn: '30d' } // Token berlaku selama 30 hari
    );

    // Kirim data user dan token ke frontend
    res.status(200).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Terjadi kesalahan pada server', error: error.message });
  }
};