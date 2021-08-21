const express = require('express')
const cors = require('cors')
const app = express()
const routes = require('./routes')

app.use(express.json({ limit: '50mb' }))
app.options('*', cors())
app.use(cors())
app.use(routes)
 
app.listen(9002, () => console.log('form app listening on port 9002!'));
 
module.exports = {
  app
};
 