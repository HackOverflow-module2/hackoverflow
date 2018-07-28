const mongoose = require('mongoose');
const Resource = require('./resource.model');

const questionSchema = new mongoose.Schema({
}, { timestamps: true, discriminatorKey: 'kind' });

const Question = Resource.discriminator('Question', questionSchema);
module.exports = Question;