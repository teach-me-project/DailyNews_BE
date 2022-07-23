/** @format */

const db = require('../helper/db_connections');
module.exports = {
	addCommentPost: (req, res) => {
		return new Promise((resolve, reject) => {
			const { comment_message, account_id } = req.body;
			const { post_id, profile_id } = req.query;
			if (account_id != profile_id) {
				reject({
					message:
						'Data Profile_Id di Body Harus Sama dengan data Account_id di Params',
					status: 400,
				});
			} else {
				db.query(
					`Select post_id from post where post_id = '${post_id}' `,
					(errsearchpost, result) => {
						if (errsearchpost) {
							reject({
								message: 'Error Di DB Query',
							});
						} else if (!result.length) {
							reject({
								message: `Post Dengan ID = ${post_id} Tidak Ditemukan `,
							});
						} else {
							db.query(
								`INSERT into post_comment (post_id,profile_id,comment_message) 
							Values ("${post_id}","${profile_id}","${comment_message}")`,
								(errdeletecomment, resultcomment) => {
									if (errdeletecomment || !resultcomment) {
										reject({
											message: ' Gagal Menambahkan Komentar',
										});
									} else {
										db.query(
											`Select comment_count from post_like where post_id = '${post_id}'`,
											(errsearchpost, resultsearchpost) => {
												if (errsearchpost || !resultsearchpost.length) {
													reject({
														message: ' Gagal Ketika Mencari Postingan',
													});
												} else {
													const JumlahKomentarTerakhir =
														resultsearchpost[0].comment_count;
													db.query(
														`UPDATE post_like SET comment_count='${
															JumlahKomentarTerakhir + 1
														}' where post_id = '${post_id}'`,
														(erraddcommentcount, resultaddcommentcount) => {
															if (
																erraddcommentcount ||
																!resultaddcommentcount
															) {
																reject({
																	message:
																		' Gagal Ketika Menambahkan Jumlah Data Komentar',
																});
															} else {
																resolve({
																	message: 'Berhasil Menambahkan Komentar !',
																	PostID: post_id,
																	Komentar: comment_message,
																	JumlahKomentar: JumlahKomentarTerakhir + 1,
																	resultcomment,
																});
															}
														}
													);
												}
											}
										);
									}
								}
							);
						}
					}
				);
			}
		});
	},
	deleteCommentPost: (req, res) => {
		return new Promise((resolve, reject) => {
			const { post_id, comment_id } = req.query;

			db.query(
				`Select post_id from post where post_id = '${post_id}' `,
				(errsearchpost, result) => {
					if (errsearchpost) {
						reject({
							message: 'Error Di DB Query',
						});
					} else if (!result.length) {
						reject({
							message: `Post Dengan ID = ${post_id} Tidak Ditemukan `,
						});
					} else {
						db.query(
							`Select comment_id from post_comment where comment_id = '${comment_id}' `,
							(errsearchComment, resultsearchcomment) => {
								if (errsearchComment) {
									reject({
										message: 'Error Di DB Query Search Comment',
									});
								} else if (!resultsearchcomment.length) {
									reject({
										message: `Komentar Dengan Komentar ID = ${comment_id} Tidak Ditemukan `,
									});
								} else {
									db.query(
										`delete from post_comment where comment_id = '${comment_id}'`,
										(errdeletecomment, resultdeletecomment) => {
											if (errdeletecomment || !resultdeletecomment) {
												reject({
													message: ' Gagal Menghapus Komentar',
												});
											} else {
												db.query(
													`Select comment_count from post_like where post_id = '${post_id}'`,
													(errsearchpost, resultsearchpost) => {
														if (errsearchpost || !resultsearchpost.length) {
															reject({
																message: ' Gagal Ketika Mencari Postingan',
															});
														} else {
															const JumlahKomentarTerakhir =
																resultsearchpost[0].comment_count;
															db.query(
																`UPDATE post_like SET comment_count='${
																	JumlahKomentarTerakhir - 1
																}' where post_id = '${post_id}'`,
																(erraddcommentcount, resultaddcommentcount) => {
																	if (
																		erraddcommentcount ||
																		!resultaddcommentcount
																	) {
																		reject({
																			message:
																				' Gagal Ketika Menambahkan Jumlah Data Komentar',
																		});
																	} else {
																		resolve({
																			message: 'Berhasil Menghapus !',
																			PostID: post_id,
																			JumlahKomentar:
																				JumlahKomentarTerakhir - 1,
																			resultdeletecomment,
																		});
																	}
																}
															);
														}
													}
												);
											}
										}
									);
								}
							}
						);
					}
				}
			);
		});
	},
};
