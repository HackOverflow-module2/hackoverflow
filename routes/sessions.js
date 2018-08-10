var express = require('express');
var router = express.Router();
var sessionsController = require('../controllers/sessions.controller')
const passport = require('passport');

router.get('/create', sessionsController.create);
router.post(`/create`, sessionsController.doCreate);

router.get('/delete', sessionsController.delete);

router.post('/github', passport.authenticate('github-auth', { scope: ['openid', 'profile', 'email'] }));
router.get('/github/cb', sessionsController.createWithIDPCallback);

module.exports = router;

