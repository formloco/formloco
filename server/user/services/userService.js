const dotenv = require('dotenv')
const jwt = require('jsonwebtoken')
const bcrypt  = require('bcryptjs')

let envPath = process.cwd()
envPath = envPath.slice(0,envPath.length-4)+'/.env'

const api = { secret: process.env.SECRET }

const { readUsersSQL, deleteUserSQL, createUserSQL, updateUserSQL, resetpasswordUserSQL } = require('../db/userDB')

const readUsers = async(tenant_id) => {
  try {
    let data = await readUsersSQL(tenant_id);
    return data;
  } catch(e) {
    throw new Error(e.message);
  }
}

const deleteUser = async(data) => {
  try {
    await deleteUserSQL(data);
  } catch(e) {
    throw new Error(e.message);
  }
}

const createUser = async(data) => {
  try {
    await createUserSQL(data);
  } catch(e) {
    throw new Error(e.message);
  }
}

const updateUser = async(user) => {
  try {
    let data = await updateUserSQL(user);
    return data;
  } catch(e) {
    throw new Error(e.message);
  }
}

const resetpasswordUser = async(data) => {
  try {
    await resetpasswordUserSQL(data);
  } catch(e) {
    throw new Error(e.message);
  }
}

module.exports = {
  readUsers, deleteUser, createUser, updateUser, resetpasswordUser
};
