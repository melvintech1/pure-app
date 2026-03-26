const mongoose = require('mongoose');

// Membuat kerangka data untuk User
const userSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },
  email: { 
    type: String, 
    required: true, 
    unique: true // Email tidak boleh ada yang sama
  },
  password: { 
    type: String, 
    required: true 
  },
  role: { 
    type: String, 
    default: 'user' // Otomatis menjadi 'user' biasa saat mendaftar
  }
}, { 
  timestamps: true // Otomatis mencatat kapan akun dibuat (createdAt)
});

// Mengekspor model agar bisa dipakai di file lain
module.exports = mongoose.model('User', userSchema);