const { freshbooksEntityConnectSQL, freshbooksEntityGetSQL, freshbooksEntityCreateSQL, freshbooksEntityUpdateSQL, freshbooksEntityDisconnectSQL } = require('../db/freshbooksDB')
const { quickbooksEntityConnectSQL, quickbooksEntityGetSQL, quickbooksEntityCreateSQL, quickbooksEntityUpdateSQL, quickbooksEntityDisconnectSQL } = require('../db/quickbooksDB')
const { xeroEntityConnectSQL, xeroEntityGetSQL, xeroEntityCreateSQL, xeroEntityUpdateSQL, xeroEntityDisconnectSQL } = require('../db/xeroDB')
const { waveEntityConnectSQL, waveEntityGetSQL, waveEntityCreateSQL, waveEntityUpdateSQL, waveEntityDisconnectSQL } = require('../db/waveDB')
const { microsoftBusinessCentralEntityConnectSQL, microsoftBusinessCentralEntityGetSQL, microsoftBusinessCentralEntityCreateSQL, microsoftBusinessCentralEntityUpdateSQL, microsoftBusinessCentralEntityDisconnectSQL } = require('../db/microsoftBusinessCentralDB')

const entityConnect = async(tenant_id, id, type, res) => {
  try {
    if (type === 'Freshbooks')
      let data = await freshbooksEntityConnectSQL(tenant_id, id, res)
    else if (type === 'Quickbooks')
      let data = await quickbooksEntityConnectSQL(tenant_id, id, res)
    else if (type === 'Xero')
      let data = await xeroEntityConnectSQL(tenant_id, id, res)
    else if (type === 'Wave')
      let data = await waveEntityConnectSQL(tenant_id, id, res)
    else if (type === 'MicrosoftBusinessCentral')
      let data = await microsoftBusinessCentralEntityConnectSQL(tenant_id, id, res)
    return data
  } catch(e) {
    throw new Error(e.message)
  }
}

const entityGet = async(tenant_id, type) => {
  try {
    if (type === 'Freshbooks')
      let data = await freshbooksEntityGetSQL(tenant_id)
    else if (type === 'Quickbooks')
      let data = await quickbooksEntityGetSQL(tenant_id)
    else if (type === 'Xero')
      let data = await xeroEntityGetSQL(tenant_id)
    else if (type === 'Wave')
      let data = await waveEntityGetSQL(tenant_id)
    else if (type === 'MicrosoftBusinessCentral')
      let data = await microsoftBusinessEntityGetSQL(tenant_id)
    return data
  } catch(e) {
    throw new Error(e.message)
  }
}

const entityCreate = async(data) => {
  try {
    if (data["type"] === 'Freshbooks')
    let data = await freshbooksEntityCreateSQL(data)
  else if (data["type"] === 'Quickbooks')
    let data = await quickbooksEntityCreateSQL(tenant_id)
  else if (data["type"] === 'Xero')
    let data = await xeroEntityCreateSQL(tenant_id)
  else if (data["type"] === 'Wave')
    let data = await waveEntityCreateSQL(tenant_id)
  else if (data["type"] === 'MicrosoftBusinessCentral')
    let data = await microsoftBusinessEntityGetSQL(tenant_id)
  return data
  } catch(e) {
    throw new Error(e.message)
  }
}

const entityUpdate = async(data) => {
  try {
    if (data["type"] === 'Freshbooks')
      let data = await freshbooksEntityUpdateSQL(data)
    else if (data["type"] === 'Quickbooks')
      let data = await quickbooksEntityUpdateSQL(tenant_id)
    else if (data["type"] === 'Xero')
      let data = await xeroEntityUpdateSQL(tenant_id)
    else if (data["type"] === 'Wave')
      let data = await waveEntityUpdateSQL(tenant_id)
    else if (data["type"] === 'MicrosoftBusinessCentral')
      let data = await microsoftBusinessEntityUpdateSQL(tenant_id)
    return data
  } catch(e) {
    throw new Error(e.message)
  }
}

const entityDisconnect = async(data) => {
  try {
    if (data["type"] === 'Freshbooks')
      let data = await freshbooksEntityDisconnectSQL(data)
    else if (data["type"] === 'Quickbooks')
      let data = await quickbooksEntityDisconnectSQL(tenant_id)
    else if (data["type"] === 'Xero')
      let data = await xeroEntityDisconnectSQL(tenant_id)
    else if (data["type"] === 'Wave')
      let data = await waveEntityDisconnectSQL(tenant_id)
    else if (data["type"] === 'MicrosoftBusinessCentral')
      let data = await microsoftBusinessEntityDisconnectSQL(tenant_id)
    return data
  } catch(e) {
    throw new Error(e.message)
  }
}

module.exports = {
  entityConnect, entityGet, entityCreate, entityUpdate, entityDisconnect
}
