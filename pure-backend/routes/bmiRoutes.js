const express = require('express');
const router = express.Router();
const { addBmiRecord, getBmiRecords } = require('../controllers/bmiController');
const { protect } = require('../middleware/authMiddleware'); // Panggil sang Satpam

// Saat ada yang mengakses jalur ini, lewati 'protect' dulu. Kalau lolos, baru jalankan logikanya.
router.post('/', protect, addBmiRecord);
router.get('/', protect, getBmiRecords);

module.exports = router;