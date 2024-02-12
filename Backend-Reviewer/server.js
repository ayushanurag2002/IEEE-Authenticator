const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const PORT = 5001;

app.use(cors());
app.use(express.json()); // Enable JSON parsing middleware

// Connect to MongoDB
mongoose.connect('mongodb+srv://ayush:apmosys%40123@userdetails.fksmxge.mongodb.net/');

// Define the schema for the new collection
const reviewDataSchema = new mongoose.Schema({
  code: String,
  comments: String,
  score: Number,
  status: String,
  sector: String,
});

// Create the model for the new collection
const ReviewData = mongoose.model('ReviewData', reviewDataSchema);

// Define the schema for the original collection
const reviewerSchema = new mongoose.Schema({
  code: String,
  driveLink: String,
  comments: String,
  score: Number,
  status: String,
  sector: String, // Add 'sector' field to the schema
});

const Reviewer = mongoose.model('Reviewer', reviewerSchema);

app.get('/api/review', async (req, res) => {
  try {
    const { status } = req.query;

    // If status is not provided or is null, fetch all data
    const query = status === null && status === undefined ? {} : { status };
    
    // Fetch code, driveLink, status, and sector from MongoDB based on the provided query
    const reviewData = await Reviewer.find(query, 'code driveLink status sector');
    res.json(reviewData);
  } catch (error) {
    console.error('Error fetching review data:', error.message);
    res.status(500).send('Internal Server Error');
  }
});


// ...

app.post('/api/review', async (req, res) => {
  try {
    const { code, comments, score, sector } = req.body;

    // Assuming 'code' is the unique identifier for each entry in your database
    const reviewer = await Reviewer.findOne({ code });

    if (!reviewer) {
      return res.status(404).json({ error: 'Reviewer not found' });
    }

    // Update score, comments, and set status to "1st round over" in the original collection
    reviewer.comments = comments;
    reviewer.score = score;
    reviewer.status = '1st round over'; // Set default status
    reviewer.sector = sector; // Set the sector

    // Save the updated reviewer document
    await reviewer.save();

    // Create a new entry in the separate collection
    const newReviewData = {
      code, // Include the application number
      comments,
      score,
      status: '1st round over', // Set default status
      sector,
    };

    // Assuming 'ReviewData' is the model for the new collection
    await ReviewData.create(newReviewData);

    res.json({ success: true, code, comments, score, status: '1st round over', sector });
  } catch (error) {
    console.error('Error updating review data:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Reviewer Backend Server is running on port ${PORT}`);
});