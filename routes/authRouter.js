const express = require("express")
const authController = require('../controller/authController')
const router = express.Router()
const  jwt = require('jsonwebtoken');



router.get('/forgot-password')
router.post('/forgot-password', authController.forgot )
router.get('/reset-password/:id/:token',authController.getreset )
router.post('/reset-password/:id/:token', authController.reset)
router.post('/login',authController.login) 
router.post('/register', authController.register)


module.exports = router