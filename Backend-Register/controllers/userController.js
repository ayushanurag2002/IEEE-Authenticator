const User = require('../models/User');

const registerUser = async (req, res) => {
  try {
    const { name, email, code, driveLink, sector } = req.body;

    // Check if the driveLink already exists in the database
    const existingUser = await User.findOne({ driveLink });

    if (existingUser) {
      // If the driveLink exists, return an error response
      return res.status(400).json({ error: 'This paper has already been uploaded.' });
    }

    // Save the user details to the database
    const newUser = new User({ name, email, code, driveLink, sector });
    const savedUser = await newUser.save();

    // Modify the response to include all user details
    res.status(201).json({
      message: 'Registration successful!',
      user: {
        _id: savedUser._id,
        name: savedUser.name,
        email: savedUser.email,
        code: savedUser.code,
        driveLink: savedUser.driveLink,
        sector: savedUser.sector,
        // Add other properties as needed
      },
    });
  } catch (error) {
    console.error('Error registering user:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  registerUser,
};
