/**
 * Purpose: CRUD operations for user, share and sync
 */
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const routes = require('./routes')
const cors = require('cors')
 
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(cors());
 
app.use(routes, cors());
 
app.listen(9007, () => console.log('listening on port 9007!'));
 
module.exports = {
  app
};
 