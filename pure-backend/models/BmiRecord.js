const mongoose = require('mongoose');

// Membuat kerangka data untuk hasil Kalkulator BMI
const bmiSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', // Menyambungkan data BMI ini dengan akun User yang menghitungnya
    required: true 
  },
  weight: { 
    type: Number, 
    required: true 
  },
  height: { 
    type: Number, 
    required: true 
  },
  bmi: { 
    type: Number, 
    required: true 
  },
  category: { 
    type: String, 
    required: true // Menyimpan kategori: Kurus, Normal, dll
  },
  date: { 
    type: Date, 
    default: Date.now // Otomatis mengisi tanggal hari ini
  }
});

module.exports = mongoose.model('BmiRecord', bmiSchema);