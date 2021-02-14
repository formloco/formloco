const jwt = require('jsonwebtoken')
const bcrypt  = require('bcryptjs')

let envPath = process.cwd()
envPath = envPath.slice(0,envPath.length-5)+'/.env'
const dotenv = require('dotenv')
dotenv.config({ path: envPath })

const api = { secret: process.env.SECRET }

const { loginAuthSQL, providerLoginSQL, emailSignupSQL, passwordResetSQL, refreshTokenSQL } = require('../db/pgDB')

// temporary token
const tokenTemp = async(data) => {
  try {
    let token = jwt.sign({ id: .369 }, api.secret, {expiresIn: 3600})
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
