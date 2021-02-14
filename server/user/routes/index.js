const express = require('express') 
const VerifyToken = require('../../helper');

const { usersRead, userDelete, userCreate, userUpdate, userResetpassword } = require('../controllers/userCtrl')

const router = express.Router()
 
//user
router.get('/users/:tenant_id/', VerifyToken, usersRead);

router.delete('/user', VerifyToken, userDelete);

router.post('/user', VerifyToken, userCreate);

router.put('/user', VerifyToken, userUpdate);

router.put('/user/resetpassword', VerifyToken, userResetpassword);
 
module.exports = router;