const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const usersMiddleware = require('../middlewares/users.middleware');


router.get('/signup', usersController.create);
router.post('/signup', usersController.doCreate);

router.get(
    '/:id',  
    authMiddleware.isAuthenticated,
    usersController.detail
)

router.get(
    '/:id/edit', 
    authMiddleware.isAuthenticated,
    usersMiddleware.isOwner,
    usersController.edit
)

module.exports = router;
