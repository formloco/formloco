const fs = require('fs')
const dotenv = require('dotenv')

let envPath = process.cwd()
envPath = envPath.slice(0,envPath.length-5)+'/.env'
dotenv.config({ path: envPath })

const { Pool } = require('pg')

apiServer = 'https://bluerockmicro.com/api'

const pool = new Pool({
  user: process.env.DBUSER,
  host: process.env.HOST,
  database: 'user',
  password: process.env.PASSWORD,
  port: process.env.PORT
})

const poolTenant = new Pool({
  user: process.env.DBUSER,
  host: process.env.HOST,
  database: '',
  password: process.env.PASSWORD,
  port: process.env.PORT
})

const readShareSQL = async (data) => {
  let client = await pool.connect()

  let share = await client.query(`SELECT id, form, date_created, user_created FROM public.form WHERE tenant_id = ` + data["tenant_id"] + ` AND id = ` + data["id"] + ` AND date_archived is null`)

  client.release()

  return share.rows
}

const createShareSQL = async (data) => {

  let client = await pool.connect()
  poolTenant.options.database = data["tenant_id"]
  let clientTenant = await poolTenant.connect()

  let share_id
  let formArray = []
  let memberArray = []

  // check if share exists for user
  let userShare = await client.query(`SELECT * FROM public.share WHERE email = '` + data["email"] + `' AND tenant_id = '` + data["tenant_id"] + `'`)

  if (userShare.rowCount === 0) {
    let isTenantShare = false
    if (data["form_id"] === null) isTenantShare = true
    let user_created = JSON.stringify(data["user_created"])
    let forms = JSON.stringify([])
    share_id = await client.query(`INSERT INTO public.share(tenant_id, forms, email, is_tenant_share, role, status, user_created) VALUES ( '` + data["tenant_id"] + `', '` + forms + `', '` + data["email"] + `', '` + isTenantShare + `', '` + data["role"] + `', 'Invited', '` + user_created + `') RETURNING id`)
  }
  else share_id = userShare.rows[0].id

  let publishedForms = await clientTenant.query(`SELECT form_id FROM public.form WHERE is_published = true`)

  for (let j = 0; j < publishedForms.rows.length; j++) {
    formArray.push(publishedForms.rows[j].form_id)
  }
  /** push shared form is onto share table
   * if form_id is null, then it is a library share
   */
  if (data["form_id"]!== null) formArray.push(data["form_id"])

  let forms = JSON.stringify(formArray)
  
  await client.query(`UPDATE public.share SET forms = '` + forms + `' WHERE tenant_id = '` + data["tenant_id"] + `' AND email = '` + data["email"] + `'`)

  // update member list attached to the user
  let userTenant = await client.query(`SELECT * FROM public.user WHERE tenant_id = '` + data["tenant_id"] + `'`)

  if (userTenant.rowCount === 1) {
    memberArray = userTenant.rows[0].members

    // add library share of tenant to user that is going to be sharing the form
    if (data["form_id"] === null)
      memberArray.push({ id: share_id, form_id: null, email: data["email"], role: data["role"], status: 'Invited', date_created: new Date() })
    else
      memberArray.push({ id: share_id, form_id: data["form_id"], email: data["email"], role: data["role"], status: 'Invited', date_created: new Date() })
    
    let members = JSON.stringify(memberArray)

    await client.query(`UPDATE public.user SET members = '` + members + `' WHERE tenant_id = '` + data["tenant_id"] + `'`)
  }

  let user = await client.query(`SELECT tenant_id, first_name, last_name, email, members, settings FROM public.user WHERE tenant_id = '` + data["tenant_id"] + `'`)

  client.release()
  clientTenant.release()

  return user.rows[0]
}

const deleteShareSQL = async (data) => {

  let client = await pool.connect()

  await client.query(`DELETE FROM public.share WHERE id = ` + data.share["id"])

  if (data.user.members.length > 0) {
    let members = JSON.stringify(data.user.members)
    await client.query(`UPDATE public.user SET members = '` + members + `' WHERE tenant_id = '` + data.user["tenant_id"] + `'`)
  }
  
  client.release()

  return data.user
}

