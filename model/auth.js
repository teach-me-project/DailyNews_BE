const db = require('../helper/db_connections');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { error, success } = require('../helper/message');

module.exports = {
	login: (req, res) => {
		return new Promise((resolve, reject) => {
			const { email, password } = req.body;
			db.query(
				`SELECT id, password, role FROM users  WHERE email='${email.toLowerCase()}'`,
				(err, results) => {
					console.log(results);
					if (err) {
						reject({
							message: 'ada error',
						});
					} else {
						if (!results.length) {
							reject({
								message: 'Email/Password Salah',
							});
						} else {
							bcrypt.compare(
								password,
								results[0].password,
								function (err, result) {
									if (err) {
										reject({
											message: 'Ada Masalah Saat Login, Harap coba lagi.',
										});
									}
									console.log(result);
									if (result) {
										const token = jwt.sign(
											{ user_id: results[0].id, role: results[0].role },
											process.env.JWT_SECRET_KEY,
											{
												expiresIn: '300s',
											}
										);
										console.log(process.env.JWT_SECRET_KEY);
										resolve({
											message: 'login Success',
											status: 200,
											data: {
												token,
												user_id: results[0].id,
												role: results[0].role,
											},
										});
									} else {
										reject({
											message: 'email/password salah. ',
										});
									}
								}
							);
						}
					}
				}
			);
		});
	},

	register: (req, res) => {
		return new Promise((resolve, reject) => {
			const { email, password } = req.body;
			const sqlcheckemail = `SELECT account_email from account where account_email = '${email.toLowerCase()}'`;
			db.query(sqlcheckemail, (err, result) => {
				//Check Registered Email
				if (err) {
					reject({
						message: `Error In Your DB Query When Checking Email`,
					});
				} else if (result.length) {
					reject({
						message: `Email Already Registered , Use Another One `,
					});
				} else {
					//Hashing Password
					bcrypt.hash(password, 10, function (err, hashedPassword) {
						if (err) {
							reject({
								message: `Error When Hashing Password`,
							});
						} else {
							//INSERT DATA TO ACCOUNT TABLE
							const sqlinsertdata = `INSERT INTO account(account_email,account_password) VALUES ('${email.toLowerCase()}','${hashedPassword}')`;
							db.query(sqlinsertdata, (errinsertdata, result2) => {
								if (errinsertdata) {
									reject({
										message: `Error In Your DB Query When Inserted the Data`,
									});
								} else {
									//INSERT DATA TO PROFILES TABLE
									const lastid = result2.insertId;
									db.query(
										`insert into profiles (account_id) values("${lastid}")`,
										(errinsertdata2, result3) => {
											if (errinsertdata2) {
												db.query(
													`DELETE FROM account WHERE account_id = '${lastid}'`
												);
												reject({
													message: 'Error When Insert Data To Profiles Table',
												});
											} else {
												resolve({
													message: 'Add New Account Success',
													status: 200,
													dataAccount: result2,
													dataProfiles: result3,
												});
											}
										}
									);
								}
							});
						}
					});
				}
			});
		});
	},
};
