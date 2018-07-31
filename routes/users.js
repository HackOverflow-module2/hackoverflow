var express = require('express');
var router = express.Router();
var usersController = require('../controllers/users.controller')

router.get('/signup', usersController.create);
router.post('/signup', usersController.doCreate);

router.get('/', usersController.detail)

module.exports = router;
