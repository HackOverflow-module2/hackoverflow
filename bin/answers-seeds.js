
const mongoose = require('mongoose');
const Answer = require('../models/answer.model');
const answers = require('../data/answers.data');

require('../configs/db.config');

Answer.insertMany(answers)
    .then(results => {
        console.log(`Seeded ${results.length} answers`)
        mongoose.connection.close();
    })
    .catch(error => {
        console.error(error);
        mongoose.connection.close();
    })
