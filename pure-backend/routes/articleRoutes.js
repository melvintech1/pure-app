const express = require('express');
const router = express.Router();
const { getArticles, addArticle, updateArticle, deleteArticle } = require('../controllers/articleController');
const { protect } = require('../middleware/authMiddleware');

// Siapapun bisa membaca artikel (tanpa 'protect')
router.get('/', getArticles);

// Hanya admin/user yang login yang bisa menambah, mengubah, dan menghapus ('protect')
router.post('/', protect, addArticle);
router.put('/:id', protect, updateArticle);
router.delete('/:id', protect, deleteArticle);

module.exports = router;