const jwt = require('jsonwebtoken')
const bcrypt  = require('bcryptjs')

const { loginAuthSQL, providerLoginSQL, emailSignupSQL, refreshTokenSQL } = require('../db/pgDB')

const tokenTemp = async() => {
  try {
    let token = jwt.sign({ id: .369 }, process.env.SECRET, {expiresIn: 3600})
    return { token: token }
  } catch(e) {
    throw new Error(e.message)
  }
}

const loginAuth = async(data) => {
  try {
    return await loginAuthSQL(data)
  } catch(e) {
    throw new Error(e.message)
  }
}

const providerLogin = async(data) => {
  try {
    return await providerLoginSQL(data)
  } catch(e) {
    throw new Error(e.message)
  }
}

const emailSignup = async(data) => {
  try {
    return await emailSignupSQL(data)
  } catch(e) {
    throw new Error(e.message)
  }
}

const refreshToken = async(data) => {
  try {
    let token = await refreshTokenSQL(data)
    return { token: token }
  } catch(e) {
    throw new Error(e.message)
  }
}

module.exports = {
  tokenTemp, loginAuth, providerLogin, emailSignup, refreshToken
}
