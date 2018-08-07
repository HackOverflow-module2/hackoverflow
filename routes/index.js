const express = require('express');
const router = express.Router();
const postsController = require('../controllers/posts.controller');


router.get('/', postsController.list);
//router.post('/:id/resource-rating/update', postsController.doUpdateResource);


router.post('/search', postsController.filter);

module.exports = router;
