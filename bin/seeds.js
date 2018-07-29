
const mongoose = require('mongoose');
const Tag = require('../models/tag.model');
const tags = require('../data/tags.data')

require('../configs/db.config');

Tag.insertMany(tags)
    .then(tags => {
        console.log(`Seeded ${tags.length} tags`)
        mongoose.connection.close();
    })
    .catch(error => {
        console.error(error);
        mongoose.connection.close();
    })