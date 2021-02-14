/**
 * Purpose: sign up, forgot password and sharing emails via mail gun
 */
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const routes = require('./routes')
const cors = require('cors')
 
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(__dirname + '/templates'))

var corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200 
}
app.use(cors(corsOptions))
 
app.use(routes)
 
app.listen(9004, () => console.log('email listening on port 9004!'))
 
module.exports = {
  app
}
 

