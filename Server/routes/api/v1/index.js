const express = require('express');
const router = express.Router();

const Transaction = require('../../../models/transaction.model');
const transactionController = require('../../../controllers/transaction.controller');

router.get('/', (req, res) => {
    res.send('Hello from the server v1');
});

router.get('/initialize',transactionController.initialize);
router.get('/transactions', transactionController.getTransactions);

router.use('/charts',require('./charts.routes'))

module.exports = router;