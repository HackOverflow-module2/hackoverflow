const express = require('express');
const router = express.Router();
const questionsController = require('../controllers/questions.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const constants = require('../constants');
const Question = require('../models/question.model');


router.get('/create', authMiddleware.isAuthenticated, questionsController.create);
router.post('/create',authMiddleware.isAuthenticated, questionsController.doCreate);

router.get('/:id', authMiddleware.isAuthenticated, questionsController.detail);

router.get(
    '/:id/delete', 
    authMiddleware.checkPostOwner(constants.ROLE_ADMIN, Question),
    questionsController.delete
);

router.post('/:id/rating/update', questionsController.doUpdate);

module.exports = router;
