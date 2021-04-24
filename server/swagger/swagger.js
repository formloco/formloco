const express = require('express')
const cors = require('cors')
const fs = require('fs')
const app = express()
const swaggerUi = require('swagger-ui-express')
const YAML = require('yamljs')

const VerifyToken = require('../helper')

// enable pre-flight
app.use(cors())
app.options('*', cors()) 

app.use('/api-docs/:token/:tenant/', VerifyToken, async function(req, res, next) {
  try {
    await fs.promises.access(`./docs/`+req.params.tenant+`.yaml`)
    req.swaggerDoc = YAML.load(`./docs/`+req.params.tenant+`.yaml`)
    next()
  } catch (error) {
   res.status(406)
   res.send('No forms published')
  }
}, swaggerUi.serve, swaggerUi.setup())

app.listen(3690, () => console.log('app listening on port 3690!'))
 