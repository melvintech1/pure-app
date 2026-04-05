const express = require('express');
const router = express.Router();
const { getArticles, addArticle, updateArticle, deleteArticle } = require('../controllers/articleController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', getArticles);

router.post('/', protect, addArticle);
router.put('/:id', protect, updateArticle);
router.delete('/:id', protect, deleteArticle);

module.exports = router;