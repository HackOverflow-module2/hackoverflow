const express = require('express');
const router = express.Router();
const answersController = require('../controllers/answers.controller');

router.post('/:id', answersController.doCreate);

module.exports = router;