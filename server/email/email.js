const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()
const routes = require('./routes')

// dev or prod
const loadConfig = require('../config')
loadConfig()

// enable pre-flight
app.use(cors())
app.options('*', cors())
 
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(__dirname + '/templates'))

app.use(cors())
 
app.use(routes)
 
app.listen(9004, () => console.log('email listening on port 9004!'))
 
module.exports = {
  app
}
 

