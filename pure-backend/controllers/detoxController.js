const DetoxRecord = require('../models/DetoxRecord');

// Menyimpan data jam screen time baru
exports.addDetoxRecord = async (req, res) => {
  try {
    const { hours } = req.body;
    const record = await DetoxRecord.create({ userId: req.user._id, hours });
    res.status(201).json({ success: true, data: record });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Gagal menyimpan data Digital Detox' });
  }
};

// Mengambil riwayat screen time user
exports.getDetoxRecords = async (req, res) => {
  try {
    const records = await DetoxRecord.find({ userId: req.user._id }).sort({ date: -1 });
    res.status(200).json({ success: true, data: records });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Gagal mengambil data Digital Detox' });
  }
};