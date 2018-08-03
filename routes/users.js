const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const multer  = require('multer')
const upload = multer({ dest: 'public/images/profile-photos' })


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
    authMiddleware.isOwner,
    usersController.edit
)

router.post(
    '/:id/edit',
    authMiddleware.isAuthenticated,
    authMiddleware.isOwner,
    upload.single('photo'),
    usersController.doEdit
)


module.exports = router;
