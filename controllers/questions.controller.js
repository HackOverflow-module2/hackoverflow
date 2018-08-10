const mongoose = require('mongoose');
const Question = require('../models/question.model');
const User = require('../models/user.model');
const Answer = require('../models/answer.model');
const Tag = require('../models/tag.model');
const sentiment = require('../service/service.sentiment');

module.exports.create = (req, res, next) => {
    Tag.find()
        .then(tags => {
            res.render('questions/create', {
                tags
            });
        })
        .catch(error => next(error))
}

module.exports.doCreate = (req, res, next) => {
    const sentimentAnalysis = sentiment.analyzeSentiment(req.body.description)

    const question = new Question({
        title: req.body.title,
        description: req.body.description,
        user: req.user._id,
        tags: req.body.tags,
        sentiment: sentimentAnalysis.score
    });
    
    question.save()
        .then((question) => {
            res.redirect(`/questions/${question._id}`)
          })
        .catch(error => {
            if (error instanceof mongoose.Error.ValidationError) {
                console.error(error);
                res.render('questions/create', { 
                    question,
                    errors: error.errors
                });
            } else {
                next(error);
            }
        })
}

module.exports.detail = (req, res, next) => {
    const url = req.originalUrl;
    const id = req.params.id;
    const questionPromise = Question.findById(id).populate('user');
    const answersPromise = Answer.find({question: id}).populate('user');


    Promise.all([questionPromise, answersPromise])
    .then(([question, answers]) => {
        if(question) {
            res.render('questions/detail', {
                question,
                url,
                answers: answers.reverse()
            })
        } 
    })
    .catch(error => next(error))
}

module.exports.delete = (req, res, next) => {
    const id = req.params.id;
    Question.findByIdAndDelete(id)
        .then(() => {
            res.redirect('/');
        })
        .catch(error => next(error))
}

module.exports.doUpdate = (req, res, next) => {
    const id = req.params.id;

    Question.findByIdAndUpdate(id, { $inc: {rating: 1} })
        .then(result => {
            if(result) {
                res.json({ newRating: result.rating + 1 })
            } else {
                next(createError(404, 'user not found'));
            }
        })
        .catch(error => next(error))
}