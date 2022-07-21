const db = require('../helper/db_connections');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer')
const { error, success } = require('../helper/message');

module.exports = {
	login: (req, res) => {
		return new Promise((resolve, reject) => {
			const { email, password } = req.body;
			db.query(
				`SELECT account_id, account_password, account_role FROM account  WHERE account_email='${email.toLowerCase()}'`,
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
								results[0].account_password,
								function (err, result) {
									if (err) {
										reject({
											message: 'Ada Masalah Saat Login, Harap coba lagi.',
										});
									}
									console.log(result);
									if (result) {
										const token = jwt.sign(
											{ user_id: results[0].account_id, role: results[0].account_role },
											process.env.JWT_SECRET_KEY,
											{
												expiresIn: '1d',
											}
										);
										console.log(process.env.JWT_SECRET_KEY);
										resolve({
											message: 'login Success',
											status: 200,
											data: {
												token,
												user_id: results[0].account_id,
												role: results[0].account_role,
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

	update: (req, res) => {
		return new Promise((resolve, reject)=> {
			const {email} = req.params
			const password = req.body.password

			console.log(req.params)
			const sqlcheckemail = `SELECT * from account where account_email = '${email.toLowerCase()}'`;
			db.query(sqlcheckemail,(err, results)=> {
			  if(err) {
				res.send({message: "ada error"})
			} 

			bcrypt.hash(password,10, function(err,hashedPassword){
				console.log(hashedPassword, 'ini hasil hashed')
				console.log(results[0], 'ini data results')
				  const previousData = {
					...results[0],
					...req.body, password :hashedPassword
				  }
				  
				  const tokenEmail =  jwt.sign(
					{ user_id: results[0].id, role: results[0].role },
					process.env.JWT_SECRET_KEY,
					{
						expiresIn: '1d',
					}
				);


				const transporter = nodemailer.createTransport({
					service : 'gmail',
					auth:{
						user: 'zakiteachme12@gmail.com',
						pass: 'cxjdjyepshqahvjs'
					},
					tls:{
						rejectUnauthorized:false
					}
				})

				const mailOptions ={
				from: '"Verify your email" <zakiteachme12@gmail.com>',
				to: '12kevinsanjaya@gmail.com',
				subject: 'dailynews -verify your email',
				html: `<h2>${email}! Please Verify Mail for Update</h2>
						<h4>please verify your mail to continue...</h4>
						

						<a href="http://localhost:3289/api/v1/auth/verify-email?token=${tokenEmail}">Verify your email</a>
						`    
				}

				transporter.sendMail(mailOptions, function(err,info){
					if(err){
						console.log(err)
					}else{
						console.log('verification email is sent to your gmail account')
					}
				})

				// console.log(tokenEmail, 'ini token')
				// console.log('id', results[0].account_id)
				// console.log('role', results[0].account_role)

			} )
		

			//   console.log(previousData.cover)       
			//   const {title, id_categories, cover, release_date, director, description, casts} = previousData       
			//   let date = moment(release_date).format('YYYY-MM-DD')
			//   const sql = `UPDATE movies SET title='${title}',id_categories='${id_categories}', cover='${cover}',  release_date='${date}', director='${director}',description='${description}', casts='${casts}' WHERE id = ${id} `
			//   db.query( sql,(err, results)=> {
			// 	if(err) { 
			// 	  reject(console.log(err))
			// 	}
			// 	resolve({
			// 	  message: "update movies success",
			// 	  status: 200,
			// 	  data: results
			// 	})
			//   })
			})
		  })
	},


};
