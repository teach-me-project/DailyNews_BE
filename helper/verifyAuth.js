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
				message: 'KAMU HARUS LOGIN SEBELUM MELAKUKAN ACTION INI',
			});
		}
	},
	VerifyUser: (req, res, next) => {
		if (req.headers.token) {
			const token = req.headers.token;
			const { profile_id } = req.query;
			jwt.verify(token, process.env.JWT_SECRET_KEY, function (err, decoded) {
				if (err) {
					return res.status(404).send({
						message: 'INVALID TOKEN',
					});
				} else if (decoded.user_id != profile_id) {
					console.log(decoded.user_id, profile_id);
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
			const { post_id } = req.query;
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
										message: 'DATA TIDAK DITEMUKAN',
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
	VerifyDeleteComment: (req, res, next) => {
		if (req.headers.token) {
			const token = req.headers.token;
			const { comment_id } = req.query;
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
							`SELECT profile_id from post_comment where comment_id = '${comment_id}'`,
							(err, result) => {
								if (err) {
									return res.status(404).send({
										message: 'GAGAL MENGIDENTIFIKASI POST ID & PROFILE_ID',
									});
								} else if (!result.length) {
									return res.status(404).send({
										message: 'DATA TIDAK DITEMUKAN',
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
	VerifyAdminRole: (req, res, next) => {
		if (req.headers.token) {
			const token = req.headers.token;
			jwt.verify(token, process.env.JWT_SECRET_KEY, function (err, decoded) {
				if (err) {
					return res.status(404).send({
						message: 'INVALID TOKEN',
					});
				} else if (decoded.role == process.env.ROLE_ADMIN) {
					next();
				} else {
					return res.status(404).send({
						message: 'HANYA ADMIN YANG BISA MENYETUJUI/MENOLAK ARTIKEL !!',
					});
				}
			});
		} else {
			return res.status(404).send({
				message: 'KAMU HARUS LOGIN TERLEBIH DAHULU !!',
			});
		}
	},
};
module.exports = Auth;
