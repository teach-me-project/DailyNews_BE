const express = require("express")
const bookmarksController = require('../controller/bookmarksController')
const router = express.Router()
router.get('/:id', bookmarksController.getById)
router.post('/:id', bookmarksController.addBookmark)
router.delete('/:id', bookmarksController.deleteBookmark)
module.exports =router