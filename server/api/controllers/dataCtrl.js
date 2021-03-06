
const { dataRead, dataCreate, dataUpdate, dataDelete, listsGet, listSave } = require('../services/dataService')

const readData = async(req, res) => {
  try {
    let data = await dataRead(req.params.tenant_id, req.params.form_id)
    res.status(201).json(data)
  } catch(e) {
    res.sendStatus(500)
  }
}

const createData = async(req, res) => {
  try {
    let data = await dataCreate(req.body)
    res.status(201).json(data)
  } catch(e) {
    res.sendStatus(500)
  }
}

const updateData = async(req, res) => {
  try {
    let data = await dataUpdate(req.body)
    res.status(201).json({rows: data, "message": "Data Updated"})
  } catch(e) {
    res.sendStatus(500)
  }
}

const deleteData = async(req, res) => {
  try {
    await dataDelete(req.body)
    res.status(201).json({"message": "Subscription Updated"})
  } catch(e) {
    res.sendStatus(500)
  }
}

const getLists = async(req, res) => {
  try {
    let data = await listsGet(req.body)
    res.status(201).json(data)
  } catch(e) {
    res.sendStatus(500)
  }
}

const saveList = async(req, res) => {
  try {
    let data = await listSave(req.body)
    res.status(201).json(data)
  } catch(e) {
    res.sendStatus(500)
  }
}


module.exports = {
  readData, createData, updateData, deleteData, getLists, saveList
}
