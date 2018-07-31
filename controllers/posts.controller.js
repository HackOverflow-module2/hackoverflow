
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
                questions,
                resources
            })
        })
        .catch(error => next(error))
}


