const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()
const routes = require('./routes')

// dev or prod
const loadConfig = require('../config')
loadConfig()

// enable pre-flight
app.options('*', cors())
 
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }));

app.use(cors());
  
app.use(routes);
 
app.listen(9002, () => console.log('form app listening on port 9002!'));
 
module.exports = {
  app
};
 