const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const routes = require('./routes')
const cors = require('cors')
 
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

var corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200 
}
app.use(cors(corsOptions))
 
app.use(routes)
 
app.listen(9000, () => console.log('auth listening on port 9000!'))
 
module.exports = {
  app
}
 