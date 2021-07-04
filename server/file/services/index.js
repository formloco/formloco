const { fileGetSQL, fileCreateSQL, fileUpdateSQL, fileDeleteSQL, fileGetPgSQL, fileCreatePgSQL } = require('../db/fileDB')

const fileGet = async(tenant_id, form_id) => {
  try {
    let data = await fileGetSQL(tenant_id, form_id)
    return data
  } catch(e) {
    throw new Error(e.message)
  }
}

const fileCreate = async(data) => {
  try {
    await fileCreateSQL(data)
  } catch(e) {
    throw new Error(e.message)
  }
}

const fileUpdate = async(data) => {
  try {
    await fileUpdateSQL(data)
  } catch(e) {
    throw new Error(e.message)
  }
}

const fileDelete = async(data) => {
  try {
    await fileDeleteSQL(data)
  } catch(e) {
    throw new Error(e.message)
  }
}

const fileGetPg = async(tenant_id, form_id) => {
  try {
    let data = await fileGetPgSQL(tenant_id, form_id)
    return data
  } catch(e) {
    throw new Error(e.message)
  }
}

const fileCreatePg = async(data) => {
  try {
    await fileCreatePgSQL(data)
  } catch(e) {
    throw new Error(e.message)
  }
}

module.exports = {
  fileGet, fileCreate, fileUpdate, fileDelete, fileGetPg, fileCreatePg
}
