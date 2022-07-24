/** @format */

const express = require('express');
const commentController = require('../controller/commentController');
const router = express.Router();
const verifyAuth = require('../helper/verifyAuth');

router.get('/', commentController.getCommentPost);
router.post(
	'/',
	verifyAuth.VerifyToken,
	verifyAuth.VerifyUser,
	commentController.addCommentPost
);
router.delete(
	'/',
	verifyAuth.VerifyDeleteComment,
	commentController.deleteCommentPost
);

module.exports = router;
