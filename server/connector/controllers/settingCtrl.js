
const { settingRead, settingCreate, settingUpdate } = require('../services/settingService')

const readSetting = async(req, res) => {
  try{
    let data = await settingRead(req.params.tenant_id)
    res.status(201).json(data)
  }catch(e){
    console.log(e.message)
    res.sendStatus(500)
  }
}

const createSetting = async(req, res) => {
  try{
    await settingCreate(req.body)
    res.status(201).json({"message": "Setting Created"})
  }catch(e){
    console.log(e.message)
    res.sendStatus(500)
  }
}

const updateSetting = async(req, res) => {
  try{
    await settingUpdate(req.body)
    res.status(201).json({"message": "Setting Updated"})
  }catch(e){
    console.log(e.message)
    res.sendStatus(500)
  }
}

module.exports = {
  readSetting, createSetting, updateSetting
}
