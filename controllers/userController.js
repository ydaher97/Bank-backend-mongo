const User = require('../models/user'); 
const {recordTransaction} = require('../controllers/transactionController')
const createUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const newUser = await User.create({  name, email, password });

    res.status(201).json({ message: 'User created successfully', user: newUser });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create user', error: error.message });
  }
};

const depositCash = async (req, res) => {
    const { userID, amount } = req.body;
  
    try {
      const user = await User.findOne({ _id: userID });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      
      user.cash += parseInt(amount);
      await user.save();

      await recordTransaction({
        fromUserId: user._id,
        toUserId: null,
        amount,
        transactionType: 'DEPOSIT'
      });

      res.status(200).json({ message: 'Cash deposited successfully', user });
    } catch (error) {
      res.status(500).json({ message: 'Failed to deposit cash', error: error.message });
    }
  };
  
  // Update a user's credit
  const updateCredit = async (req, res) => {
    const { userID, creditAmount } = req.body;
  
    try {
      const user = await User.findOne({ _id: userID });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      if (creditAmount < 0) {
        return res.status(400).json({ message: 'Credit amount should be a positive number' });
      }
  
      user.credit = creditAmount;
      await user.save();
      res.status(200).json({ message: 'Credit updated successfully', user });
    } catch (error) {
      res.status(500).json({ message: 'Failed to update credit', error: error.message });
    }
  };
  
  // Withdraw money from a user
  const withdrawMoney = async (req, res) => {
    const { userID, amount } = req.body;
  
    try {
      const user = await User.findOne({ _id: userID });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      const totalAvailable = user.cash + user.credit;
      if (totalAvailable < amount) {
        return res.status(400).json({ message: 'Insufficient funds' });
      }
  
      if (user.cash >= amount) {
        user.cash -= amount;
      } else {
        const remainingCredit = amount - user.cash;
        user.cash = 0;
        user.credit -= remainingCredit;
      }
  
      await user.save();
      await recordTransaction({
        fromUserId: user._id,
        toUserId: null,
        amount,
        transactionType: 'WITHDRAWAL'
      });
      res.status(200).json({ message: 'Money withdrawn successfully', user });
    } catch (error) {
      res.status(500).json({ message: 'Failed to withdraw money', error: error.message });
    }
  };
  
  // Transfer money from one user to another
  const transferMoney = async (req, res) => {
    const { fromID, toID, amount } = req.body;
  
    try {
      const fromUser = await User.findOne({ _id: fromID });
      const toUser = await User.findOne({ _id: toID });
  
      if (!fromUser || !toUser) {
        return res.status(404).json({ message: 'User(s) not found' });
      }
  
      const totalAvailable = fromUser.cash + fromUser.credit;
      if (totalAvailable < amount) {
        return res.status(400).json({ message: 'Insufficient funds' });
      }
  
      if (fromUser.cash >= amount) {
        fromUser.cash -= amount;
        toUser.cash += amount;
      } else {
        const remainingCredit = amount - fromUser.cash;
        fromUser.cash = 0;
        if (fromUser.credit >= remainingCredit) {
          fromUser.credit -= remainingCredit;
          toUser.cash += amount;
        } else {
          return res.status(400).json({ message: 'Cannot transfer: Insufficient credit' });
        }
      }
  
      await fromUser.save();
      await toUser.save();
      await recordTransaction({
        fromUserId: fromUser._id,
        toUserId: toUser._id,
        amount,
        transactionType: 'TRANSFER'
      });
      
      res.status(200).json({ message: 'Money transferred successfully', fromUser, toUser });
    } catch (error) {
      res.status(500).json({ message: 'Failed to transfer money', error: error.message });
    }
  };
  
  const login = async (req, res) => {
    const { email, password } = req.body;
    console.log(email)
    try {
        const user = await User.findOne({ email }); 
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
          }
        if(user.password != password){
            return res.status(400).json({ message: 'password incorrect' });
        }
          res.status(200).json({ message: 'Login successful', user }); 

    } catch (error) {
        res.status(500).json({ message: 'Failed to find user', error: error.message });

    }
  }
  // Get details of a specific user
  const getUserDetails = async (req, res) => {
    const { id } = req.params;
    console.log(id)
  
    try {
      const user = await User.findOne({ _id: id });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.status(200).json({ user });
    } catch (error) {
      res.status(500).json({ message: 'Failed to get user details', error: error.message });
    }
  };
  
  // Get details of all users filtered by cash amount
  const filterByCash = async (req, res) => {
    const { minAmount, maxAmount } = req.params;
  
    try {
      const filteredUsers = await User.find({ cash: { $gte: parseInt(minAmount), $lte: parseInt(maxAmount) } });
      res.json({ users: filteredUsers });
    } catch (error) {
      res.status(500).json({ message: 'Failed to filter users by cash', error: error.message });
    }
  };
  
  // Get details of all users filtered by credit amount
  const filterByCredit = async (req, res) => {
    const { minCredit, maxCredit } = req.params;
  
    try {
      const filteredUsers = await User.find({ credit: { $gte: parseInt(minCredit), $lte: parseInt(maxCredit) } });
      res.json({ users: filteredUsers });
    } catch (error) {
      res.status(500).json({ message: 'Failed to filter users by credit', error: error.message });
    }
  };
  
  // Get details of all users
  const getAllUsersDetails = async (req, res) => {
    try {
      const users = await User.find({});
      res.status(200).json({ users });
    } catch (error) {
      res.status(500).json({ message: 'Failed to get all users details', error: error.message });
    }
  };

module.exports = { createUser ,
    depositCash,
    updateCredit,
    withdrawMoney,
    transferMoney,
    getUserDetails,
    getAllUsersDetails,
    filterByCash,
    filterByCredit,
    login};
