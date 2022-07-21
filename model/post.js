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
							console.log(lastid, 'INI RESULTNYA');
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
		//add New Movies From Body
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
							console.log(lastid, 'INI RESULTNYA');
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
									console.log(err);
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
};
