const dotenv = require('dotenv')
const express = require('express')
const bodyParser = require('body-parser')
const routes = require('./routes')
const cors = require('cors')
const app = express()

let envPath = process.cwd()
envPath = envPath.slice(0,envPath.length-4)+'/.env'

dotenv.config({ path: envPath })

const PORT = process.env.PORT
const SECRET = process.env.SECRET

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

let corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200 
}
app.use(cors(corsOptions))
  
app.use('/connector',routes)
 
app.listen(9005, () => console.log('connector listening on port 9005!'))
 
module.exports = {
  app
}
 