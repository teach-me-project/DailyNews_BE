/** @format */

const fs = require('fs');
const db = require('./db_connections');
const deletecover = (FileLocation) => {
	fs.unlink(FileLocation, (err) => {
		if (err) {
			console.log(`Error di FS unlink ${err}`);
		} else {
			console.log('sukses');
		}
	});
};
const updatecover = (post_id) => {
	db.query(
		`select post_cover from post where post_id = ${post_id}`,
		(err, result) => {
			if (err) {
				console.log('error di db query');
				return 0;
			} else if (!result.length) {
				console.log('Data Cover Tidak Ada , Tidak Ada Cover yang diganti');
				return 0;
			} else {
				deletecover(`./upload/${result[0].post_cover}`);
				return 1;
			}
		}
	);
};

module.exports = { deletecover, updatecover };
