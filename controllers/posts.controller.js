
const mongoose = require('mongoose');
const Question = require('../models/question.model');
const Resource = require('../models/resource.model');
const User = require('../models/user.model');

module.exports.list = (req, res, next) => {
    const questionPromise = Question.find().limit(2)
    const resourcePromise =  Resource.find().limit(2)
    Promise.all([questionPromise, resourcePromise])
        .then(([questions, resources]) => {
            res.render('posts/list', {
                questions: questions.reverse(),
                resources: resources.reverse()
            })
        })
        .catch(error => next(error))
}

//next two functions repeated for rating, fix!
module.exports.doUpdate = (req, res, next) => {
    const id = req.params.id;

    Question.findByIdAndUpdate(id, { $inc: {rating: 1} })
        .then(result => {
            if(result) {
                res.redirect(`/`)
            } else {
                next(createError(404, 'user not found'));
            }
        })
        .catch(error => next(error))
}

module.exports.doUpdateResource = (req, res, next) => {
    const id = req.params.id;

    Resource.findByIdAndUpdate(id, { $inc: {rating: 1} })
        .then(result => {
            if(result) {
                res.redirect(`/`)
            } else {
                next(createError(404, 'user not found'));
            }
        })
        .catch(error => next(error))
}


module.exports.filter = (req, res, next) => {
    const search = req.body.search;
    // const questionPromise = Question.find( {title: search } )
    // const resourcePromise =  Resource.find( {title: search } )
    const questionPromise = Question.find( {title: { $regex: search } } )
    const resourcePromise =  Resource.find( {title: { $regex: search } } )
    Promise.all([questionPromise, resourcePromise])
    .then(([questions, resources]) => {
        res.render('posts/list', {
            questions: questions.reverse(),
            resources: resources.reverse()
        })
    })
    .catch(error => next(error))
}