const mongoose = require('mongoose');

const options = {discriminatorKey: "kind"};

const questionSchema = new mongoose.Schema({
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
}, { timestamps: true }, options);

const Question = mongoose.model('questions', questionSchema);
module.exports = Question;