
const mongoose = require('mongoose');
const Tag = require('../models/tag.model');

module.exports.list = (req, res, next) => {
    Tag.find()
        .then(tags => {
            res.render('tags/list', {
                tags
            })
        })
        .catch(error => next(error))
}