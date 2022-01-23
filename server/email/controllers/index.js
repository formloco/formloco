const fs = require('fs')
const dotenv = require('dotenv')
const jwt = require('jsonwebtoken')

let envPath = process.cwd()
envPath = envPath.slice(0,envPath.length-6)+'/.env'

dotenv.config({ path: envPath })

const api = { secret: process.env.SECRET }
console.log(api)
let templatePath = process.cwd()+`/templates/footer.html`

const footer = fs.readFileSync(templatePath)

const sendEmail = require('../services')

const invite = async(req, res) => {

  const msg = {
    from:     'polly@formloco.com',
    to:       req.body.email,
    subject:  'formloco Invite',
    html:     'Welcome,'
              +'\r\n'+'<p>'+req.body.email+' has invited you to join formloco.com.</p>'
              +'\r\n'+'<p><a href="https://form369.formloco.com/signup" target=blank">Click to access.</a></p>'
              +'\r\n'+footer
  }

  sendEmail(msg, req, res)
}

const link = async(req, res) => {

  let token = jwt.sign({ id: .369 }, api.secret, {expiresIn: 3600})

  const msg = {
    from:     'polly@formloco.com',
    to:       req.body.email,
    subject:  'formloco Link Share',
    html:     'Welcome,'
              +'\r\n'+'<p>You have been invited to a formloco link share from '+req.body.email+ '</p>'
              +'\r\n'+'<p><a href="'+req.body.redirectUrl+'?token='+token+' target=blank">Click here to get access.</a></p>'
              +'\r\n'+footer
  }

  sendEmail(msg, req, res)
}

const signup = async(req, res) => {

  const msg = {
    from:     'polly@formloco.com',
    to:       req.body.email,
    subject:  'Welcome to formloco!',
    html:     'Welcome,'
              +'\r\n'+'<p>Thanks for signing up with formloco!</p>'
              +'\r\n'+footer
  }

  sendEmail(msg, req, res)

  const msgSignup = {
    from:     'polly@formloco.com',
    to:       'info@formloco.com',
    subject:  'formloco sign up!'+req.body.email,
    html:     'New sign up: ' +req.body.email
  }

  sendEmail(msgSignup, req, res)
}

const forgotPassword = async(req, res) => {

  let token = jwt.sign({ id: .369 }, api.secret, {expiresIn: 3600})

  const msg = {
    from:     'polly@formloco.com',
    to:       req.body.email,
    subject:  'formloco password reset',
    html:     '\r\n'+'<p><a href="'+req.body.redirectUrl+'?email='+req.body.email+'&token='+token+'">Click to reset password</a></p>'
              +footer
  }
  
  sendEmail(msg, req, res)
}

module.exports = {
  invite, 
  link, 
  signup, 
  forgotPassword
}