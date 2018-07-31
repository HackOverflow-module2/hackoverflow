const mongoose = require('mongoose');
const Resource = require('../models/resource.model');
const User = require('../models/user.model');
const Tag = require('../models/tag.model');

module.exports.create = (req, res, next) => {
    Tag.find()
    .then(tags => {
        res.render('resources/create', {
            tags
        });
    })
    .catch(error => next(error))
}

module.exports.doCreate = (req, res, next) => {

    const resource = new Resource({
        title: req.body.title,
        description: req.body.description,
        user: req.user._id,
        tags: req.body.tags
    });
    resource.save()
        .then((resource) => {
            res.redirect(`/resources/${resource._id}`)
          })
        .catch(error => {
            if (error instanceof mongoose.Error.ValidationError) {
                console.error(error);
                res.render('resources/create', { 
                    resource: resource,
                    errors: error.errors
                });
            } else {
                next(error);
            }
        })
}

module.exports.detail = (req, res, next) => {
    const id = req.params.id;

    Resource.findById(id)
        .populate('user')
        .then(resource => {
            if (resource) {
                res.render('resources/detail', {
                    resource
                });
            } else {
                next(createError(404, `Resource with id ${id} not found`));
            }
        })
        .catch(error => {
            if (error instanceof mongoose.Error.CastError) {
                next(createError(404, `Resource with id ${id} not found`));
            } else {
                next(error);
            }
        });
}
