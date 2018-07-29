const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: 'Title is required',
        maxlength: 150
    },
    description: {
        type: String,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    tags: [{
        type: String
    }]
}, { timestamps: true, discriminatorKey: 'kind' });

const Post = mongoose.model('Post', postSchema);
module.exports = Post;