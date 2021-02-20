/**
 * Purpose: sign up, login and temporary token services
 */
const express = require('express') 
const VerifyToken = require('../../helper')

const { tempToken, authLogin, loginProvider, signupEmail, tokenRefresh } = require('../controllers')
const router = express.Router()
 
//auth
router.put('/token/refresh', VerifyToken, tokenRefresh)

router.get('/token', tempToken)

router.post('/', authLogin)

router.post('/provider', loginProvider)

router.post('/email', signupEmail)


module.exports = router