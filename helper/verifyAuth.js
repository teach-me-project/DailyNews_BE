/** @format */
const jwt = require('jsonwebtoken');
const Auth = {
	VerifyToken: (req, res, next) => {
		if (req.headers.token) {
			console.log(req.body, 'ini body nya');
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
			console.log(req.body);
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
};
module.exports = Auth;
