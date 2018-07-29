const mongoose = require('mongoose');
const Post = require('./post.model');

const questionSchema = new mongoose.Schema({
}, { timestamps: true, discriminatorKey: 'kind' });

const Question = Post.discriminator('Question', questionSchema);
module.exports = Question;