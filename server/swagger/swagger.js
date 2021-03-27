/**
 * Purpose: Serves swagger documents for form CRUD
 */
const express = require('express')
const fs = require('fs')
const app = express()
const swaggerUi = require('swagger-ui-express')
const YAML = require('yamljs')

const cors = require('cors')

const VerifyToken = require('../helper')

var corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200 
}

app.use(cors(corsOptions));

app.use('/api-docs/:token/:tenant/', VerifyToken, async function(req, res, next) {
  try {
    await fs.promises.access(`./docs/`+req.params.tenant+`.yaml`);
    req.swaggerDoc = YAML.load(`./docs/`+req.params.tenant+`.yaml`)
    next();
  } catch (error) {
   res.status(406)
   res.send('No forms published')
  }
}, swaggerUi.serve, swaggerUi.setup())

app.listen(3690, () => console.log('app listening on port 3690!'))
 