const express = require('express');
const usersController = require('../controller/usersController')
const router = express.Router();
const upload = require('../helper/multer');
const verifyAuth = require('../helper/verifyAuth');


router.get('/', usersController.getUsers);
router.get('/:id', usersController.getById);
router.patch('/:id',upload.single('profile_picture'), usersController.update);
router.patch('/change-password/:id', usersController.changePassword)
router.delete('/:id',usersController.deleteUsers);








module.exports = router;