const express = require('express')
// const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()
const routes = require('./routes')

const cors = require('../interceptors/cors')

// enable pre-flight
// app.options('*', cors())


app.use(bodyParser.json({ limit: '50mb' }))
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }))

// handle cors
app.use((req, res, next) => { cors(res, next); })

// app.use(cors());
  
app.use(routes);
 
app.listen(9003, () => console.log('form app listening on port 9003!'))
 
module.exports = {
  app
}
 