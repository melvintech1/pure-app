const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: String, required: true }
}, { 
  timestamps: true // Ini akan otomatis membuat 'createdAt' dan 'updatedAt'
});

module.exports = mongoose.model('Article', articleSchema);