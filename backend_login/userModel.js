const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: String,
  code: String
});

module.exports = mongoose.model('User', userSchema);
