const express = require('express')
const cors = require('cors')
const app = express()
const routes = require('./routes')
const loadConfig = require('../config')
loadConfig()

app.use(express.json())
app.options('*', cors())
app.use(cors())
app.use('/connector',routes)
 
app.listen(9005, () => console.log('connector api listening on port 9005!'))
 
module.exports = {
  app
}
 