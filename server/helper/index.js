const jwt = require('jsonwebtoken')
const api = { secret: 'supersecret' }
const loadSecret = require('../config')
loadSecret()

function verifyToken(req, res, next) {
  let token = req.headers['x-access-token']

  if (!token) token = req.params.token

  if (!token) 
    return res.status(403).send('No token provided.')

  jwt.verify(token, process.env.SECRET, function(err, decoded) {      
    if (err)
      return res.status(401).send('Failed to authenticate token.')

    next()
  })
}

module.exports = verifyToken