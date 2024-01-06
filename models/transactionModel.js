const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  transactionId: String,
  fromUserId: String,
  toUserId: String,
  amount: Number,
  transactionType: {
    type: String,
    enum: ['DEPOSIT', 'WITHDRAWAL', 'TRANSFER'] 
  },
  timestamp: { type: Date, default: Date.now }
});

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;
