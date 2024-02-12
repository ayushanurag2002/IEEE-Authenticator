const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  name: String,
  email: String,
  code: String,
  driveLink: String,
  sector: String,
});

const User = mongoose.model('User', userSchema);

module.exports = User;
