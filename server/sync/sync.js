/**
 * Purpose: CRUD operations for user, share and sync
 */
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const routes = require('./routes')
const cors = require('cors')
 
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

var corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200 
}
app.use(cors(corsOptions));
 
app.use(routes);
 
app.listen(9008, () => console.log('listening on port 9008!'));
 
module.exports = {
  app
};
 