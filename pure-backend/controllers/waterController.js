const WaterRecord = require('../models/WaterRecord');

exports.addWaterRecord = async (req, res) => {
  try {
    const { weight, waterMl } = req.body;
    const record = await WaterRecord.create({ userId: req.user._id, weight, waterMl });
    res.status(201).json({ success: true, data: record });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Gagal menyimpan data Air' });
  }
};

exports.getWaterRecords = async (req, res) => {
  try {
    const records = await WaterRecord.find({ userId: req.user._id }).sort({ date: -1 });
    res.status(200).json({ success: true, data: records });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Gagal mengambil data Air' });
  }
};