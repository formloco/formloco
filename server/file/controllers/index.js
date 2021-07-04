
const { fileGet, fileCreate, fileUpdate, fileDelete, fileGetPg, fileCreatePg } = require('../services')

const getFile = async(req, res) => {
  try {
    let data = await fileGet(req.params.tenant_id, req.params.form_id)
    res.status(201).json(data)
  } catch(e) {
    res.sendStatus(500)
  }
}

const createFile = async(req, res) => {
  try {
    await fileCreate(req.body)
    res.status(201).json({"message": "File Created"})
  } catch(e) {
    res.sendStatus(500)
  }
}

const updateFile = async(req, res) => {
  try {
    await fileUpdate(req.body)
    res.status(201).json({"message": "File Updated"})
  } catch(e) {
    res.sendStatus(500)
  }
}

const deleteFile = async(req, res) => {
  try {
    await fileDelete(req.body)
    res.status(201).json({"message": "File Updated"})
  } catch(e) {
    res.sendStatus(500)
  }
}

const getPgFile = async(req, res) => {
  try {
    let data = await fileGetPg(req.params.tenant_id, req.params.form_id)
    res.status(201).json(data)
  } catch(e) {
    res.sendStatus(500)
  }
}

const createPgFile = async(req, res) => {
  try {
    await fileCreatePg(req.body)
    res.status(201).json({"message": "File Created"})
  } catch(e) {
    res.sendStatus(500)
  }
}

module.exports = {
  getFile, createFile, updateFile, deleteFile, getPgFile, createPgFile
}
