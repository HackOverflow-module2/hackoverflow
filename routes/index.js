const express = require('express');
const router = express.Router();
const postsController = require('../controllers/posts.controller');


router.get('/', postsController.list);
router.get('/order-by-rating', postsController.listByRating);

router.post('/search', postsController.filter);

module.exports = router;
