require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(cors()); 
app.use(express.json()); 


const authRoutes = require('./routes/authRoutes');
const bmiRoutes = require('./routes/bmiRoutes');
const bmrRoutes = require('./routes/bmrRoutes');     
const waterRoutes = require('./routes/waterRoutes');
const detoxRoutes = require('./routes/detoxRoutes');
const articleRoutes = require('./routes/articleRoutes');






app.use('/api/auth', authRoutes);
app.use('/api/bmi', bmiRoutes);
app.use('/api/bmr', bmrRoutes);      
app.use('/api/water', waterRoutes);
app.use('/api/detox', detoxRoutes);
app.use('/api/articles', articleRoutes);


app.get('/', (req, res) => {
  res.send('Server PURE Backend berjalan dengan lancar!');
});

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('✅ Berhasil terhubung ke MongoDB');
    // Menyalakan server
    app.listen(PORT, () => {
      console.log(`🚀 Server berjalan di http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ Gagal terhubung ke MongoDB:', err.message);
  });