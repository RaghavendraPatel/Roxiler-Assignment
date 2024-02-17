const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
mongoose.connect(process.env.MONGODB_URI||'mongodb://localhost:27017/roxiler');

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Connected to the database');
});

module.exports = db;