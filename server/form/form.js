const express = require('express')
const cors = require('cors')
const app = express()
const routes = require('./routes')

app.use(express.json())
app.options('*', cors())
app.use(cors())
app.use(routes, cors());
 
app.listen(9002, () => console.log('form api listening on port 9002!'));
 
module.exports = {
  app
};
 