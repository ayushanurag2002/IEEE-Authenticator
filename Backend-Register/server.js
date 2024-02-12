const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./routes/users');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
mongoose.connect('mongodb+srv://ayush:apmosys%40123@userdetails.fksmxge.mongodb.net/');

// Middleware
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cors());

// Routes
app.use('/api/users', userRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
 console.error(err.stack);
 res.status(500).send('Something went wrong!');
});

// Start the server
app.listen(PORT, () => {
 console.log(`Server is running on port ${PORT}`);
});
