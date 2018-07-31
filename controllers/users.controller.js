const createError = require('http-errors');
const mongoose = require('mongoose');
const User = require('../models/user.model');

module.exports.create = (req, res, next) => {
  res.render('users/signup');
}

module.exports.doCreate = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then(user => {
      if (user) {
        res.render('users/signup', {
          user: req.body,
          errors: { email: 'Email already registered' }
        });
      } else {
        user = new User (req.body);
        return user.save()
          .then(user => {
            res.redirect('/sessions/create');
          });
      }
    })
    .catch(error => {
      if (error instanceof mongoose.Error.ValidationError) {
        res.render('users/signup', {
          user: req.body,
          errors: error.errors
        });
      } else {
        next(error);
      }
    })
}

module.exports.detail = (req, res, next) => {
  const user = req.user._id
  User.findById(user)
    .then()
    .catch()
}