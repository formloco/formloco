const express = require('express') 
const VerifyToken = require('../../helper')

const { readData, createData, updateData, deleteData } = require('../controllers/dataCtrl')

const router = express.Router()
 
//data
router.get('/:tenant_id/:form_id', VerifyToken, readData)

router.post('/', VerifyToken, createData)

router.put('/', VerifyToken, updateData)

router.delete('/', VerifyToken, deleteData)

module.exports = router