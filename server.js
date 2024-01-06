require("dotenv").config();
const express = require('express')
const app = express()
const cors = require("cors");
const connection = require('./db')
const userRoutes = require('./routes/userRoute');
const TransactionRoutes = require('./routes/transactionsRoutes');


connection();

app.use(express.json())
app.use(cors())

app.use('/api', userRoutes);
app.use('/api/transaction', TransactionRoutes);




const port = process.env.PORT || 8080;
app.listen(port, ()=> console.log('connect'))