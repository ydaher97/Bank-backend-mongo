const Transaction = require('../models/transactionModel');
const TransactionTypes = require('../utils/TransactionTypes');

const recordTransaction = async ({ fromUserId, toUserId, amount, transactionType }) => {
    try {
      const newTransaction = new Transaction({
        fromUserId,
        toUserId,
        amount,
        transactionType
      });
  
      await newTransaction.save();
      return { message: 'Transaction recorded successfully' };
    } catch (error) {
      throw new Error(`Failed to record transaction: ${error.message}`);
    }
  };
  

// Function to fetch user's transaction history
const getUserTransactions = async (req, res) => {
  const userId = req.params.userId;

  try {
    const userTransactions = await Transaction.find({ fromUserId: userId });
    res.status(200).json({ transactions: userTransactions });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch user transactions', error: error.message });
  }
};

module.exports = { recordTransaction, getUserTransactions };
