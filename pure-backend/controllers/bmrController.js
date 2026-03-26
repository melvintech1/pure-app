const BmrRecord = require('../models/BmrRecord');

exports.addBmrRecord = async (req, res) => {
  try {
    const { age, gender, weight, height, bmr } = req.body;
    const record = await BmrRecord.create({ userId: req.user._id, age, gender, weight, height, bmr });
    res.status(201).json({ success: true, data: record });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Gagal menyimpan data BMR' });
  }
};

exports.getBmrRecords = async (req, res) => {
  try {
    const records = await BmrRecord.find({ userId: req.user._id }).sort({ date: -1 });
    res.status(200).json({ success: true, data: records });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Gagal mengambil data BMR' });
  }
};