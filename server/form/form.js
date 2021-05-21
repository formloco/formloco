const express = require('express')
// const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()
const routes = require('./routes')
const cors = require('../interceptors/cors')

// // enable pre-flight
// app.use(cors())
// app.options('*', cors())  
 
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }));

// handle cors
app.use((req, res, next) => { cors(res, next); })
// app.use(cors());
  
app.use(routes);
 
app.listen(9002, () => console.log('form app listening on port 9002!'));
 
module.exports = {
  app
};
 