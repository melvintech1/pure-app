const BmiRecord = require('../models/BmiRecord');

// Logika untuk menyimpan data BMI baru
exports.addBmiRecord = async (req, res) => {
  try {
    const { weight, height, bmi, category } = req.body;

    // Membuat data baru di database. 
    // req.user._id didapat dari "Satpam" kita tadi.
    const record = await BmiRecord.create({
      userId: req.user._id, 
      weight,
      height,
      bmi,
      category
    });

    res.status(201).json({ success: true, data: record });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Gagal menyimpan data BMI', error: error.message });
  }
};

// Logika untuk mengambil semua riwayat BMI milik user tersebut
exports.getBmiRecords = async (req, res) => {
  try {
    // Cari data yang userId-nya sama dengan user yang sedang login
    const records = await BmiRecord.find({ userId: req.user._id }).sort({ date: -1 }); // sort -1 agar yang terbaru di atas
    res.status(200).json({ success: true, data: records });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Gagal mengambil data BMI' });
  }
};