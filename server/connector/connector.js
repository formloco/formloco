const express = require('express')
const cors = require('cors')
const app = express()
const routes = require('./routes')

app.use(express.json())
app.options('*', cors())
app.use(cors())
app.use(routes)

app.use(cors())
  
app.use('/connector',routes)
 
app.listen(9005, () => console.log('connector listening on port 9005!'))
 
module.exports = {
  app
}
 