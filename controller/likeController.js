/** @format */

const like = require('../model/like');

module.exports = {
	addLikeUnlikePost: async (req, res) => {
		//add New post From Body
		try {
			const result = await like.addLikeUnlikePost(req, res);
			res.status(200).send(result);
		} catch (error) {
			res.status(400).send(error);
		}
	},
};
