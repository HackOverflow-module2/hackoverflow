
const mongoose = require('mongoose');
const Tag = require('../models/tag.model');
const Question = require('../models/question.model');
const Resource = require('../models/resource.model');
const createError = require('http-errors');

module.exports.list = (req, res, next) => {
    Tag.find()
        .then(tags => {
            res.render('tags/list', {
                tags
            })
        })
        .catch(error => next(error))
}

module.exports.detail = (req, res, next) => {
    id = req.params.id;
    Tag.findById(id)
        .then(tag => {
            if (tag) {
                const questionPromise = Question.find({ 'tags': { $in: [ tag.name ]}})
                const resourcePromise =  Resource.find({ 'tags': { $in: [ tag.name ]}})
                return Promise.all([questionPromise, resourcePromise])
                    .then(([questions, resources]) => {
                        res.render('tags/detail', {
                            tag,
                            questions,
                            resources
                        })
                    })
            } else {
                next(createError(404, 'tag not found'));
            }
        })
        .catch(error => {
            if (error instanceof mongoose.Error.CastError) {
                next(createError(404, `Tag with id ${id} not found`));
              } else {
                next(error);
              }
        });
}