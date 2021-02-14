/**
 * Purpose: sign up, login and temporary token services
 */
const express = require('express') 
const VerifyToken = require('../../helper')

const { tempToken, authLogin, loginProvider, signupEmail, tokenRefresh } = require('../controllers')
const router = express.Router()
 
//auth
router.get('/token', tempToken)

router.post('/login', authLogin)

router.post('/login/provider', loginProvider)

router.post('/signup/email', signupEmail)

router.put('/token/refresh', VerifyToken, tokenRefresh)

module.exports = router