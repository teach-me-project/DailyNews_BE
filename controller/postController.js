/** @format */

const Post = require('../model/post');

module.exports = {
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
	// getAllpost: async (req, res) => {
	// 	//get All post With Join
	// 	try {
	// 		const result = await getAllpost(req, res);
	// 		res.status(200).send(result);
	// 	} catch (error) {
	// 		res.status(400).send({ message: 'Masih Ada Error  ', error });
	// 	}
	// },
	// getAllpostById: async (req, res) => {
	// 	//get All post With Join
	// 	try {
	// 		const result = await getAllpostById(req, res);
	// 		res.status(200).send(result);
	// 	} catch (error) {
	// 		res.status(400).send({ message: 'Masih Ada Error  ', error });
	// 	}
	// },
	// updatedpostById: async (req, res) => {
	// 	//BY  Input Form Data
	// 	try {
	// 		const result = await updatedpostById(req, res);
	// 		res.status(200).send(result);
	// 	} catch (error) {
	// 		res.status(400).send(error);
	// 	}
	// },
	// deletepostById: async (req, res) => {
	// 	try {
	// 		const result = await deletepostById(req, res);
	// 		res.status(200).send(result);
	// 	} catch (error) {
	// 		res.status(400).send(error);
	// 	}
	// },
};
