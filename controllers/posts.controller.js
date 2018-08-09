
const mongoose = require('mongoose');
const Question = require('../models/question.model');
const Resource = require('../models/resource.model');
const User = require('../models/user.model');

module.exports.list = (req, res, next) => {
    const currentPage = Number(req.query.page) || 0;
    const limitValue = 3;
    const skipValue = currentPage*limitValue;
    const questionPromise = Question.find().populate('user').sort({createdAt: -1}).skip(skipValue).limit(limitValue);
    const resourcePromise =  Resource.find().sort({createdAt: -1}).skip(skipValue).limit(limitValue);

    Promise.all([questionPromise, resourcePromise])
        .then(([questions, resources]) => {
            res.render('posts/list', {
                questions: questions,
                resources: resources,
                nextPage: currentPage + 1,
                prevPage: currentPage === 0 ? 0 : currentPage - 1,
            })
        })
        .catch(error => next(error))
}

module.exports.listByRating = (req, res, next) => {
    const currentPage = Number(req.query.page) || 0;
    const limitValue = 3;
    const skipValue = currentPage*limitValue;

    const questionPromise = Question.find().sort({rating: -1}).skip(skipValue).limit(limitValue);
    const resourcePromise =  Resource.find().sort({rating: -1}).skip(skipValue).limit(limitValue);
    Promise.all([questionPromise, resourcePromise])
        .then(([questions, resources]) => {
            res.render('posts/list', {
                questions: questions,
                resources: resources,
                nextPage: currentPage + 1,
                prevPage: currentPage === 0 ? 0 : currentPage - 1,
            })
        })
        .catch(error => next(error))
}

module.exports.filter = (req, res, next) => {
    const search = req.body.search;

    const questionPromise = Question.find( {title: { $regex: search } } )
    const resourcePromise =  Resource.find( {title: { $regex: search } } )
    Promise.all([questionPromise, resourcePromise])
    .then(([questions, resources]) => {
        if(questions.length !== 0 || resources.length !== 0) {
            res.render('posts/list', {
                questions: questions.reverse(),
                resources: resources.reverse()
            })
        } else {
            res.render('posts/resultsNotFound')
        }
    })
    .catch(error => next(error))
}