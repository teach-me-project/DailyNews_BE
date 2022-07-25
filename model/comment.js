/** @format */

const db = require('../helper/db_connections');
module.exports = {
	getCommentPost: (req, res) => {
		return new Promise((resolve, reject) => {
			const { post_id } = req.query;
			db.query(
				`select post_comment.post_id, post_comment.profile_id, profiles.profile_name,post_comment.comment_message from post_comment INNER JOIN profiles On post_comment.profile_id = profiles.profile_id where post_id = '${post_id}'`,
				(errcomment, resultcomment) => {
					if (errcomment) {
						reject({
							message: `Error Pada Proses Mencari Komentar`,
						});
					}
					resolve({
						message: `Get Comment On Post with ID = ${post_id}`,
						status: 200,
						Comment: resultcomment,
					});
				}
			);
		});
	},
	addCommentPost: (req, res) => {
		return new Promise((resolve, reject) => {
			const { comment_message } = req.body;
			const { post_id, profile_id } = req.query;
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
										`Select comment_count from post_statistic where post_id = '${post_id}'`,
										(errsearchpost, resultsearchpost) => {
											if (errsearchpost || !resultsearchpost.length) {
												reject({
													message: ' Gagal Ketika Mencari Postingan',
												});
											} else {
												const JumlahKomentarTerakhir =
													resultsearchpost[0].comment_count;
												db.query(
													`UPDATE post_statistic SET comment_count='${
														JumlahKomentarTerakhir + 1
													}' where post_id = '${post_id}'`,
													(erraddcommentcount, resultaddcommentcount) => {
														if (erraddcommentcount || !resultaddcommentcount) {
															reject({
																message:
																	' Gagal Ketika Menambahkan Jumlah Data Komentar',
															});
														} else {
															let target_profile_id;
															db.query(
																`Select profile_id from post where post_id = ${post_id} `,
																(
																	errsearchpostprofileid,
																	resultsearchpostprofileid
																) => {
																	target_profile_id =
																		resultsearchpostprofileid[0].profile_id;

																	db.query(
																		`INSERT into notification (target_profile_id,from_profile_id,notification_message) 
																		Values ("${target_profile_id}","${profile_id}",'Commented On Your Post')`,
																		(erraddnotif, resultnotif) => {
																			if (erraddnotif) {
																				reject({
																					message:
																						' Gagal Ketika Menambahkan Notifikasi',
																				});
																			} else if (resultnotif) {
																				resolve({
																					message:
																						'Berhasil Menambahkan Komentar !',
																					PostID: post_id,
																					Komentar: comment_message,
																					JumlahKomentar:
																						JumlahKomentarTerakhir + 1,
																					resultcomment,
																					resultnotifComment: resultnotif,
																				});
																			}
																		}
																	);
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
	deleteCommentPost: (req, res) => {
		return new Promise((resolve, reject) => {
			const { post_id, comment_id } = req.query;
			db.query(
				`Select comment_id from post_comment where comment_id = '${comment_id}' AND post_id = '${post_id}'`,
				(errsearchComment, resultsearchcomment) => {
					if (errsearchComment) {
						reject({
							message: 'Error Di DB Query Search Comment',
						});
					} else if (!resultsearchcomment.length) {
						reject({
							message: `Komentar Dengan Komentar ID = ${comment_id} pada Post dengan post ID = ${post_id}Tidak Ditemukan `,
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
										`Select comment_count from post_statistic where post_id = '${post_id}'`,
										(errsearchpost, resultsearchpost) => {
											if (errsearchpost || !resultsearchpost.length) {
												reject({
													message: ' Gagal Ketika Mencari Postingan',
												});
											} else {
												const JumlahKomentarTerakhir =
													resultsearchpost[0].comment_count;
												db.query(
													`UPDATE post_statistic SET comment_count='${
														JumlahKomentarTerakhir - 1
													}' where post_id = '${post_id}'`,
													(erraddcommentcount, resultaddcommentcount) => {
														if (erraddcommentcount || !resultaddcommentcount) {
															reject({
																message:
																	' Gagal Ketika Menambahkan Jumlah Data Komentar',
															});
														} else {
															resolve({
																message: 'Berhasil Menghapus !',
																PostID: post_id,
																JumlahKomentar: JumlahKomentarTerakhir - 1,
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
		});
	},
};
