const express = require('express');
const router = express.Router();
const postsController = require('../controllers/posts.controller');
//const resourcesController = require('../controllers/resources.controller');

/* GET home page. */
/* router.get('/', function(req, res, next) {
  res.redirect('/questions');
}); */

router.get('/', postsController.list);

//router.get('/', resourcesController.list);

module.exports = router;
