
const mongoose = require('mongoose');
const Question = require('../models/question.model');
const Resource = require('../models/resource.model');
const User = require('../models/user.model');

module.exports.list = (req, res, next) => {
    const url = req.originalUrl;
    const currentPage = Number(req.query.page) || 0;
    const limitValue = 3;
    const skipValue = currentPage*limitValue;
    console.log('PAGINA PRINCIPAL --> ', url)
    const questionPromise = Question.find().skip(skipValue).limit(limitValue);
    const resourcePromise =  Resource.find().skip(skipValue).limit(limitValue);
    Promise.all([questionPromise, resourcePromise])
        .then(([questions, resources]) => {
            res.render('posts/list', {
                questions: questions.reverse(),
                resources: resources.reverse(),
                nextPage: currentPage + 1,
                prevPage: !currentPage ? 0 : currentPage - 1,
                url: url
            })
        })
        .catch(error => next(error))
}

//next two functions repeated for rating, fix!


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