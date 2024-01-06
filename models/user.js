const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: { type: String, required: true },
  password: { type: String, required: true },
  cash: {
    type: Number,
    default: 0
  },
  credit: {
    type: Number,
    default: 0,
    min: 0
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
