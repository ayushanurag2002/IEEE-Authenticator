const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = 5002;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect('mongodb+srv://ayush:apmosys%40123@userdetails.fksmxge.mongodb.net/');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Define MongoDB Schema
const reviewDataSchema = new mongoose.Schema({
    code: String,
    comments: String,
    score: Number,
    status: String,
  });
  
  const ReviewData = mongoose.model('ReviewData', reviewDataSchema);
  

// API Endpoint to Get Recent Updates
app.get('/api/review-updates', async (req, res) => {
    try {
      const recentUpdates = await ReviewData.find();
      console.log('Recent Updates:', recentUpdates);
      res.json(recentUpdates);
    } catch (error) {
      console.error('Error fetching recent updates:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  app.put('/api/update-status/:code', async (req, res) => {
    const { code } = req.params;
    const { status } = req.body;
  
    try {
      // Find the document by code and update the status
      await ReviewData.findOneAndUpdate({ code }, { status });
  
      res.json({ success: true, message: 'Status updated successfully' });
    } catch (error) {
      console.error('Error updating status:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  

// Start the Server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
