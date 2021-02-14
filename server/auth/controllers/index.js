
const { tokenTemp, loginAuth, providerLogin, emailSignup, refreshToken } = require('../services')

const tempToken = async(req, res) => {
  try{
    let data = await tokenTemp()
    res.status(201).json(data)
  }catch(e){
    console.log(e.message)
    res.sendStatus(500)
  }
}

const authLogin = async(req, res) => {
  try{
    let data = await loginAuth(req.body)
    res.status(201).json(data)
  }catch(e){
    console.log(e.message)
    res.sendStatus(500)
  }
}

const loginProvider = async(req, res) => {
  try{
    let data = await providerLogin(req.body)
    res.status(201).json(data)
  }catch(e){
    console.log(e.message)
    res.sendStatus(500)
  }
}

const signupEmail = async(req, res) => {
  try{
    let data = await emailSignup(req.body)
    res.status(201).json(data)
  }catch(e){
    console.log(e.message)
    res.sendStatus(500)
  }
}

const tokenRefresh = async(req, res) => {
  try{
    await refreshToken(req.body)
    res.status(201).json({"message": "Subscription Updated"})
  }catch(e){
    console.log(e.message)
    res.sendStatus(500)
  }
}

module.exports = {
  tempToken, authLogin, loginProvider, signupEmail, tokenRefresh
}
