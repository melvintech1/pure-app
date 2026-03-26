const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');

// Membuat jalur /register yang akan memanggil logika register
router.post('/register', register);

// Membuat jalur /login yang akan memanggil logika login
router.post('/login', login);

module.exports = router;