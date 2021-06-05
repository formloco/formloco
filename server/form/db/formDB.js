const fs = require('fs')
let envPath = process.cwd()
envPath = envPath.slice(0,envPath.length-5)+'/.env'
const dotenv = require('dotenv')
dotenv.config({ path: envPath })

const { v4: uuidv4 } = require('uuid')

const { Pool } = require('pg')

const pool = new Pool({
  user: process.env.DBUSER,
  host: process.env.HOST,
  database: '',
  password: process.env.PASSWORD,
  port: process.env.PORT
})

const formReadSQL = async (form_id, tenant_id) => {
  pool.options.database = tenant_id
  let client = await pool.connect()

  let form = await client.query(`SELECT * FROM public.form WHERE form_id = '` +  form_id + `' AND date_archived is null`)
  
  client.release()

  return form.rows[0]
}

const formsReadSQL = async (tenant_id) => {
  pool.options.database = tenant_id
  let client = await pool.connect()

  let forms = await client.query(`SELECT * FROM public.form WHERE date_archived is null AND type = 'dynamic'`)
   
  client.release()

  return forms.rows
}

const formCreateSQL = async (data) => {

  pool.options.database = data["tenant_id"]
  let client = await pool.connect()

  let formJSON = JSON.stringify(data["form"])
  let userCreated = JSON.stringify(data["user_created"])

  if (data["name"] == null) data["name"] = ''

  let form = await client.query(`INSERT INTO public.form(form_id, name, type, form, tenant_id, is_data, is_published, is_list, pin, user_created) VALUES ( '` + data["form_id"] + `', '` + data["name"] + `', '` + data["type"] + `', '` + formJSON + `', '` + data["tenant_id"] + `', ` + data["is_data"] + `, ` + data["is_published"] + `, ` + data["is_list"] + `, '` + data["form"]["pin"] + `', '` + userCreated + `') returning id`)
   
  client.release()

  return form.rows
}

const formUpdateSQL = async (data) => {
  pool.options.database = data["tenant_id"]
  let client = await pool.connect()

  let formObj = JSON.stringify(data["form"])
  let userUpdated = JSON.stringify(data["user_created"])

  if (data["date_archived"] === undefined || data["date_archived"] === null) {
    await client.query(`UPDATE public.form SET form = '` + formObj + `', user_updated = '` + userUpdated + `' WHERE form_id = '` + data["form_id"] + `'`)
  }
  else {
    let userArchived = JSON.stringify(data["user_updated"])
    await client.query(`UPDATE public.form SET form = '` + formObj + `', user_updated = '` + userUpdated + `', date_archived = '` + data["date_archived"] + `' WHERE id = ` + data["id"])
  }

  client.release()
}

const formDeleteSQL = async (data) => {
  pool.options.database = data["tenant_id"]
  let client = await pool.connect()

  await client.query(`DELETE FROM public.form WHERE form_id = '` +  data["form_id"] + `'`)

  let swaggerPath = process.cwd()
  swaggerPath = swaggerPath.slice(0,swaggerPath.length-4)+`swagger/docs/`
  fs.unlink(swaggerPath + data["tenant_id"] + `.yaml`, (err) => {
    if (err) console.log("failed to delete local image:"+err)
  })

   client.release()
}

// takes form structure from client and updates database
const formRegisterSQL = async (data) => {
  pool.options.database = data["tenant_id"]
  client = await pool.connect()

  form_id = uuidv4()
  formJSON = JSON.stringify(data["formObj"])
  columns = JSON.stringify(data["formObj"]["form"]["columns"])
  userCreated = JSON.stringify(data["user_created"])

  columns = columns.replace(/`/g, "'")
  columns = columns.replace(/"/g, "")

  await client.query(`CREATE SEQUENCE IF NOT EXISTS form_id_seq`)
  await client.query(`CREATE TABLE IF NOT EXISTS public.form ("id" int4 NOT NULL DEFAULT nextval('form_id_seq'::regclass),form_id uuid, tenant_id uuid, name varchar, form jsonb, pin varchar, date_last_access timestamp DEFAULT now(), date_created timestamp DEFAULT now(), date_archived timestamp, user_created jsonb, user_updated jsonb, user_archive int4, is_data bool, is_list bool, type varchar, is_published bool, PRIMARY KEY ("id"))`)
  await client.query(`INSERT INTO public.form(form_id, name, type, form, tenant_id, is_data, is_published, is_list, pin, user_created) VALUES ( '` + form_id + `', '` + data["name"] + `', 'custom', '` + formJSON + `', '` + data["tenant_id"] + `', ` + false + `, ` + true + `, ` + false + `, '369', '` + userCreated + `')`)  
  await client.query(`CREATE SEQUENCE IF NOT EXISTS id_seq`)
  await client.query(`CREATE TABLE IF NOT EXISTS "` + form_id + `" (` + columns + `)`)
  
  client.release()

  let obj = { form_id: form_id }

  return obj
}

const templatesReadSQL = async () => {
  pool.options.database = 'user'
  let client = await pool.connect()

  let forms = await client.query(`SELECT * FROM public.templates WHERE date_archived is null`)
   
  client.release()

  return forms.rows
}

const templateReadSQL = async (id) => {
  pool.options.database = 'user'
  let client = await pool.connect()

  let forms = await client.query(`SELECT * FROM public.templates WHERE id = ` + id)
   
  client.release()

  return forms.rows[0]
}

const templateCreateSQL = async (data) => {
  pool.options.database = 'user'
  let client = await pool.connect()

  let formObj = JSON.stringify(data["form"])
  let userCreated = JSON.stringify(data["user_created"])

  await client.query(`INSERT INTO public.templates(form, is_published, user_created) VALUES ( '` + formObj + `', '` + false + `', '` + userCreated +  `')`)
   
  client.release()
}

const templateUpdateSQL = async (data) => {
  pool.options.database = 'user'
  let client = await pool.connect()

  let userUpdated = JSON.stringify(data["user_updated"])
  let form = JSON.stringify(data["form"])

  await client.query(`UPDATE public.templates SET is_published = ` + data["is_published"] + `, form = '` + form + `', description = '` + data["description"] + `', user_updated = '` + userUpdated + `' WHERE id = ` + data["id"])
  
  client.release()
}


const templatePublishSQL = async (data) => {
  pool.options.database = 'user'
  let client = await pool.connect()

  let userUpdated = JSON.stringify(data["user_updated"])

  await client.query(`UPDATE public.templates SET is_published = ` + data["is_published"] + `, user_updated = '` + userUpdated + `' WHERE id = ` + data["id"])
  
  client.release()
}


const templateDeleteSQL = async (id) => {
  pool.options.database = 'user'
  let client = await pool.connect()

  await client.query(`DELETE FROM public.templates WHERE id = ` + id)
  
  client.release()
}

module.exports = { formReadSQL, formsReadSQL, formCreateSQL, formUpdateSQL, formDeleteSQL, templatesReadSQL, templateReadSQL, templateCreateSQL, templateUpdateSQL, templatePublishSQL, templateDeleteSQL, formRegisterSQL
}