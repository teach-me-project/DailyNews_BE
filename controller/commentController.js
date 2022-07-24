/** @format */

const comment = require('../model/comment');

module.exports = {
	getCommentPost: async (req, res) => {
		//add New post From Body
		try {
			const result = await comment.getCommentPost(req, res);
			res.status(200).send(result);
		} catch (error) {
			res.status(400).send(error);
		}
	},
	addCommentPost: async (req, res) => {
		//add New post From Body
		try {
			const result = await comment.addCommentPost(req, res);
			res.status(200).send(result);
		} catch (error) {
			res.status(400).send(error);
		}
	},
	deleteCommentPost: async (req, res) => {
		//add New post From Body
		try {
			const result = await comment.deleteCommentPost(req, res);
			res.status(200).send(result);
		} catch (error) {
			res.status(400).send(error);
		}
	},
};
