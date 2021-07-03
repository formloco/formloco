const express = require('express')
const cors = require('cors')
const app = express()
const routes = require('./routes')
const loadConfig = require('../config')
loadConfig()

app.use(express.json())
app.options('*', cors())
app.use(cors())
app.use(routes)
 
app.listen(9004, () => console.log('email listening on port 9004!'))
 
module.exports = {
  app
}
 

