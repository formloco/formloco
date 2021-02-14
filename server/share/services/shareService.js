const { readShareSQL, createShareSQL, deleteShareSQL, updateShareSQL, publishShareSQL } = require('../db/shareDB')

const readShare = async(data) => {
  try {
    await readShareSQL(data);
  } catch(e) {
    throw new Error(e.message);
  }
}

const createShare = async(data) => {
  try {
    let user = await createShareSQL(data);
    return user;
  } catch(e) {
    throw new Error(e.message);
  }
}

const deleteShare = async(data) => {
  try {
    await deleteShareSQL(data);
  } catch(e) {
    throw new Error(e.message);
  }
}

const updateShare = async(data) => {
  try {
    await updateShareSQL(data);
  } catch(e) {
    throw new Error(e.message);
  }
}

const publishShare = async(data) => {
  try {
    let user = await publishShareSQL(data);
    return user;
  } catch(e) {
    throw new Error(e.message);
  }
}

module.exports = {
  readShare, createShare, deleteShare, updateShare, publishShare
};
