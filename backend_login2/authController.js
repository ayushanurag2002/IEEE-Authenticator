// backend_login2/authController.js

const User = require('./userModel');

exports.authenticateUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email, password });

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
