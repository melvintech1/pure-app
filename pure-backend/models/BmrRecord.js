const mongoose = require('mongoose');

const bmrSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  age: { type: Number, required: true },
  gender: { type: String, required: true },
  weight: { type: Number, required: true },
  height: { type: Number, required: true },
  bmr: { type: Number, required: true },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('BmrRecord', bmrSchema);