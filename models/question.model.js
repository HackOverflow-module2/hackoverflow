const mongoose = require('mongoose');

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
    } 
}, { timestamps: true });

const Question = mongoose.model('questions', questionSchema);
module.exports = Question;