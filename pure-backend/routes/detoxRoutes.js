const express = require('express');
const router = express.Router();
const { addDetoxRecord, getDetoxRecords } = require('../controllers/detoxController');
const { protect } = require('../middleware/authMiddleware');

router.post('/', protect, addDetoxRecord);
router.get('/', protect, getDetoxRecords);

module.exports = router;