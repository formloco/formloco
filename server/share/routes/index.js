const express = require('express') 
const VerifyToken = require('../../helper');

const { shareRead, shareCreate, shareUpdate, shareDelete, sharePublish } = require('../controllers/shareCtrl')

const router = express.Router()
 
//share
router.post('/share/publish/', VerifyToken, sharePublish);

router.post('/share/delete/', VerifyToken, shareDelete);

router.get('/share', VerifyToken, shareRead);

router.post('/share', VerifyToken, shareCreate);

router.put('/share', VerifyToken, shareUpdate);

module.exports = router;