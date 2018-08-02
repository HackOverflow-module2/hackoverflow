const createError = require('http-errors');
const mongoose = require('mongoose');
const User = require('../models/user.model');
const Question = require('../models/question.model');
const Resource = require('../models/resource.model');


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
  const id = req.params.id
  const userPromise = User.findById(id);
  const questionPromise = Question.find({'user': id});
  const resourcePromise = Resource.find({'user': id});
    Promise.all([userPromise, questionPromise, resourcePromise])    
      .then(([user, questions, resources]) => {
      if (user) {
        res.render('users/detail', {
          user,
          questions,
          resources 
        })
      } else {
        next(createError(404, 'user not found'));
      }
    })
    .catch(error => next(error))
}

module.exports.edit = (req, res, next) => {
  const id = req.params.id;
  User.findById(id)
    .then(user => {
      if(user) {
        res.render('users/edit', {
          user
        })
      } else {
        next(createError(404, 'user not found'));
      }
    })
    .catch(error => next(error))
}

module.exports.doEdit = (req, res, next) => {
  console.log('Req --> ', req)
  const id = req.params.id;

  const updateSet = {
    name: req.body.name,
    surname: req.body.surname,
    nickname: req.body.nickname
  }

  if (req.file) {
    updateSet.photoPath = `/images/profile-photos/${req.file.filename}`;
  }
  
  User.findByIdAndUpdate(id, { $set: updateSet }, {runValidators: true, new: true })
    .then(user => {
      if(user){
        res.render('users/detail', {
          user
        })
      } else {
        next(createError(404, 'user not found'));
      }
    })
    .catch(error => next(error))
}