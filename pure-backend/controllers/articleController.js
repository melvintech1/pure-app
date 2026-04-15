const Article = require('../models/Article');

exports.getArticles = async (req, res) => {
  try {
    const articles = await Article.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: articles });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Gagal mengambil artikel' });
  }
};

exports.addArticle = async (req, res) => {
  try {
    const { title, content, author } = req.body;
    const article = await Article.create({ title, content, author });
    res.status(201).json({ success: true, data: article });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Gagal menambah artikel' });
  }
};

exports.updateArticle = async (req, res) => {
  try {
    const { title, content } = req.body;
    const article = await Article.findByIdAndUpdate(
      req.params.id, 
      { title, content }, 
      { new: true } 
    );
    res.status(200).json({ success: true, data: article });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Gagal mengubah artikel' });
  }
};

exports.deleteArticle = async (req, res) => {
  try {
    await Article.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: 'Artikel berhasil dihapus' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Gagal menghapus artikel' });
  }
};