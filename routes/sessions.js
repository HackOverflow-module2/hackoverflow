var express = require('express');
var router = express.Router();
var sessionsController = require('../controllers/sessions.controller')

router.get('/create', sessionsController.create);
router.post('/create', sessionsController.doCreate);

router.get('/delete', sessionsController.delete);

module.exports = router;
