/** @format */

const db = require('../helper/db_connections');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { deletecover, updatecover } = require('../helper/updatefiles');
const FileValidation = require('../helper/filevalidation');
const { error, success } = require('../helper/message');

module.exports = {
	addNewPost: (req, res) => {
		return new Promise((resolve, reject) => {
			const {
				profile_id,
				post_cover,
				post_title,
				post_category,
				post_fill,
				post_link,
			} = req.body;

			if (req.file) {
				if (FileValidation(req.file.filename) != 1) {
					reject({
						message:
							'Format File Tidak Didukung ! , Format Yang Di Izinkan : Jpg,Png,Jpeg,Webp',
						status: 400,
					});
				} else {
					db.query(
						`INSERT into post (profile_id,post_cover,post_title,post_category,post_fill,post_link) 
				   Values ("${profile_id}","${req.file.filename}","${post_title}","${post_category}","${post_fill}","${post_link}")`,
						(err, result) => {
							const lastid = result.insertId;

							if (err) {
								console.log(err);
								reject({
									message: 'Data Artikel Tidak Berhasil Di Inputt',
									status: 400,
								});
							} else {
								db.query(
									`insert into post_like (post_id) values("${lastid}")`,
									(err2, result2) => {
										if (err2) {
											console.log(err2, 'ini errornya');
										} else {
											console.log(result2, 'ini resultnya');
										}
									}
								);

								resolve({
									message:
										'Artikel Berhasil Ditambahkan , Silahkan Menunggu Proses Persetujuan Admin',
									status: 200,
									result,
								});
							}
						}
					);
				}
			} else {
				res.status(400).send({
					message: 'Cover Artikel Tidak Boleh Kosong',
				});
			}
		});
	},
	getAllAcceptedPost: (req, res) => {
		//get All Movies With Join
		return new Promise((resolve, reject) => {
			const { limit, page, order_by, sort } = req.query;
			let offset = page * limit - limit;
			db.query(
				`SELECT * from post where post_status = 'accepted' ORDER BY ${order_by} ${sort} limit ${limit} OFFSET ${offset} `,
				(error, result) => {
					db.query(
						`SELECT * from post where post_status = 'accepted'`,
						(error2, result2) => {
							let totalpage = Math.ceil(result2.length / limit);
							if (error || error2) {
								console.log(error, 'ini error 1', error2, 'ini error 2');
								reject({
									message: 'Failed To Get All Accepted Post',
									status: 400,
								});
							} else {
								resolve({
									message: 'Get All Accepted Post Success',
									status: 200,
									totalpage: totalpage,
									totalRow: result.length,
									totaldata: result2.length,
									list: result,
								});
							}
						}
					);
				}
			);
		});
	},
	getAllWaitingPost: (req, res) => {
		//get All Movies With Join
		return new Promise((resolve, reject) => {
			const { limit, page, order_by, sort } = req.query;
			let offset = page * limit - limit;
			db.query(
				`SELECT * from post where post_status = 'waiting' ORDER BY ${order_by} ${sort} limit ${limit} OFFSET ${offset} `,
				(error, result) => {
					db.query(
						`SELECT * from post where post_status = 'accepted'`,
						(error2, result2) => {
							let totalpage = Math.ceil(result2.length / limit);
							if (error || error2) {
								console.log(error, 'ini error 1', error2, 'ini error 2');
								reject({
									message: 'Failed To Get All Accepted Post',
									status: 400,
								});
							} else {
								resolve({
									message: 'Get All Accepted Post Success',
									status: 200,
									totalpage: totalpage,
									totalRow: result.length,
									totaldata: result2.length,
									list: result,
								});
							}
						}
					);
				}
			);
		});
	},
	UpdatePost: (req, res) => {
		return new Promise((resolve, reject) => {
			const { post_cover, post_title, post_category, post_fill, post_link } =
				req.body;
			const { post_id } = req.query;
			if (req.file) {
				if (FileValidation(req.file.filename) != 1) {
					reject({
						message:
							'Format File Tidak Didukung ! , Format Yang Di Izinkan : Jpg,Png,Jpeg,Webp',
						status: 400,
					});
				} else {
					if (updatecover(post_id) == 0) {
						reject({
							message: 'POST ID TIDAK DITEMUKAN',
						});
					} else {
						console.log(req.file.filename, 'ini filename nya');
						db.query(
							`UPDATE post SET post_cover='${req.file.filename}', post_title='${post_title}',post_category = '${post_category}',post_fill='${post_fill}'
					   where post_id = '${post_id}'`,
							(err, result) => {
								if (err) {
									reject({
										message: 'Data Artikel Tidak Berhasil Di Update',
										status: 400,
									});
								} else {
									resolve({
										message: 'Artikel Berhasil Di Update',
										status: 200,
										result,
									});
								}
							}
						);
					}
				}
			} else {
				res.status(400).send({
					message: 'Cover Artikel Tidak Boleh Kosong',
				});
			}
		});
	},
	UpdatePostStatus: (req, res) => {
		return new Promise((resolve, reject) => {
			const { post_status } = req.query;
			const { post_id } = req.query;
			db.query(
				`Select * from post where post_id = '${post_id}'`,
				(err, result) => {
					if (err) {
						reject({
							message: 'Terdapat Kesalahan pada Database',
							status: 400,
						});
					} else if (!result.length) {
						reject({
							message: `Artikel Dengan ID ${post_id} Tidak Ditemukan`,
							status: 400,
						});
					} else {
						db.query(
							`UPDATE post SET post_status='${post_status}' where post_id = '${post_id}'`,
							(err, result) => {
								if (err) {
									reject({
										message: 'Gagal Mengubah Status Artikel',
										status: 400,
									});
								} else if (result && post_status.toLowerCase() == 'declined') {
									resolve({
										message: 'Artikel Telah DiTolak Untuk Di Publikasikan !! ',
										status: 200,
										result,
									});
								} else {
									resolve({
										message:
											'Artikel Telah Di Setujui untuk di publikasikan !! ',
										status: 200,
										result,
									});
								}
							}
						);
					}
				}
			);
		});
	},
	UpdateAllPostStatus: (req, res) => {
		return new Promise((resolve, reject) => {
			const { post_status } = req.query;
			if (
				post_status.toLowerCase() == 'accepted' ||
				post_status.toLowerCase() == 'declined'
			) {
				db.query(
					`Select * from post where post_status = 'waiting'`,
					(err, result) => {
						if (err) {
							reject({
								message: 'Terdapat Kesalahan pada Database',
								status: 400,
							});
						} else if (!result.length) {
							reject({
								message: `Tidak Ada Postingan yang menuunggu untuk diverifikasi !!`,
								status: 400,
							});
						} else {
							db.query(
								`UPDATE post SET post_status='${post_status}' where post_status = 'waiting' `,
								(err, result) => {
									if (err) {
										reject({
											message: 'Gagal Mengubah Status waiting Artikel',
											status: 400,
										});
									} else if (
										result &&
										post_status.toLowerCase() == 'declined'
									) {
										resolve({
											message: `Status Semua Artikel waiting dirubah menjadi ${post_status} `,
											status: 200,
											result,
										});
									} else if (
										result &&
										post_status.toLowerCase() == 'accepted'
									) {
										resolve({
											message: `Status Semua Artikel waiting dirubah menjadi ${post_status} `,
											status: 200,
											result,
										});
									}
								}
							);
						}
					}
				);
			} else {
				reject({
					message: `Pilihan Status Tidak Valid`,
					status: 400,
				});
			}
		});
	},
	DeletePost: (req, res) => {
		return new Promise((resolve, reject) => {
			const { post_id } = req.query;
			db.query(
				`select * from post where post_id = ${post_id}`,
				(err, result) => {
					if (!result.length || err) {
						reject({
							message: `Postingan dengan  ID Postingan = ${post_id} Tidak Ditemukan `,
						});
					} else {
						deletecover(`./upload/${result[0].post_cover}`);
						db.query(
							`delete from post where post_id = "${post_id}" `,
							(err, result) => {
								if (err) {
									reject({
										message: `Gagal Menghapus Postingan , ${err} `,
									});
								} else {
									resolve({
										message: `Postingan dengan  ID Postingan = ${post_id} Berhasil Dihapus`,
										status: 200,
										result,
									});
								}
							}
						);
					}
				}
			);
		});
	},
};
