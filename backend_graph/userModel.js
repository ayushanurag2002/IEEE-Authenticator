// userModel.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  sector: {
    type: String,
    required: true,
  },
});

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;
