// server.js

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5200;

app.use(express.json());
app.use(cors());

// MongoDB Atlas connection string
const mongoURI = 'mongodb+srv://ayush:apmosys%40123@userdetails.fksmxge.mongodb.net/';
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB Atlas database connection established successfully');
});

// Assuming 'reviewdatas' is the collection name
const reviewDataSchema = new mongoose.Schema({
  status: String,
  score: Number,
  code: String,
  comments: String,
});

const ReviewData = mongoose.model('ReviewData', reviewDataSchema);

// API endpoint to fetch counts
app.get('/api/documents/count', async (req, res) => {
  try {
    const totalCount = await ReviewData.countDocuments();
    const toBeReviewedCount = await ReviewData.countDocuments({ status: '1st round over' });
    const publishedCount = await ReviewData.countDocuments({ status: 'published' });
    const toBePublishedCount = await ReviewData.countDocuments({ status: '1st round over' });

    res.json({
      totalCount,
      toBeReviewedCount,
      publishedCount,
      toBePublishedCount,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
