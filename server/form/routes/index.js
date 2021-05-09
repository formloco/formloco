const express = require('express') 
const VerifyToken = require('../../helper');

const { readForms, readForm, createForm, updateForm, deleteForm, readTemplates, readTemplate, createTemplate, updateTemplate, publishTemplate, deleteTemplate, registerForm } = require('../controllers/formCtrl')

const router = express.Router()

//form template
router.get('/template', readTemplates)

router.get('/template/:id/', readTemplate)

router.post('/template', VerifyToken, createTemplate)

router.put('/template', VerifyToken, updateTemplate)

router.put('/template/publish', VerifyToken, publishTemplate)

router.delete('/template/:id/', VerifyToken, deleteTemplate)

//form
router.get('/form/:tenant_id/', VerifyToken, readForms)

router.post('/form', VerifyToken, createForm)

router.put('/form', VerifyToken, updateForm)

router.post('/form/delete', VerifyToken, deleteForm)

router.post('/form/register', VerifyToken, registerForm)

router.get('/:form_id/:tenant_id/', readForm)

module.exports = router