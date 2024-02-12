// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const UserModel = require('./userModel');

const app = express();
const PORT = process.env.PORT || 5401;

app.use(express.json());
app.use(cors());

// Connect to MongoDB (replace YOUR_MONGODB_URI with your actual MongoDB URI)
mongoose.connect('mongodb+srv://ayush:apmosys%40123@userdetails.fksmxge.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Check connection
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Route to get unique sectors with their counts
app.get('/api/unique-sectors', async (req, res) => {
  try {
    const sectorsWithCounts = await UserModel.aggregate([
      { $group: { _id: '$sector', count: { $sum: 1 } } },
    ]);

    res.json(sectorsWithCounts);
  } catch (error) {
    console.error('Error fetching unique sectors:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Your other routes and middleware can go here

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
