const express = require('express') 
const VerifyToken = require('../../helper')

const { readData, createData, updateData, deleteData, getData } = require('../controllers/dataCtrl')

const router = express.Router()
 
//data
router.get('/api/:tenant_id/:form_id', VerifyToken, readData)

router.post('/api/', VerifyToken, createData)

router.put('/api/', VerifyToken, updateData)

router.post('/api/delete/', VerifyToken, deleteData)

router.post('/api/read/', VerifyToken, getData)

module.exports = router