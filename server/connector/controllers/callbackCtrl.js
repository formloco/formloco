const OAuthClient = require('intuit-oauth')

const quickbooksCallback = async(req, res) => {
  try{
    oauthClient.createToken(req.url).then(function(authResponse) {
      realmId = authResponse.token.realmId
      oauthToken = JSON.stringify(authResponse.getJson(), null, 2)
      res.redirect('/connected')
    })
  }catch(e){
    console.log(e.message)
    res.sendStatus(500)
  }
}

module.exports = {
  quickbooksCallback
}
