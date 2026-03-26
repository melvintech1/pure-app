const express = require('express');
const router = express.Router();
const { addBmrRecord, getBmrRecords } = require('../controllers/bmrController');
const { protect } = require('../middleware/authMiddleware');

router.post('/', protect, addBmrRecord);
router.get('/', protect, getBmrRecords);

module.exports = router;