const express = require('express');
const router = express.Router();
const { createUser,  depositCash,
    updateCredit,
    withdrawMoney,
    transferMoney,
    getUserDetails,
    getAllUsersDetails,
    filterByCash,
    filterByCredit,
login } = require('../controllers/userController');

router.post('/users', createUser); 

router.put('/users/deposit', depositCash);

router.put('/users/update-credit', updateCredit);

router.put('/users/withdraw', withdrawMoney);

router.put('/users/transfer', transferMoney);

router.get('/users/:id', getUserDetails); 

router.post('/users/login', login);


router.get('/users', getAllUsersDetails);

router.get('/filter/cash/:minAmount/:maxAmount', filterByCash);

router.get('/filter/credit/:minCredit/:maxCredit', filterByCredit);

module.exports = router;
