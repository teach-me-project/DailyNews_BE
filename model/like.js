/** @format */

const db = require('../helper/db_connections');
module.exports = {
	addLikeUnlikePost: (req, res) => {
		return new Promise((resolve, reject) => {
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
							`select * from post_like where post_id = '${post_id}' AND profile_id = '${profile_id}'`,
							(errsearchlikedata, resultlikedata) => {
								if (errsearchlikedata) {
									reject({
										message: 'Error Di DB Query',
									});
								} else if (resultlikedata.length) {
									db.query(
										`Delete from post_like where post_id = '${post_id}' AND profile_id = '${profile_id}'`,
										(errdeletelike, resultlike) => {
											if (errdeletelike || !resultlike) {
												reject({
													message: ' Gagal Unlike',
												});
											} else {
												db.query(
													`Select like_count from post_statistic where post_id = '${post_id}'`,
													(errsearchpost, resultsearchpost) => {
														if (errsearchpost || !resultsearchpost.length) {
															reject({
																message: ' Gagal Ketika Mencari Postingan',
															});
														} else {
															const JumlahLikeTerakhir =
																resultsearchpost[0].like_count;
															db.query(
																`UPDATE post_statistic SET like_count='${
																	JumlahLikeTerakhir - 1
																}' where post_id = '${post_id}'`,
																(erraddlikecount, resultaddlikecount) => {
																	if (erraddlikecount || !resultaddlikecount) {
																		reject({
																			message:
																				' Gagal Ketika Mengurangi Jumlah Data Like',
																		});
																	} else {
																		resolve({
																			message: 'Berhasil Unlike !',
																			PostID: post_id,
																			JumlahLike: JumlahLikeTerakhir - 1,
																			resultlike,
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
								} else if (!resultlikedata.length) {
									db.query(
										`INSERT into post_like (post_id,profile_id) 
										Values ("${post_id}","${profile_id}")`,
										(errdeletelike, resultlike) => {
											if (errdeletelike || !resultlike) {
												reject({
													message: ' Gagal Menambahkan Like',
												});
											} else {
												db.query(
													`Select like_count from post_statistic where post_id = '${post_id}'`,
													(errsearchpost, resultsearchpost) => {
														if (errsearchpost || !resultsearchpost.length) {
															reject({
																message: ' Gagal Ketika Mencari Postingan',
															});
														} else {
															const JumlahLikeTerakhir =
																resultsearchpost[0].like_count;
															db.query(
																`UPDATE post_statistic SET like_count='${
																	JumlahLikeTerakhir + 1
																}' where post_id = '${post_id}'`,
																(erraddlikecount, resultaddlikecount) => {
																	if (erraddlikecount || !resultaddlikecount) {
																		reject({
																			message:
																				' Gagal Ketika Menambahkan Jumlah Data Like',
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
																					resultsearchpostprofileid[0]
																						.profile_id;
																				db.query(
																					`INSERT into notification (target_profile_id,from_profile_id,notification_message) 
																				Values ("${target_profile_id}","${profile_id}",'Liked Your Post')`,
																					(erraddnotif, resultnotif) => {
																						if (erraddnotif) {
																							reject({
																								message:
																									' Gagal Ketika Menambahkan Notifikasi',
																							});
																						} else if (resultnotif) {
																							resolve({
																								message:
																									'Berhasil Menambahkan Like !',
																								PostID: post_id,
																								JumlahLike:
																									JumlahLikeTerakhir + 1,
																								resultLike: resultlike,
																								resultnotif: resultnotif,
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
					}
				}
			);
		});
	},
};
