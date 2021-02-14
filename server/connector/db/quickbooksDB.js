const superagent = require('superagent')
const OAuthClient = require('intuit-oauth')

let envPath = process.cwd()
envPath = envPath.slice(0, envPath.length - 4) + '/.env'
const dotenv = require('dotenv')
dotenv.config({ path: envPath })

const { Pool } = require('pg')

const pool = new Pool({
  user: process.env.DBUSER,
  host: process.env.HOST,
  database: 'user',
  password: process.env.PASSWORD,
  port: process.env.PORT
})

const freshbooksEntityConnectSQL = async (tenant_id, id, res) => {
  pool.options.database = tenant_id
  let client = await pool.connect()

  let settings = await client.query(`SELECT * FROM public.connector_settings WHERE id = ` + id)

  if (settings.rowCount !== 0) {
    oauthClient = new OAuthClient({
      clientId: settings.rows[0].client_id,
      clientSecret: settings.rows[0].client_secret,
      environment: 'sandbox',
      redirectUri: 'http://localhost:9005/quickbookscallback'
    });

    const authUri = oauthClient.authorizeUri({
      scope: [OAuthClient.scopes.Accounting, OAuthClient.scopes.OpenId],
      state: 'intuit-test'
    });

    res.status(201).send({ url: authUri })
    return
  }

}

const freshbooksEntityGetSQL = async (tenant_id, id, res) => {
  pool.options.database = tenant_id
  let client = await pool.connect()

  let settings = await client.query(`SELECT * FROM public.connector_settings WHERE id = ` + id)

  if (settings.rowCount !== 0) {
    let auth = base64encode(config.rows[0].client_id + ":" + config.rows[0].client_secret);

    superagent
      .post('https://oauth.platform.intuit.com/oauth2/v1/tokens/bearer')
      .send('grant_type=refresh_token&refresh_token=' + config.rows[0].refresh_token)
      .set('Authorization', 'Basic ' + auth)
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .end((err, res) => {
        token = res.body

        let authToken = JSON.parse(token);
        oauthClient = new OAuthClient({
          clientId: config.client_id,
          clientSecret: config.client_secret,
          environment: 'sandbox',
          redirectUri: 'http://localhost:9005/callback',
          token: authToken
        });

        if (req.query.type === 'customer')
          selectStatement = "select * from Customer";

        if (req.query.type === 'asset')
          selectStatement = "select * from Customer";

        let url = 'https://sandbox-quickbooks.api.intuit.com/v3/company/' + config.realm_id + '/query?query=' + selectStatement;
        oauthClient.makeApiCall({
          url: url,
          method: 'GET',
          headers: {
            'accept': 'application/json',
            'Content-Type': 'application'
          }
        }).then(function (response) {
          if (req.query.type === 'customer')
            res.status(201).send(response.json.QueryResponse.Customer)
        })
          .catch(function (e) {
            console.log('The error is ' + JSON.stringify(e));
          });
      });

  }

}

const freshbooksEntityCreateSQL = async (data) => {
  let client = await pool.connect()

  await client.query(`UPDATE public.file SET file_name = ` + data["file_name"] + `, description = ` + data["description"] + `WHERE id = ` + data["id"])

  client.release()
}

const freshbooksEntityUpdateSQL = async (data) => {
  let client = await pool.connect()

  await client.query(`UPDATE public.file SET date_archived = ` + data["date_archived"] + `, user_archive = ` + data["user_archive"] + `WHERE id = ` + data["id"])

  client.release()
}

const freshbooksEntityDisconnectSQL = async (data) => {
  let client = await pool.connect()

  await client.query(`UPDATE public.file SET date_archived = ` + data["date_archived"] + `, user_archive = ` + data["user_archive"] + `WHERE id = ` + data["id"])

  client.release()
}



module.exports = {
  freshbooksEntityConnectSQL, freshbooksEntityGetSQL, freshbooksEntityCreateSQL, freshbooksEntityUpdateSQL, freshbooksEntityDisconnectSQL
}
