const { dataReadSQL, dataCreateSQL, dataUpdateSQL, dataDeleteSQL, listsGetSQL } = require('../db/dataDB')

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
    let rows = await dataUpdateSQL(data)
    return rows
  } catch(e) {
    throw new Error(e.message)
  }
}

const dataDelete = async(data) => {
  try {
    let rows = await dataDeleteSQL(data)
    return rows
  } catch(e) {
    throw new Error(e.message)
  }
}

const listsGet = async(data) => {
  try {
    let rows = await listsGetSQL(data)
    return rows
  } catch(e) {
    throw new Error(e.message)
  }
}


module.exports = {
  dataRead, dataCreate, dataUpdate, dataDelete, listsGet
}
