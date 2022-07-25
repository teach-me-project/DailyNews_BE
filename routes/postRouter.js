/** @format */

const express = require('express');
const postController = require('../controller/postController');
const router = express.Router();
const upload = require('../helper/multer');
const { VerifyUser } = require('../helper/verifyAuth');
const verifyAuth = require('../helper/verifyAuth');

router.get('/accepted', postController.getallacceptedpost);
router.get('/waiting', postController.getallWaitingpost);
router.get('/id', postController.getpostbyid);
router.post(
	'/',
	verifyAuth.VerifyToken,
	verifyAuth.VerifyUser,
	upload.single('post_cover'),
	postController.addNewpost
);
router.patch(
	'/',
	verifyAuth.VerifyUpdatePost,
	upload.single('post_cover'),
	postController.updatepost
);
router.patch(
	'/status',
	verifyAuth.VerifyAdminRole,
	postController.updatepoststatus
);
router.patch(
	'/status/all',
	verifyAuth.VerifyAdminRole,
	postController.updateallpoststatus
);
router.delete('/', verifyAuth.VerifyUpdatePost, postController.deletepost);

module.exports = router;
