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
 
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

app.use(cors());
 
app.use(routes);
 
app.listen(9008, () => console.log('listening on port 9008!'));
 
module.exports = {
  app
};
 