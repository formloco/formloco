
const { formsRead, formRead, formCreate, formUpdate, formDelete, templatesRead, templateRead, templateCreate, templateUpdate, templatePublish, templateDelete, formRegister } = require('../services/formService')

const readForms = async(req, res) => {
  try {
    let data = await formsRead(req.params.tenant_id)
    res.status(201).json(data)
  } catch(e) {
    res.sendStatus(500)
  }
}

const readForm = async(req, res) => {
  try {
    let data = await formRead(req.params.form_id, req.params.tenant_id)
    res.status(201).json(data)
  } catch(e) {
    res.sendStatus(500)
  }
}

const createForm = async(req, res) => {
  try {
    await formCreate(req.body)
    res.status(201).json({"message": "Form created."})
  } catch(e) {
    res.sendStatus(500)
  }
}

const updateForm = async(req, res) => {
  try {
    await formUpdate(req.body)
    res.status(201).json({"message": "Form saved."})
  } catch(e) {
    res.sendStatus(500)
  }
}

const deleteForm = async(req, res) => {
  try {
    await formDelete(req.body)
    res.status(201).json({"message": "Form deleted."})
  } catch(e) {
    res.sendStatus(500)
  }
}

const registerForm = async(req, res) => {
  try {
    let data = await formRegister(req.body)
    res.status(201).json(data)
  } catch(e) {
    res.sendStatus(500)
  }
}

const readTemplates = async(req, res) => {
  try {
    let data = await templatesRead()
    res.status(201).json(data)
  } catch(e) {
    res.sendStatus(500)
  }
}

const readTemplate = async(req, res) => {
  try {
    let data = await templateRead(req.params.id)
    res.status(201).json(data)
  } catch(e) {
    res.sendStatus(500)
  }
}

const createTemplate = async(req, res) => {
  try {
    await templateCreate(req.body)
    res.status(201).json({"message": "Template created."})
  } catch(e) {
    res.sendStatus(500)
  }
}

const updateTemplate = async(req, res) => {
  try {
    await templateUpdate(req.body)
    res.status(201).json({"message": "Template saved."})
  } catch(e) {
    res.sendStatus(500)
  }
}

const publishTemplate = async(req, res) => {
  try {
    await templatePublish(req.body)
    res.status(201).json({"message": "Template published."})
  } catch(e) {
    res.sendStatus(500)
  }
}

const deleteTemplate = async(req, res) => {
  try {
    await templateDelete(req.params.id)
    res.status(201).json({"message": "Template deleted."})
  } catch(e) {
    res.sendStatus(500)
  }
}

module.exports = {
  readForms, readForm, createForm, updateForm, deleteForm, readTemplates, readTemplate, createTemplate, updateTemplate, publishTemplate, deleteTemplate, registerForm
}
