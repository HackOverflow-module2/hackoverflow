const express = require('express');
const router = express.Router();
const tagsController = require('../controllers/tags.controller');

router.get('/', tagsController.list);
router.get('/:id', tagsController.detail)

module.exports = router;