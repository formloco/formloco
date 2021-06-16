const fs = require('fs')

require("dotenv").config()
const loadConfig = require('../../config')
loadConfig()

const { Pool } = require('pg')
const pool = new Pool({
  user: 'fieldasset',
  host: "db-postgresql-nyc3-00566-do-user-1998730-0.b.db.ondigitalocean.com",
  database: '',
  password: 'fieldasset',
  port: 5432
})

// const pool = new Pool({
//   user: process.env.DBUSER,
//   host: process.env.HOST,
//   database: '',
//   password: process.env.PASSWORD,
//   port: process.env.PORT
// })

const fileGetSQL = async (tenant_id, form_id) => {

  pool.options.database = tenant_id
  let client = await pool.connect()

  let file = await client.query(`SELECT * FROM public.files WHERE tenant_id = '` + tenant_id + `' AND form_id = '` + form_id + `'`)

  return file.rows
}

const fileCreateSQL = async (data) => {

  pool.options.database = data["tenant_id"]
  let client = await pool.connect()

  for (let j = 0; j < data.file_array.length; j++) {

    let file = await client.query(`SELECT * FROM public.files WHERE tenant_id = '` + data["tenant_id"] + `' AND form_id = '` + data["form_id"] + `' AND file_name = '` + data["file_name"] + `'`)

    if (file.rowCount === 0)
      await client.query(`INSERT INTO public.files (tenant_id, form_id, file_name, type, user_created) VALUES ('` + data["tenant_id"] + `', '` + data["form_id"] + `', '` + data.file_array[j]["name"] + `', '` + data.file_array[j]["type"] + `', '` + data["user_created"] + `')`)

    if (!fs.existsSync(staticPath + data["tenant_id"] + data["form_id"]))
      fs.mkdirSync(staticPath + data["tenant_id"] + '/' + data["form_id"], { recursive: true })

    if (data.file_array[j]["content"].indexOf(',') > -1) { 
      let base64Data = data.file_array[j]["content"].split(',')
      
      fs.writeFile(staticPath + data["tenant_id"] + '/' + data["form_id"] + '/' + data.file_array[j]["name"], base64Data[1], 'base64', (err) => {
        if (err) console.log(err)
      })
    }
    
  }

  client.release()
}

const fileUpdateSQL = async (data) => {

  pool.options.database = data["tenant_id"]
  let client = await pool.connect()

  await client.query(`UPDATE public.file SET file_name = ` + data["file_name"] + `, description = ` + data["description"] + `WHERE id = ` + data["id"])

  client.release()
}

const fileDeleteSQL = async (data) => {

  pool.options.database = data["tenant_id"]
  let client = await pool.connect()

  await client.query(`UPDATE public.file SET date_archived = ` + data["date_archived"] + `, user_archive = ` + data["user_archive"] + `WHERE id = ` + data["id"])

  client.release()
}

module.exports = {
  fileGetSQL, fileCreateSQL, fileUpdateSQL, fileDeleteSQL
}
