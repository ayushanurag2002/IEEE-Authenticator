

require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors'); 

const app = express();
const PORT = process.env.PORT || 5052;

app.use(bodyParser.json());
app.use(cors());


mongoose
  .connect('mongodb+srv://ayush:apmosys%40123@userdetails.fksmxge.mongodb.net/', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch((error) => {
    console.error('MongoDB connection failed:', error);
  });

// Define a user schema and model (replace with your schema)
const userSchema = new mongoose.Schema({
  emailRev: String,
  passwordRev: String,
});

const User = mongoose.model('User', userSchema);

// Endpoint for user authentication
app.post('/api/authenticate', async (req, res) => {
  const { emailRev, passwordRev } = req.body;

  try {
    // Check if the user exists in the MongoDB collection
    const user = await User.findOne({ emailRev, passwordRev });

    if (user) {
      // User exists, authentication successful
      res.status(200).json({ success: true, message: 'Authentication successful' });
    } else {
      // User doesn't exist or passwordRev is incorrect, authentication failed
      console.log("Wrong Credentials!");
      res.status(401).json({ success: false, message: 'Authentication failed' });
    }
  } catch (error) {
    console.error('Error during authentication:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
