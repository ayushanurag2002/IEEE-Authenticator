const User = require('./userModel'); // Assuming you have a User model

exports.authenticateUser = async (req, res) => {
  const { email, code } = req.body;

  try {
    // Assuming you have a User model with the following method
    const user = await User.findOne({ email, code });

    if (user) {
      // Authentication successful
      return res.status(200).json({ success: true, message: 'Authentication successful' });
    } else {
      // Authentication failed
      return res.status(401).json({ success: false, message: 'Authentication failed' });
    }
  } catch (error) {
    console.error('Authentication error:', error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
};
