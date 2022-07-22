/** @format */

const express = require('express');
const postController = require('../controller/postController');
const router = express.Router();
const upload = require('../helper/multer');
const verifyAuth = require('../helper/verifyAuth');

router.post(
	'/',
	verifyAuth.VerifyToken,
	upload.single('post_cover'),
	postController.addNewpost
);
router.patch(
	'/',
	verifyAuth.VerifyUpdatePost,
	upload.single('post_cover'),
	postController.updatepost
);

module.exports = router;
