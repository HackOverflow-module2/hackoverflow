const mongoose = require('mongoose');
const Question = require('./question.model');

const options = {discriminatorKey: "kind"};

const Resource = Question.discriminator('Resource',
    new mongoose.Schema({}, options)
)