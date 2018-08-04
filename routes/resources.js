const express = require('express');
const router = express.Router();
const resourcesController = require('../controllers/resources.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const constants = require('../constants');
const Resource = require('../models/resource.model');


router.get('/create', authMiddleware.isAuthenticated, resourcesController.create);
router.post('/create',authMiddleware.isAuthenticated, resourcesController.doCreate);

router.get('/:id', authMiddleware.isAuthenticated, resourcesController.detail);

router.get(
    '/:id/delete', 
    authMiddleware.checkPostOwner(constants.ROLE_ADMIN, Resource),
    resourcesController.delete
);

module.exports = router;
