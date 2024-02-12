// backend_login2/userModel.js

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  emailRev: String,
  passwordRev: String,
});

const User = mongoose.model('User', userSchema);

module.exports = User;
