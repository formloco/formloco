const express = require('express')
const cors = require('cors')
const app = express()
const routes = require('./routes')

app.use(express.json())
app.options('*', cors())
app.use(cors())
app.use(routes)
 
app.listen(9001, () => console.log('listening on port 9001!'));
 
module.exports = {
  app
};
 