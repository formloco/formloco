const { settingReadSQL, settingCreateSQL, settingUpdateSQL } = require('../db/settingDB')

const settingRead = async(tenant_id, form_id) => {
  try {
    let data = await settingReadSQL(tenant_id, form_id)
    return data
  } catch(e) {
    throw new Error(e.message)
  }
}

const settingCreate = async(data) => {
  try {
    await settingCreateSQL(data)
  } catch(e) {
    throw new Error(e.message)
  }
}

const settingUpdate = async(data) => {
  try {
    await settingUpdateSQL(data)
  } catch(e) {
    throw new Error(e.message)
  }
}

module.exports = {
  settingRead, settingCreate, settingUpdate
}
