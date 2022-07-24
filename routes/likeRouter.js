/** @format */

const express = require('express');
const likeController = require('../controller/likeController');
const router = express.Router();
const verifyAuth = require('../helper/verifyAuth');
router.post(
	'/',
	verifyAuth.VerifyToken,
	verifyAuth.VerifyUser,
	likeController.addLikeUnlikePost
);

module.exports = router;
