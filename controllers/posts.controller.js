
const mongoose = require('mongoose');
const Question = require('../models/question.model');
const Resource = require('../models/resource.model');
const User = require('../models/user.model');

module.exports.list = (req, res, next) => {
    const questionPromise = Question.find()
    const resourcePromise =  Resource.find()
    Promise.all([questionPromise, resourcePromise])
        .then(([questions, resources]) => {
            res.render('posts/list', {
                questions: questions.reverse(),
                resources: resources.reverse()
            })
        })
        .catch(error => next(error))
}

module.exports.doUpdate = (req, res, next) => {
    const id = req.params.id;

    Question.findByIdAndUpdate(id, { $inc: {rating: 1} })
        .then(question => {
            if(question) {
                res.redirect(`/`)
            } else {
                next(createError(404, 'user not found'));
            }
        })
        .catch(error => next(error))
}
