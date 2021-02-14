const { dataReadSQL, dataCreateSQL, dataUpddateSQL, dataDeleteSQL } = require('../db/dataDB')

const dataRead = async(tenant_id, form_id) => {
  try {
    let data = await dataReadSQL(tenant_id, form_id)
    return data
  } catch(e) {
    throw new Error(e.message)
  }
}

const dataCreate = async(data) => {
  try {
    await dataCreateSQL(data)
    return data
  } catch(e) {
    throw new Error(e.message)
  }
}

const dataUpdate = async(data) => {
  try {
    await dataUpdateSQL(data)
  } catch(e) {
    throw new Error(e.message)
  }
}

const dataDelete = async(data) => {
  try {
    await dataDeleteSQL(data)
  } catch(e) {
    throw new Error(e.message)
  }
}

module.exports = {
  dataRead, dataCreate, dataUpdate, dataDelete
}
