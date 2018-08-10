const mongoose = require('mongoose');
require('dotenv').config();

const MONGODB_URI = process.env.MONGO_URI;
mongoose.connect(MONGODB_URI)
    .then(() => {
        console.info(`Connected to the database: ${MONGODB_URI}`)
    })
    .catch(error => {
        console.error('Database connection error:', error);
    });