const updateShareSQL = async (data) => {

  let client = await pool.connect()

  await client.query(`UPDATE public.share SET role = '` + data["role"] + `' WHERE id = '` + data["id"] + `'`)

  let memberObj = await client.query(`SELECT members FROM public.user WHERE tenant_id = '` + data["tenant_id"] + `'`)
  let memberArray = memberObj.rows[0].members

  let idx = memberArray.findIndex(x => x.id === data["id"]);

  if (idx !== -1) {
    memberArray[idx]["role"] = data["role"]
    let members = JSON.stringify(memberArray)
    await client.query(`UPDATE public.user SET members = '` + members + `' WHERE tenant_id = '` + data["tenant_id"] + `'`)
  }
  client.release()
}

const publishShareSQL = async (data) => {
  
  let client = await pool.connect()
  poolTenant.options.database = data["tenant_id"]
  let clientTenant = await poolTenant.connect()

  returnMessage = ''

  let form = await clientTenant.query(`SELECT * FROM public.form WHERE form_id = '` + data["form_id"] + `'`)
  
  let formObj = JSON.stringify(data["form"])
  let userObj = JSON.stringify(data["user_updated"])
  let columns = data["form"]["columns"].replace(/`/g, "'")
  
  if (form.rowCount === 0)
    await clientTenant.query(`INSERT INTO public.form(form_id, form, tenant_id, is_published, user_created) VALUES ( '` + data["form_id"] + `', '` + formObj + `', '` + data["tenant_id"] + `', '` + data["is_published"] + `', '` + userObj + `')`)
  else
    await clientTenant.query(`UPDATE public.form SET is_published = ` + data["is_published"] + `, form = '` + formObj + `', user_updated = '` + userObj + `' WHERE form_id = '` + data["form_id"] + `'`)
    
  // create data table
  await clientTenant.query(`CREATE SEQUENCE IF NOT EXISTS id_seq`)

  await clientTenant.query(`CREATE TABLE IF NOT EXISTS "` + data["form_id"] + `" (` + columns + `)`)
  
  let forms = await clientTenant.query(`SELECT * FROM public.form WHERE is_published = TRUE`)
  
  /** automatically create swagger yaml doc for all forms in one tenant
   * this is run  everytime a tenant publishes a form
   * if form not published the yaml doc is deleted
   */
  let swaggerPath = process.cwd()
  swaggerPath = swaggerPath.slice(0,swaggerPath.length-5)+`swagger/docs/`

  if (forms.rowCount !== 0) {

    let tab1 = `\n  `;
    let tab2 = `\n    `;
    let tab3 = `\n      `;
    let tab4 = `\n        `;
    let tab5 = `\n          `;
    let tab6 = `\n            `;

    let yamlStr = ``
    let definitionStr = ''
    let schemaPropertyStr = ''

    let ymlHeader = `swagger: '2.0'` + `\n` + `info:` + tab1 + `description: This the API server for your forms. You will need to use a copy of the api key to authorize.` + tab1 + `version: 1.0.0` + tab1 + `title: formloco API` + tab1 + `termsOfService: https://formloco/terms/` + tab1 + `contact:` + tab2 + `email: polly@formloco.com` + tab1 + `license:` + tab2 + `name: MIT` + tab2 + `url: https://opensource.org/licenses/MIT`+ `\n` + `host: ` + apiServer + `\n` + `securityDefinitions:` + tab1 + `ApiKeyAuth:` + tab2 + `type: apiKey` + tab2 + `in: header` + tab2 + `name: x-access-token` + `\n` + `security:` + tab1 + `- ApiKeyAuth: []` + `\n` + `paths:`

    for (let j = 0; j < forms.rows.length; j++) {
  
      let yaml = tab1 + `/api/` + forms.rows[j]["tenant_id"] + `/` + forms.rows[j]["form_id"] + `/:` + tab2 
      
      + `post:` + tab3 + `tags:` + tab4 + `- ` + forms.rows[j]["form"]["name"] + tab3 + `summary: Add form data` + tab3 + `consumes:` + tab4 + `- application/json` + tab3 + `produces:` + tab4 + `- application/json` + tab3 + `parameters:` + tab4 + `- in: body` + tab5 + `name: body` + tab5 + `description: Form object` + tab5 + `required: true` + tab5 + `schema:` + tab6 + `$ref: '#/definitions/` + forms.rows[j]["form"]["name"] + `'` + tab3 + `responses:` + tab4 + `'200':` + tab5 + `description: successful operation` + tab5 + `schema:` + tab6 + `$ref: '#/definitions/` + forms.rows[j]["form"]["name"] + `'` + tab4 + `'405':` + tab5 + `description: Invalid input` + tab2 

      + `put:` + tab3 + `tags:` + tab4 + `- ` + forms.rows[j]["form"]["name"] + tab3 + `summary: Update form data` + tab3 + `consumes:` + tab4 + `- application/json` + tab3 + `produces:` + tab4 + `- application/json` + tab3 + `parameters:` + tab4 + `- in: body` + tab5 + `name: body` + tab5 + `description: Form object` + tab5 + `required: true` + tab5 + `schema:` + tab6 + `$ref: '#/definitions/` + forms.rows[j]["form"]["name"] + `'` + tab3 + `responses:` + tab4 + `'200':` + tab5 + `description: Successful operation` + tab4 + `'405':` + tab5 + `description: Invalid input` + tab2 

      + `get:` + tab3 + `tags: ` + tab4 + `- ` + forms.rows[j]["form"]["name"] + tab3 + `summary: Get form data` + tab3 + `produces: ` + tab4 + `- application/json` + tab3 + `parameters:` + tab3 + `- in: path` + tab4 + `name: tenant_id` + tab4 + `description: Form and data storage identifier` + tab4 + `schema:` + tab4 + `type: string` + tab3 + `- in: path` + tab4 + `name: form_id` + tab4 + `description: Form identifier` + tab4 + `schema:` + tab4 + `type: string` + tab3 + `- in: body` + tab4 + `required: false` + tab4 + `schema:` + tab5 + `$ref: '#/definitions/` + forms.rows[j]["form"]["name"] + `'` + tab3 + `responses:` + tab4 + `'201':` + tab5 + `description: Success` + tab2 
      
      + `delete:` + tab3 + `tags:` + tab4 + `- ` + forms.rows[j]["form"]["name"] + tab3 + `summary: Delete form data` + tab3 + `consumes:` + tab4 + `- application/json` + tab3 + `produces:` + tab4 + `- application/json` + tab3 + `parameters:` + tab4 + `- in: path` + tab5 + `name: tenant_id` + tab5 + `description: Tenant ID` + tab5 + `schema:` + tab6 + `type: string` + tab4 + `- in: path` + tab5 + `name: form_id` + tab5 + `description: Form ID` + tab5 + `schema:` + tab6 + `type: string` + tab3 + `responses:` + tab4 + `'200':` + tab5 + `description: Successful operation` + tab4 + `'405':` + tab5 + `description: Invalid input` + tab2
      
      yamlStr = yamlStr + yaml

      definitionStr = definitionStr + tab1 + forms.rows[j]["form"]["name"] + `:` + tab2 + `type: object` + tab2 + `properties:` + tab3 + forms.rows[j]["form"]["name"] + `:` + tab4 + `type: object` + tab4 + `properties:`
      
      let columns = await clientTenant.query(`SELECT column_name FROM information_schema.columns WHERE table_name = '` + forms.rows[j]["form_id"] + `'`)
     
      columns.rows.forEach(element => {
        schemaPropertyStr = schemaPropertyStr + tab5 + element["column_name"] + `:` + tab6 + `type: string`;
      })

      definitionStr =  definitionStr + schemaPropertyStr
    }

    definitionStr = `\n`+`definitions:` + definitionStr
    yamlStr = ymlHeader + yamlStr + definitionStr;

    fs.writeFileSync(swaggerPath + data["tenant_id"] + `.yaml`, yamlStr, 'utf8');
  }
  else
    fs.unlink(swaggerPath + data["tenant_id"] + `.yaml`, (err) => {
      if (err) {
          console.log("failed to delete local image:"+err);
      } else {
          console.log('successfully deleted local image');                                
      }
    })

  clientTenant.release()

  if (data["is_published"]) returnMessage = 'Form published.'
  else returnMessage = 'Form un-published.'

  return returnMessage
}

async function getColumns(formId, clientTenant) {
  return await clientTenant.query(`SELECT column_name FROM information_schema.columns WHERE table_name = '` + formId + `'`)
}

module.exports = {
  readShareSQL, createShareSQL, deleteShareSQL, updateShareSQL, publishShareSQL
}