const mongoose = require('mongoose');

const resourceSchema = new mongoose.Schema({
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

const Resource = mongoose.model('Resource', resourceSchema);
module.exports = Resource;