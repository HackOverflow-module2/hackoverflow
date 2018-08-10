const mongoose = require('mongoose');
const Answer = require('../models/answer.model');
const Question = require('../models/question.model');
const User = require('../models/user.model');
const sentiment = require('../service/service.sentiment');

module.exports.doCreate = (req, res, next) => {
    const id = req.params.id;

    Question.findById(id)

        .then(question => {
            if(question) {
                const sentimentAnalysis = sentiment.analyzeSentiment(req.body.description)

                const answer = new Answer({
                    description: req.body.description,
                    question: id,
                    user: req.user._id,
                    sentiment: sentimentAnalysis.score
                })
               return answer.save()
                    .then(answer => {
                        res.redirect(`/questions/${id}`)
                    })
            } else {
                next(createError(404, `Question with id ${id} not found`));                
            }
        })
        .catch(error => {
            if (error instanceof mongoose.Error.CastError) {
              next(createError(404, `Question with id ${id} not found`));
            } else {
              next(error);
            }
        })
    }
