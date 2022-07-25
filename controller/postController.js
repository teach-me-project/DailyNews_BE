/** @format */

const Post = require('../model/post');

module.exports = {
	getallacceptedpost: async (req, res) => {
		//add New post From Body
		try {
			const result = await Post.getAllAcceptedPost(req, res);
			res.status(200).send(result);
		} catch (error) {
			res.status(400).send(error);
		}
	},
	getpostbyid: async (req, res) => {
		//add New post From Body
		try {
			const result = await Post.getPostByID(req, res);
			res.status(200).send(result);
		} catch (error) {
			res.status(400).send(error);
		}
	},
	getallWaitingpost: async (req, res) => {
		//add New post From Body
		try {
			const result = await Post.getAllWaitingPost(req, res);
			res.status(200).send(result);
		} catch (error) {
			res.status(400).send(error);
		}
	},
	addNewpost: async (req, res) => {
		//add New post From Body
		try {
			const result = await Post.addNewPost(req, res);
			res.status(200).send(result);
		} catch (error) {
			res.status(400).send(error);
		}
	},
	updatepost: async (req, res) => {
		//add New post From Body
		try {
			const result = await Post.UpdatePost(req, res);
			res.status(200).send(result);
		} catch (error) {
			res.status(400).send(error);
		}
	},
	updatepoststatus: async (req, res) => {
		//add New post From Body
		try {
			const result = await Post.UpdatePostStatus(req, res);
			res.status(200).send(result);
		} catch (error) {
			res.status(400).send(error);
		}
	},
	updateallpoststatus: async (req, res) => {
		//add New post From Body
		try {
			const result = await Post.UpdateAllPostStatus(req, res);
			res.status(200).send(result);
		} catch (error) {
			res.status(400).send(error);
		}
	},
	deletepost: async (req, res) => {
		//add New post From Body
		try {
			const result = await Post.DeletePost(req, res);
			res.status(200).send(result);
		} catch (error) {
			res.status(400).send(error);
		}
	},
};
