const express = require('express');
const app = express();
const port = 8000;

const db = require('./config/mongoose');

const bodyParser = require('body-parser');
const dotenv = require('dotenv').config();

const cors = require('cors');
const corsOptions = {
    origin: process.env.CLIENT_URI||'http://localhost:5173',
    credentials: true,
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/', require('./routes'));

app.listen(port, (error) => {
        if (error) {
            console.log('Something went wrong', error);
        }
        else{
            console.log(`Server is running on port ${port}`);
        }
    }
);