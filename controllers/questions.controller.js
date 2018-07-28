const mongoose = require('mongoose');
const Question = require('../models/question.model');
const User = require('../models/user.model');
const Answer = require('../models/answer.model');

module.exports.create = (req, res, next) => {
    res.render('questions/create');
}

module.exports.doCreate = (req, res, next) => {

    const question = new Question({
        title: req.body.title,
        description: req.body.description,
        user: req.user._id
    });
    question.save()
        .then((question) => {
            res.redirect(`/questions/${question._id}`)
          })
        .catch(error => {
            if (error instanceof mongoose.Error.ValidationError) {
                console.error(error);
                res.render('questions/create', { 
                    question: question,
                    errors: error.errors
                });
            } else {
                next(error);
            }
        })
}

module.exports.detail = (req, res, next) => {
    const id = req.params.id;

    Question.findById(id)
    .populate('user')
        .then(question => {
            if (question) {
                return Answer.find({question: id})
                    .then(answers => {
                        res.render('questions/detail', {
                            question,
                            answers,
                        });
                    })
            } else {
                next(createError(404, `Question with id ${id} not found`));
            }
        })
        .catch(error => {
            if (error instanceof mongoose.Error.CastError) {
                next(createError(404, `Question with id ${id} not found`));
            } else {
                next(error);
            }
        });
}