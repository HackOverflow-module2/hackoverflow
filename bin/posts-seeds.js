
const mongoose = require('mongoose');
const Post = require('../models/post.model');
const posts = require('../data/posts.data');

require('../configs/db.config');

Post.insertMany(posts)
    .then(results => {
        console.log(`Seeded ${results.length} posts`)
        mongoose.connection.close();
    })
    .catch(error => {
        console.error(error);
        mongoose.connection.close();
    })
