var express = require('express');
var router = express.Router();
var questionsController = require('../controllers/questions.controller');
var authMiddleware = require('../middlewares/auth.middleware');

router.get('/create', authMiddleware.isAuthenticated, questionsController.create);
router.post('/create',authMiddleware.isAuthenticated, questionsController.doCreate);

module.exports = router;
