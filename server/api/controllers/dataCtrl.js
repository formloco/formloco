
const { dataRead, dataCreate, dataUpdate, dataDelete } = require('../services/dataService')

const readData = async(req, res) => {
  try{
    let data = await dataRead(req.params.tenant_id, req.params.form_id)
    res.status(201).json(data)
  }catch(e){
    console.log(e.message)
    res.sendStatus(500)
  }
}

const createData = async(req, res) => {
  try{
    let data = await dataCreate(req.body)
    res.status(201).json(data)
  }catch(e){
    console.log(e.message)
    res.sendStatus(500)
  }
}

const updateData = async(req, res) => {
  try{
    await dataUpdate(req.body)
    res.status(201).json({"message": "Subscription Updated"})
  }catch(e){
    console.log(e.message)
    res.sendStatus(500)
  }
}

const deleteData = async(req, res) => {
  try{
    await dataDelete(req.body)
    res.status(201).json({"message": "Subscription Updated"})
  }catch(e){
    console.log(e.message)
    res.sendStatus(500)
  }
}

module.exports = {
  readData, createData, updateData, deleteData
}
