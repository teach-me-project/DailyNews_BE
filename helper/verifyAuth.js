/** @format */
const db = require('./db_connections');
const jwt = require('jsonwebtoken');
const Auth = {
	VerifyToken: (req, res, next) => {
		if (req.headers.token) {
			const token = req.headers.token;
			jwt.verify(token, process.env.JWT_SECRET_KEY, function (err, decoded) {
				if (err) {
					return res.status(404).send({
						message: 'INVALID TOKEN',
					});
				} else if (
					decoded.role == process.env.ROLE_ADMIN ||
					decoded.role == process.env.ROLE_USER
				) {
					next();
				} else {
					return res.status(404).send({
						message: 'ROLE TIDAK TERIDENTIFIKASI , KAMU SIAPA !',
					});
				}
			});
		} else {
			return res.status(404).send({
				message: 'KAMU HARUS LOGIN SEBELUM POST ARTIKEL',
			});
		}
	},

	VerifyUser: (req, res, next) => {
		if (req.headers.token) {
			const token = req.headers.token;
			jwt.verify(token, process.env.JWT_SECRET_KEY, function (err, decoded) {
				if (err) {
					return res.status(404).send({
						message: 'INVALID TOKEN',
					});
				} else if (decoded.id != req.headers.id) {
					return res.status(404).send({
						message: 'INI BUKAN AKUN KAMU !!',
					});
				} else {
					next();
				}
			});
		} else {
			return res.status(404).send({
				message: 'KAMU HARUS LOGIN DULU !!',
			});
		}
	},
	VerifyUpdatePost: (req, res, next) => {
		if (req.headers.token) {
			const token = req.headers.token;
			const post_id = req.headers.post_id;
			jwt.verify(
				token,
				process.env.JWT_SECRET_KEY,
				function (errVerify, decoded) {
					if (errVerify) {
						return res.status(404).send({
							message: 'INVALID TOKEN',
						});
					} else {
						db.query(
							`SELECT profile_id from post where post_id = '${post_id}'`,
							(err, result) => {
								if (err) {
									return res.status(404).send({
										message: 'GAGAL MENGIDENTIFIKASI POST ID & PROFILE_ID',
									});
								} else if (!result.length) {
									return res.status(404).send({
										message:
											'PROFILE ID YANG TERKONEKSI DENGAN POST ID TERSEBUT TIDAK DITEMUKAN',
									});
								} else {
									const profile_id = result[0].profile_id;
									if (
										profile_id == decoded.user_id ||
										decoded.role == process.env.ROLE_ADMIN
									) {
										next();
									} else {
										return res.status(404).send({
											message:
												'KAMU TIDAK MEMILIKI AKSES UNTUK MENGEDIT ARTIKEL INI',
										});
									}
								}
							}
						);
					}
				}
			);
		} else {
			return res.status(404).send({
				message: 'KAMU HARUS LOGIN DULU !!',
			});
		}
	},
};
module.exports = Auth;
