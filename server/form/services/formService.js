const { formReadSQL, formsReadSQL, formCreateSQL, formUpdateSQL, formDeleteSQL, templatesReadSQL, templateReadSQL, templateCreateSQL, templatePublishSQL, templateUpdateSQL, templateDeleteSQL } = require('../db/formDB')

const formRead = async(form_id, tenant_id) => {
  try {
    let data = await formReadSQL(form_id, tenant_id);
    return data;
  } catch(e) {
    throw new Error(e.message);
  }
}

const formsRead = async(tenant_id) => {
  try {
    let data = await formsReadSQL(tenant_id);
    return data;
  } catch(e) {
    throw new Error(e.message);
  }
}

const formCreate = async(data) => {
  try {
    await formCreateSQL(data);
  } catch(e) {
    throw new Error(e.message);
  }
}

const formUpdate = async(data) => {
  try {
    await formUpdateSQL(data);
  } catch(e) {
    throw new Error(e.message);
  }
}

const formDelete = async(data) => {
  try {
    await formDeleteSQL(data);
  } catch(e) {
    throw new Error(e.message);
  }
}

const templatesRead = async() => {
  try {
    let data = await templatesReadSQL();
    return data;
  } catch(e) {
    throw new Error(e.message);
  }
}

const templateRead = async(id) => {
  try {
    let data = await templateReadSQL(id);
    return data;
  } catch(e) {
    throw new Error(e.message);
  }
}

const templateCreate = async(data) => {
  try {
    await templateCreateSQL(data);
  } catch(e) {
    throw new Error(e.message);
  }
}

const templateUpdate = async(data) => {
  try {
    await templateUpdateSQL(data);
  } catch(e) {
    throw new Error(e.message);
  }
}

const templatePublish = async(data) => {
  try {
    await templatePublishSQL(data);
  } catch(e) {
    throw new Error(e.message);
  }
}

const templateDelete = async(id) => {
  try {
    await templateDeleteSQL(id);
  } catch(e) {
    throw new Error(e.message);
  }
}

module.exports = {
  formsRead, formRead, formCreate, formUpdate, formDelete, templatesRead, templateRead, templateCreate, templateUpdate, templatePublish, templateDelete
};
