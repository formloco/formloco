const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()
const routes = require('./routes')

app.use(express.json())
app.options('*', cors()) 
app.use(cors())
app.use(express.static('files'))
app.use('/file',routes)

const port = 9006;
app.listen(port, () => {
  console.log('We are live on ' + port)
});
