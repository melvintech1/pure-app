const BmiRecord = require('../models/BmiRecord');

exports.addBmiRecord = async (req, res) => {
  try {
    const { weight, height, bmi, category } = req.body;

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

exports.getBmiRecords = async (req, res) => {
  try {
    const records = await BmiRecord.find({ userId: req.user._id }).sort({ date: -1 }); 
    res.status(200).json({ success: true, data: records });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Gagal mengambil data BMI' });
  }
};