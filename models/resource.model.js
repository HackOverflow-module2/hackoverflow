const mongoose = require('mongoose');
const Post = require('./post.model');

const resourceSchema = new mongoose.Schema({
}, { timestamps: true, discriminatorKey: 'kind' });

const Resource = Post.discriminator('Resource', resourceSchema);
module.exports = Resource;