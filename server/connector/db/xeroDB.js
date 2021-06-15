const fs = require('fs')

require("dotenv").config()
const loadConfig = require('../../config')
loadConfig()
const { Pool } = require('pg')

const pool = new Pool({
  user: process.env.DBUSER,
  host: process.env.HOST,
  database: 'user',
  password: process.env.PASSWORD,
  port: process.env.PORT
})

function createDir(req) {
  if (!fs.existsSync('files/'+req.body.tenant_id+'/'+req.body.form_id+'/'+req.body.data_id+'/'))
    fs.mkdirSync('files/'+req.body.tenant_id+'/'+req.body.form_id+'/'+req.body.data_id+'/', 
    {recursive: true})
}

const fileGetSQL = async (tenant_id, form_id) => {

  let client = await pool.connect()

  let file = await client.query(`SELECT * FROM public.file WHERE tenant_id = '` + tenant_id + `' AND form_id = '` + form_id + `' AND date_archived is null`)

  return res.rows
}

const fileCreateSQL = async (data) => {
  let client = await pool.connect()
console.log(data)
  await client.query(`INSERT INTO public.file (tenant_id, data_id, form_id, file_name, type, date_created, user_created) VALUES ('` + data["tenant_id"] + `', ` + data["form_id"] + `', '` + data["file_name"] + `', '` + data["type"] + `', ` + new Date() + `, '` + user_created + `')`)

  client.release()

  fs.writeFile('files/'+req.body.tenant_id+'/'+req.body.form_id+req.body.file_name, req.body.content, (err) => {
    if (err)
      return err
  })
  
}

const fileUpdateSQL = async (data) => {
  let client = await pool.connect()

  await client.query(`UPDATE public.file SET file_name = ` + data["file_name"] + `, description = ` + data["description"] + `WHERE id = ` + data["id"])

  client.release()
}

const fileDeleteSQL = async (data) => {
  let client = await pool.connect()

  await client.query(`UPDATE public.file SET date_archived = ` + data["date_archived"] + `, user_archive = ` + data["user_archive"] + `WHERE id = ` + data["id"])

  client.release()
}

module.exports = {
  fileGetSQL, fileCreateSQL, fileUpdateSQL, fileDeleteSQL
}
