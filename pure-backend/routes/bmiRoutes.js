const express = require('express');
const router = express.Router();
const { addBmiRecord, getBmiRecords } = require('../controllers/bmiController');
const { protect } = require('../middleware/authMiddleware'); 

router.post('/', protect, addBmiRecord);
router.get('/', protect, getBmiRecords);

module.exports = router;