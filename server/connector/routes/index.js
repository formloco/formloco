const express = require('express') 
const VerifyToken = require('../../helper')

const { readSetting, createSetting, updateSetting } = require('../controllers/settingCtrl')
const { connectEntity, getEntity, createEntity, updateEntity, disconnectEntity } = require('../controllers/entityCtrl')
const { quickbooksCallback } = require('../controllers/callbackCtrl')

const router = express.Router()
 
//settings
router.get('/:tenant_id', VerifyToken, readSetting)

router.post('/', VerifyToken, createSetting)

router.put('/', VerifyToken, updateSetting)

//connector api
router.get('/connect/:tenant_id/:id/:type', VerifyToken, connectEntity)

router.get('/:tenant_id/:id/:type', VerifyToken, getEntity)

router.post('/', VerifyToken, createEntity)

router.put('/', VerifyToken, updateEntity)

router.post('/disconnect', VerifyToken, disconnectEntity)

router.get('/quickbookscallback', VerifyToken, quickbooksCallback)

module.exports = router