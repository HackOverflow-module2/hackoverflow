const express = require('express');
const router = express.Router();
const resourcesController = require('../controllers/resources.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.get('/create', authMiddleware.isAuthenticated, resourcesController.create);
router.post('/create',authMiddleware.isAuthenticated, resourcesController.doCreate);

router.get('/:id', authMiddleware.isAuthenticated, resourcesController.detail);

router.get('/:id/delete', authMiddleware.isAuthenticated, resourcesController.delete);

module.exports = router;
