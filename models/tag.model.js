const mongoose = require('mongoose');


const tagSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    question: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Question',
        required: true
    }],
    resource: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Resource',
        required: true
    }]
}, { timestamps: true });

const Tag = mongoose.model('Tag', tagSchema);
module.exports = Tag;