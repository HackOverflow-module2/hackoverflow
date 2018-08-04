const mongoose = require('mongoose');
const Question = require('../models/question.model');
const User = require('../models/user.model');
const Answer = require('../models/answer.model');
const Tag = require('../models/tag.model');

module.exports.create = (req, res, next) => {
    Tag.find()
        .then(tags => {
            res.render('questions/create', {
                tags
            });
        })
        .catch(error => next(error))
}

module.exports.doCreate = (req, res, next) => {

    const question = new Question({
        title: req.body.title,
        description: req.body.description,
        user: req.user._id,
        tags: req.body.tags

    });
    question.save()
        .then((question) => {
            res.redirect(`/questions/${question._id}`)
          })
        .catch(error => {
            if (error instanceof mongoose.Error.ValidationError) {
                console.error(error);
                res.render('questions/create', { 
                    question,
                    errors: error.errors
                });
            } else {
                next(error);
            }
        })
}

module.exports.detail = (req, res, next) => {
    const id = req.params.id;
    const questionPromise = Question.findById(id).populate('user');
    const answersPromise = Answer.find({question: id}).populate('user');

    Promise.all([questionPromise, answersPromise])
    .then(([question, answers]) => {
        if(question) {
            res.render('questions/detail', {
                question,
                answers: answers.reverse()
            })
        } 
    })
    .catch(error => next(error))
}

module.exports.delete = (req, res, next) => {
    const id = req.params.id;
    Question.findByIdAndDelete(id)
        .then(() => {
            res.redirect('/');
        })
        .catch(error => next(error))
}

module.exports.doUpdate = (req, res, next) => {
    const id = req.params.id;

    Question.findByIdAndUpdate(id, { $inc: {rating: 1} })
        .then(question => {
            if(question) {
                res.render('questions/detail', {
                    question
                })
            } else {
                next(createError(404, 'user not found'));
            }
        })
        .catch(error => next(error))
}

module.exports.doEdit = (req, res, next) => {

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