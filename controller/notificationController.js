/** @format */

const notification = require('../model/notification');

module.exports = {
	getnotification: async (req, res) => {
		//add New post From Body
		try {
			const result = await notification.getNotification(req, res);
			res.status(200).send(result);
		} catch (error) {
			res.status(400).send(error);
		}
	},
	deletenotification: async (req, res) => {
		//add New post From Body
		try {
			const result = await notification.deleteNotification(req, res);
			res.status(200).send(result);
		} catch (error) {
			res.status(400).send(error);
		}
	},
	deleteAllnotification: async (req, res) => {
		//add New post From Body
		try {
			const result = await notification.deleteAllNotification(req, res);
			res.status(200).send(result);
		} catch (error) {
			res.status(400).send(error);
		}
	},
	// 	addnotificationPost: async (req, res) => {
	// 		//add New post From Body
	// 		try {
	// 			const result = await notification.addnotificationPost(req, res);
	// 			res.status(200).send(result);
	// 		} catch (error) {
	// 			res.status(400).send(error);
	// 		}
	// 	},
	// 	deletenotificationPost: async (req, res) => {
	// 		//add New post From Body
	// 		try {
	// 			const result = await notification.deletenotificationPost(req, res);
	// 			res.status(200).send(result);
	// 		} catch (error) {
	// 			res.status(400).send(error);
	// 		}
	// 	},
};
