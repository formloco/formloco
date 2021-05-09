const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()
const routes = require('./routes')

// enable pre-flight
app.options('*', cors())

app.use(bodyParser.json({ limit: '50mb' }))
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }))

app.use(cors());
  
app.use(routes);
 
app.listen(9003, () => console.log('form app listening on port 9003!'))
app.timeout = 20000
 
module.exports = {
  app
}
 