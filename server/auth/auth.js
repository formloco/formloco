const express = require('express')
const cors = require('cors')
const app = express()
const routes = require('./routes')
const loadConfig = require('../config')
loadConfig()

app.use(express.json())

let corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200
}

app.use(cors())
app.options('*', cors())

app.use(cors(corsOptions))
app.use(routes)
 
app.listen(9000, () => console.log('auth api listening on port 9000!'))
 
module.exports = {
  app
}
 