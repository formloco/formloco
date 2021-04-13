/**
 * purpose: CRUD for tenant data
 */
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

app.use(bodyParser.json({ limit: '50mb' }))
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }))

let corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200 
}
app.use(cors(corsOptions))

app.use(routes, cors());
 
app.listen(9003, () => console.log('form app listening on port 9003!'))
app.timeout = 20000
 
module.exports = {
  app
}
 