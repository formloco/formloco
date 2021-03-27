const express = require('express') 
const VerifyToken = require('../../helper')

const { readData, createData, updateData, deleteData } = require('../controllers/dataCtrl')

const router = express.Router()
 
//data
router.get('/api/:tenant_id/:form_id', VerifyToken, readData)

router.post('/api', VerifyToken, createData)

router.put('/api', VerifyToken, updateData)

router.delete('/api', VerifyToken, deleteData)

module.exports = router