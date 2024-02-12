// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5003;

app.use(express.json());
app.use(cors());

// MongoDB Atlas connection string
const mongoURI = 'mongodb+srv://ayush:apmosys%40123@userdetails.fksmxge.mongodb.net/';
mongoose.connect(mongoURI);

const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB Atlas database connection established successfully');
});

// Assuming 'reviewdatas' is the collection name and it contains documents with fields 'status', 'score', and 'code'
const reviewDataSchema = new mongoose.Schema({
  status: String,
  score: Number,
  code: String,
  comments: String,
});

const ReviewData = mongoose.model('ReviewData', reviewDataSchema);

// API endpoint to fetch documents for a specific code
app.get('/api/search/:code', async (req, res) => {
  try {
    const { code } = req.params;
    const documents = await ReviewData.find({ code }, 'status score code comments');
    res.json(documents);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
