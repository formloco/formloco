const express = require('express') 
const VerifyToken = require('../../helper')

const { invite, link, signup, forgotPassword } = require('../controllers')
const router = express.Router()
 
//formloco
router.post('/invite', VerifyToken, invite)

router.post('/link', VerifyToken, link)

router.post('/signup', signup)

router.post('/forgotpassword', forgotPassword)

module.exports = router