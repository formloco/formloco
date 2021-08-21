const express = require('express')
const cors = require('cors')
const app = express()
const routes = require('./routes')

app.use(express.json())
app.options('*', cors())
app.use(cors())
app.use(routes)
 
app.listen(9000, () => console.log('auth listening on port 9000!'))
 
module.exports = {
  app
}
 