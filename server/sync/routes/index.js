const express = require('express') 
const VerifyToken = require('../../helper');

const { syncForm, syncImport, syncDataToTenant, syncDataListTenant, syncDataListForm, syncListDelete } = require('../controllers/syncCtrl')

const router = express.Router()

//sync
router.post('/sync/form', VerifyToken, syncForm)

router.post('/sync/import', VerifyToken, syncImport)

router.post('/sync/data', VerifyToken, syncDataToTenant)

router.post('/sync/list/tenant', VerifyToken, syncDataListTenant)

router.post('/sync/list/form', VerifyToken, syncDataListForm);

router.post('/sync/list/delete/', VerifyToken, syncListDelete);

module.exports = router;