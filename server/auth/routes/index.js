const express = require('express') 
const VerifyToken = require('../../helper')

const { tempToken, authLogin, loginProvider, signupEmail, tokenRefresh } = require('../controllers')
const router = express.Router()
 
//auth
router.put('/auth/token/refresh/', VerifyToken, tokenRefresh)

router.get('/auth/token/', tempToken)

router.post('/auth/', authLogin)

router.post('/auth/provider/', loginProvider)

router.post('/auth/email/', signupEmail)


module.exports = router