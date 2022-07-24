const Users = require('../model/users');

module.exports = {
	getUsers: async (req, res) => {
		try {
			const result = await Users.getUser(req, res);
			res.status(200).send(result);
		} catch (error) {
			res.status(400).send(error);
		}
	},
	update: async (req, res) => {
		try {
			if(req.file){
				reqModifer = {
			   ...req, 
			   body:{...req.body, profile_picture: req.file.filename}
		   }
		   }else{
				reqModifer = {
				   ...req,
				   body:{ ...req.body}
			   }
		   }
			const result = await Users.update(reqModifer, res);
			res.status(200).send(result);
		} catch (error) {
			res.status(400).send(error);
		}
	},
	deleteUsers: async (req, res) => {
		try {
			const result = await Users.remove(req, res);
			res.status(200).send(result);
		} catch (error) {
			res.status(400).send(error);
		}
	},
	getById: async (req, res) => {
		try {
			const result = await Users.getById(req, res);
			res.status(200).send(result);
		} catch (error) {
			res.status(400).send(error);
		}
	},
	changePassword: async (req,res) =>{
		try {
			const result = await Users.changePassword(req, res);
			res.status(200).send(result);
		} catch (error) {
			res.status(400).send(error);
		}
	}
}