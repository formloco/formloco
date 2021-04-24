/**
 * Purpose: CRUD operations for user, share and sync
 */
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()
const routes = require('./routes')

// enable pre-flight
app.use(cors())
app.options('*', cors())  
 
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
 
app.use(routes, cors());
 
app.listen(9007, () => console.log('listening on port 9007!'));
 
module.exports = {
  app
};
 