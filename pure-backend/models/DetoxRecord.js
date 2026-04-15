const mongoose = require('mongoose');

const detoxSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  hours: { type: Number, required: true }, 
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('DetoxRecord', detoxSchema);