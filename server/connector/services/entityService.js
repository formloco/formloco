const { freshbooksEntityConnectSQL, freshbooksEntityGetSQL, freshbooksEntityCreateSQL, freshbooksEntityUpdateSQL, freshbooksEntityDisconnectSQL } = require('../db/freshbooksDB')
const { quickbooksEntityConnectSQL, quickbooksEntityGetSQL, quickbooksEntityCreateSQL, quickbooksEntityUpdateSQL, quickbooksEntityDisconnectSQL } = require('../db/quickbooksDB')
const { xeroEntityConnectSQL, xeroEntityGetSQL, xeroEntityCreateSQL, xeroEntityUpdateSQL, xeroEntityDisconnectSQL } = require('../db/xeroDB')
const { waveEntityConnectSQL, waveEntityGetSQL, waveEntityCreateSQL, waveEntityUpdateSQL, waveEntityDisconnectSQL } = require('../db/waveDB')
const { microsoftBusinessCentralEntityConnectSQL, microsoftBusinessCentralEntityGetSQL, microsoftBusinessCentralEntityCreateSQL, microsoftBusinessCentralEntityUpdateSQL, microsoftBusinessCentralEntityDisconnectSQL } = require('../db/microsoftBusinessCentralDB')

const entityConnect = async(tenant_id, id, type, res) => {
  try {
    let data
    if (type === 'Freshbooks')
      data = await freshbooksEntityConnectSQL(tenant_id, id, res)
    else if (type === 'Quickbooks')
      data = await quickbooksEntityConnectSQL(tenant_id, id, res)
    else if (type === 'Xero')
      data = await xeroEntityConnectSQL(tenant_id, id, res)
    else if (type === 'Wave')
      data = await waveEntityConnectSQL(tenant_id, id, res)
    else if (type === 'MicrosoftBusinessCentral')
      data = await microsoftBusinessCentralEntityConnectSQL(tenant_id, id, res)
    return data
  } catch(e) {
    throw new Error(e.message)
  }
}

const entityGet = async(tenant_id, type) => {
  try {
    let data
    if (type === 'Freshbooks')
      data = await freshbooksEntityGetSQL(tenant_id)
    else if (type === 'Quickbooks')
      data = await quickbooksEntityGetSQL(tenant_id)
    else if (type === 'Xero')
      data = await xeroEntityGetSQL(tenant_id)
    else if (type === 'Wave')
      data = await waveEntityGetSQL(tenant_id)
    else if (type === 'MicrosoftBusinessCentral')
      data = await microsoftBusinessEntityGetSQL(tenant_id)
    return data
  } catch(e) {
    throw new Error(e.message)
  }
}

const entityCreate = async(data) => {
  try {
    let data
    if (data["type"] === 'Freshbooks')
      data = await freshbooksEntityCreateSQL(data)
    else if (data["type"] === 'Quickbooks')
      data = await quickbooksEntityCreateSQL(tenant_id)
    else if (data["type"] === 'Xero')
      data = await xeroEntityCreateSQL(tenant_id)
    else if (data["type"] === 'Wave')
      data = await waveEntityCreateSQL(tenant_id)
    else if (data["type"] === 'MicrosoftBusinessCentral')
      data = await microsoftBusinessEntityGetSQL(tenant_id)
    return data
  } catch(e) {
    throw new Error(e.message)
  }
}

const entityUpdate = async(data) => {
  try {
    let data
    if (data["type"] === 'Freshbooks')
      data = await freshbooksEntityUpdateSQL(data)
    else if (data["type"] === 'Quickbooks')
      data = await quickbooksEntityUpdateSQL(tenant_id)
    else if (data["type"] === 'Xero')
      data = await xeroEntityUpdateSQL(tenant_id)
    else if (data["type"] === 'Wave')
      data = await waveEntityUpdateSQL(tenant_id)
    else if (data["type"] === 'MicrosoftBusinessCentral')
      data = await microsoftBusinessEntityUpdateSQL(tenant_id)
    return data
  } catch(e) {
    throw new Error(e.message)
  }
}

const entityDisconnect = async(data) => {
  try {
    let data
    if (data["type"] === 'Freshbooks')
      data = await freshbooksEntityDisconnectSQL(data)
    else if (data["type"] === 'Quickbooks')
      data = await quickbooksEntityDisconnectSQL(tenant_id)
    else if (data["type"] === 'Xero')
      data = await xeroEntityDisconnectSQL(tenant_id)
    else if (data["type"] === 'Wave')
      data = await waveEntityDisconnectSQL(tenant_id)
    else if (data["type"] === 'MicrosoftBusinessCentral')
      data = await microsoftBusinessEntityDisconnectSQL(tenant_id)
    return data
  } catch(e) {
    throw new Error(e.message)
  }
}

module.exports = {
  entityConnect, entityGet, entityCreate, entityUpdate, entityDisconnect
}
