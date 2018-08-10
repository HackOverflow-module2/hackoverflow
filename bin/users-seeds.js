
const mongoose = require('mongoose');
const User = require('../models/user.model');
const users = require('../data/users.data')

require('../configs/db.config');

User.insertMany(users)
    .then(users => {
        console.log(`Seeded ${users.length} users`)
        mongoose.connection.close();
    })
    .catch(error => {
        console.error(error);
        mongoose.connection.close();
    })