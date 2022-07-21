const express = require("express")
const authController = require('../controller/authController')
const router = express.Router()


const getToken = async () => {
    console.log(req.query.token, 'token hasil forgot')
   
} 
router.get('/verify-email?token', getToken)
router.post('/login',authController.login) 
router.post('/register', authController.register)
router.patch('/forgot-password/:email', authController.update)

module.exports = router