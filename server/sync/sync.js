const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()
const routes = require('./routes')

app.use(express.json())
app.options('*', cors())
app.use(cors())
app.use(routes)
 
app.listen(9008, () => console.log('sync api listening on port 9008!'));
 
module.exports = {
  app
};
 