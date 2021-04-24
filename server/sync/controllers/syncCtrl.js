
const { formSync, importSync, dataSyncToTenant, dataListTenantSync, dataListFormSync, syncDeleteList } = require('../services/syncService')

const syncForm = async(req, res) => {
  try {
    let data = await formSync(req.body);
    res.status(201).json(data);
  } catch(e) {
    res.sendStatus(500);
  }
}

const syncImport = async(req, res) => {
  try {
    let forms = await importSync(req.body);
    res.status(201).json({forms: forms, "message": "Forms synchronized."});
  } catch(e) {
    res.sendStatus(500);
  }
}

const syncDataToTenant = async(req, res) => {
  try {
    await dataSyncToTenant(req.body);
    res.status(201).json({"message": "Data synchronized."});
  } catch(e) {
    res.sendStatus(500);
  }
}

const syncDataListTenant = async(req, res) => {
  try {
    let data =await dataListTenantSync(req.body);
    res.status(201).json(data);
  } catch(e) {
    res.sendStatus(500);
  }
}

const syncDataListForm = async(req, res) => {
  try {
    let data = await dataListFormSync(req.body);
    res.status(201).json(data);
  } catch(e) {
    res.sendStatus(500);
  }
}

const syncListDelete = async(req, res) => {
  try {
    await syncDeleteList(req.body);
    res.status(201).json({"message": "List deleted."});
  } catch(e) {
    res.sendStatus(500);
  }
}

module.exports = {
  syncForm, syncImport, syncDataToTenant, syncDataListTenant, syncDataListForm, syncListDelete
};
