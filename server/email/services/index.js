Mailgun = require('mailgun-js')

const api_key = 'key-3020ce69e75e78e4565ad612b371c13b'
const domain  = 'mg.bluerockapps.com'
const mailgun = new Mailgun({apiKey: api_key, domain: domain})

function sendEmail(msg, req, res) {
  mailgun.messages().send(msg).then(resp => {
    res.status(201).send({message: 'Email sent to ' + req.body.email})
  })
  .catch(err => {
    res.status(500).send('Failed to send email.')
  })
}

module.exports = sendEmail