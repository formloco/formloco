const express = require('express') 
const VerifyToken = require('../../helper')

const { getFile, createFile, updateFile, deleteFile } = require('../controllers')

const router = express.Router()
 
//data
router.get('/:tenant_id/:form_id', VerifyToken, getFile)

router.post('/', VerifyToken, createFile)

router.put('/', VerifyToken, updateFile)

router.delete('/', VerifyToken, deleteFile)

module.exports = router