
const { entityConnect, entityGet, entityCreate, entityUpdate, entityDisconnect } = require('../services/entityService')

const connectEntity = async(req, res) => {
  try{
    let data = await entityConnect(req.params.tenant_id, req.params.id, req.params.type, res)
    res.status(201).json(data)
  }catch(e){
    console.log(e.message)
    res.sendStatus(500)
  }
}

const getEntity = async(req, res) => {
  try{
    let data = await entityGet(req.params.tenant_id, req.params.type)
    res.status(201).json(data)
  }catch(e){
    console.log(e.message)
    res.sendStatus(500)
  }
}

const createEntity = async(req, res) => {
  try{
    console.log(req.body)
    await entityCreate(req.body)
    res.status(201).json({"message": "Entity Created"})
  }catch(e){
    console.log(e.message)
    res.sendStatus(500)
  }
}

const updateEntity = async(req, res) => {
  try{
    await entityUpdate(req.body)
    res.status(201).json({"message": "Entity Updated"})
  }catch(e){
    console.log(e.message)
    res.sendStatus(500)
  }
}

const disconnectEntity = async(req, res) => {
  try{
    await entityDisconnect(req.body)
    res.status(201).json({"message": "Disconnected"})
  }catch(e){
    console.log(e.message)
    res.sendStatus(500)
  }
}

module.exports = {
  connectEntity, getEntity, createEntity, updateEntity, disconnectEntity
}
