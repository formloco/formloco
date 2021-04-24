const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()
const routes = require('./routes')

// enable pre-flight
app.use(cors())
app.options('*', cors()) 

app.use(bodyParser.json({ limit: '50mb' }))
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }))

app.use(express.static('files'))

app.use('/file',routes)

const port = 9006;
app.listen(port, () => {
  console.log('We are live on ' + port)
});
