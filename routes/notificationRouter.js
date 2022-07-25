/** @format */

const express = require('express');
const notificationController = require('../controller/notificationController');
const router = express.Router();
const verifyAuth = require('../helper/verifyAuth');

router.get('/', verifyAuth.VerifyUser, notificationController.getnotification);
router.delete(
	'/',
	verifyAuth.VerifyUser,
	notificationController.deletenotification
);
router.delete(
	'/all',
	verifyAuth.VerifyUser,
	notificationController.deleteAllnotification
);

module.exports = router;
