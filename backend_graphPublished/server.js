// backend/server.js

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect('mongodb+srv://ayush:apmosys%40123@userdetails.fksmxge.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const PublishedPaper = mongoose.model('PublishedPaper', {
  code: String,
  status: String,
  sector: String,
  // Add other fields as needed
});

app.get('/api/published-papers', async (req, res) => {
  try {
    const data = await PublishedPaper.aggregate([
      {
        $match: {
          status: 'published',
        },
      },
      {
        $group: {
          _id: '$sector',
          count: { $sum: 1 },
        },
      },
    ]);

    res.json(data);
  } catch (error) {
    console.error('Error fetching published papers:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

const PORT = process.env.PORT || 5402;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
