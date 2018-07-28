const mongoose = require('mongoose');


const answerSchema = new mongoose.Schema({
    description: {
        type: String,
        required: 'Please, type an answer'
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    question: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Question',
        required: true
    }
}, { timestamps: true });

const Answer = mongoose.model('answer', answerSchema);
module.exports = Answer;