const bookmark = require('../model/bookmark');

module.exports = {
	getBookmark: async (req, res) => {
		try {
			const result = await bookmark.getBookmark(req, res);
			res.status(200).send(result);
		} catch (error) {
			res.status(400).send(error);
		}
	},
	addBookmark: async (req, res) => {
		try {
			const result = await bookmark.addBookmark(req, res);
			res.status(200).send(result);
		} catch (error) {
			res.status(400).send(error);
		}
	},
	deleteBookmark: async (req, res) => {
		try {
			const result = await bookmark.deleteBookmark(req, res);
			res.status(200).send(result);
		} catch (error) {
			res.status(400).send(error);
		}
	},
	getById: async (req, res) => {
		try {
			const result = await bookmark.getById(req, res);
			res.status(200).send(result);
		} catch (error) {
			res.status(400).send(error);
		}
	},

}