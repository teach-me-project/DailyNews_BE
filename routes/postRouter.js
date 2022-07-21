/** @format */

const express = require('express');
const postController = require('../controller/postController');
const router = express.Router();
const upload = require('../helper/multer');

router.post('/', upload.single('post_cover'), postController.addNewpost);

module.exports = router;
