const express = require('express');
const router = express.Router();
const questionsController = require('../controllers/questions.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.get('/create', authMiddleware.isAuthenticated, questionsController.create);
router.post('/create',authMiddleware.isAuthenticated, questionsController.doCreate);


router.get('/:id', authMiddleware.isAuthenticated, questionsController.detail);


module.exports = router;
