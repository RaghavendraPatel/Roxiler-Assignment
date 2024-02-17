
const Transaction = require('../models/transaction.model');
const axios = require('axios');

module.exports.initialize = async (req,res) =>{
    let transactions = await axios.get('https://s3.amazonaws.com/roxiler.com/product_transaction.json');
    transactions = transactions.data;
    let count = 0;
    try {
        Transaction.deleteMany({}).then(() => {
            console.log('Data Deleted');
            transactions.forEach(transaction => {
                const month = new Date(Date.parse(transaction.dateOfSale)).getMonth() + 1;
                Transaction.create({...transaction,month}).then(() => {
                    count++;
                    if (count === transactions.length) {
                        console.log('Data Initialized');
                    }
                }).catch((error) => {
                    console.log('Error:', error);
                });
            });
        });
        res.send('Data Initialized');
    }
    catch (error) {
        console.log('Error:', error);
    }

}

module.exports.getTransactions = async (req, res) => {
    try {
        const {month='', search='',page=1,limit=10} = req.query;
        const monthNumber = new Date(Date.parse(month +" 1, 2024")).getMonth()+1;
        const options={
            limit : parseInt(limit,10),
            page : parseInt(page,10),
        }
        let pipeline = []
        if(month === ''){
            pipeline = [
                {
                    $match:{
                        $or: [
                            {title: {$regex: search, $options: 'i'}},
                            {description: {$regex: search, $options: 'i'}},
                            {price: isNaN(search)? null: parseFloat(search)}
                        ]
                    }
                },
            ]
        }else{
         pipeline = [
                {
                    $match:{
                        $and: [
                            {$expr: {$eq: [{$month: {$toDate: '$dateOfSale'}}, monthNumber]}},
                            {
                                $or: [
                                        {title: {$regex: search, $options: 'i'}},
                                        {description: {$regex: search, $options: 'i'}},
                                        {price: isNaN(search)? null: parseFloat(search)}
                                    ]
                            },
                        ]
                        
                    }
                },
            ]
        }

        const transaction = await Transaction.aggregate(pipeline).sort('id').skip((options.page-1)*options.limit).limit(options.limit);
        
        res.status(200).json({transaction});

    } catch (error) {
        console.log('error in transaction:', error);
    }
}