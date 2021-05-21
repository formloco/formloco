const { formSyncSQL, importSyncSQL, dataSyncToTenantSQL, dataListTenantSyncSQL, dataListFormSyncSQL, listsTenantSQL, syncDeleteListSQL } = require('../db/syncDB')

const formSync = async(data) => {
  try {
    let forms = await formSyncSQL(data);
    return forms
  } catch(e) {
    throw new Error(e.message)
  }
}

const importSync = async(data) => {
  try {
    let forms = await importSyncSQL(data);
    return forms
  } catch(e) {
    throw new Error(e.message)
  }
}

const dataSyncToTenant = async(formObj) => {
  try {
    await dataSyncToTenantSQL(formObj);
  } catch(e) {
    throw new Error(e.message)
  }
}

const dataListTenantSync = async(data) => {
  try {
    return await dataListTenantSyncSQL(data);
  } catch(e) {
    throw new Error(e.message)
  }
}

const dataListFormSync = async(data) => {
  try {
    return await dataListFormSyncSQL(data);
  } catch(e) {
    throw new Error(e.message)
  }
}

const listsTenant = async(data) => {
  try {
    return await listsTenantSQL(data);
  } catch(e) {
    throw new Error(e.message)
  }
}

const syncDeleteList = async(data) => {
  try {
    return await syncDeleteListSQL(data);
  } catch(e) {
    throw new Error(e.message)
  }
}

// const syncListDataToIdb = async(tenant_id) => {
//   try {
//     return await syncListDataToIdbSQL(tenant_id);
//   } catch(e) {
//     throw new Error(e.message)
//   }
// }

module.exports = {
  formSync, importSync, dataSyncToTenant, dataListTenantSync, listsTenant, dataListFormSync, syncDeleteList
};
