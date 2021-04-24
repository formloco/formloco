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

app.use(cors());
 
app.use(routes);
 
app.listen(9001, () => console.log('listening on port 9001!'));
 
module.exports = {
  app
};
 