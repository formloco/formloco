const express = require('express') 
const VerifyToken = require('../../helper')

const { getFile, createFile, updateFile, deleteFile, getPgFile, createPgFile } = require('../controllers')

const router = express.Router()
 
// static files
router.get('/:tenant_id/:form_id', VerifyToken, getFile)

router.post('/', VerifyToken, createFile)

router.put('/', VerifyToken, updateFile)

router.delete('/', VerifyToken, deleteFile)

// postgresql files
router.get('/pg/:tenant_id/:form_id', VerifyToken, getPgFile)

router.post('/pg/', VerifyToken, createPgFile)

module.exports = router