const express = require('express');
const router = express.Router();
const { addWaterRecord, getWaterRecords } = require('../controllers/waterController');
const { protect } = require('../middleware/authMiddleware');

router.post('/', protect, addWaterRecord);
router.get('/', protect, getWaterRecords);

module.exports = router;