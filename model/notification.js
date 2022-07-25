/** @format */

const db = require('../helper/db_connections');
module.exports = {
	getNotification: (req, res) => {
		return new Promise((resolve, reject) => {
			const { profile_id } = req.query;
			db.query(
				`select  notification.notification_id, notification.target_profile_id, notification.from_profile_id, profiles.profile_name,notification.notification_message from notification INNER JOIN profiles On notification.from_profile_id = profiles.profile_id where target_profile_id = '${profile_id}'`,
				(errcomment, resultcomment) => {
					if (errcomment) {
						reject({
							message: `Error Pada Proses Mencari notification`,
						});
					}
					resolve({
						message: `Get Notification With Profile ID = ${profile_id}`,
						status: 200,
						Comment: resultcomment,
					});
				}
			);
		});
	},
	deleteAllNotification: (req, res) => {
		return new Promise((resolve, reject) => {
			const { profile_id } = req.query;
			db.query(
				`Select notification_id from notification where target_profile_id = '${profile_id}'`,
				(errsearchComment, resultsearchcomment) => {
					if (errsearchComment) {
						reject({
							message: 'Error Di DB Query Search Comment',
						});
					} else if (!resultsearchcomment.length) {
						reject({
							message: `notification  untuk profile dengan ID= ${profile_id} Tidak Ditemukan `,
						});
					} else {
						db.query(
							`delete from notification where target_profile_id = '${profile_id}'`,
							(errdeletenotification, resultdeletenotification) => {
								if (errdeletenotification || !resultdeletenotification) {
									reject({
										message: ' Gagal Menghapus notification',
									});
								} else {
									if (errdeletenotification || !resultdeletenotification) {
										reject({
											message:
												' Gagal Ketika Menambahkan Jumlah Data notification',
										});
									} else {
										resolve({
											message: 'Berhasil Menghapus Notifikasi!',
											resultdeletenotification,
										});
									}
								}
							}
						);
					}
				}
			);
		});
	},
	deleteNotification: (req, res) => {
		return new Promise((resolve, reject) => {
			const { profile_id, notification_id } = req.query;
			db.query(
				`Select notification_id from notification where notification_id = '${notification_id}' AND target_profile_id = '${profile_id}'`,
				(errsearchComment, resultsearchcomment) => {
					if (errsearchComment) {
						reject({
							message: 'Error Di DB Query Search Comment',
						});
					} else if (!resultsearchcomment.length) {
						reject({
							message: `notification Dengan notification ID = ${notification_id} untuk profile dengan ID= ${profile_id} Tidak Ditemukan `,
						});
					} else {
						db.query(
							`delete from notification where notification_id = '${notification_id}'`,
							(errdeletenotification, resultdeletenotification) => {
								if (errdeletenotification || !resultdeletenotification) {
									reject({
										message: ' Gagal Menghapus notification',
									});
								} else {
									if (errdeletenotification || !resultdeletenotification) {
										reject({
											message:
												' Gagal Ketika Menambahkan Jumlah Data notification',
										});
									} else {
										resolve({
											message: 'Berhasil Menghapus Notifikasi!',
											resultdeletenotification,
										});
									}
								}
							}
						);
					}
				}
			);
		});
	},
};
