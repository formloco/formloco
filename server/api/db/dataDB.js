let envPath = process.cwd()
envPath = envPath.slice(0, envPath.length - 4) + '/.env'
const dotenv = require('dotenv')
dotenv.config({ path: envPath })

const moment = require('moment');

const { Pool } = require('pg')

const pool = new Pool({
  user: process.env.DBUSER,
  host: process.env.HOST,
  database: '',
  password: process.env.PASSWORD,
  port: process.env.PORT
})

const dataReadSQL = async (tenant_id, form_id) => {
  pool.options.database = tenant_id
  let client = await pool.connect()

  let data = []
  let tableExist = await client.query(`SELECT EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename  = '` + form_id + `')`)

  if (tableExist.rows[0].exists) {
    let res = await client.query(`SELECT * FROM "` + form_id + `"`)
    data = res.rows
  }
console.log(data)
  return data
}

const dataCreateSQL = async (dataObj) => {
  pool.options.database = dataObj["user"]["tenant_id"]
  let client = await pool.connect()
  let obj = ``

  if (dataObj.data !== undefined) {
    dataObj.data.forEach(element => {
      obj = obj + `'` + element + `',`
    })
    obj = obj.slice(0, -1)
  }
  else obj = `'`+dataObj["user"]["email"]+`'`+','+`'`+moment().format('YYYYMMDD, h:mm:ss')+`'`;
    
  let tableExist = await client.query(`SELECT EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename  = '` + dataObj["formObj"]["form_id"] + `')`)

  // create data table
  if (!tableExist.rows[0].exists) {
    
    let formJSON = JSON.stringify(dataObj["formObj"]["form"])
    let columns = dataObj["formObj"]["form"]["columns"].replace(/`/g, "'")

    let user_created = {
      email: dataObj["user"]["email"],
      date_created: new Date()
    }
    let userCreated = JSON.stringify(user_created)

    await client.query(`INSERT INTO form(form_id, form, pin, tenant_id, is_published, is_data, user_created) VALUES ( '` + dataObj["formObj"]["form_id"] + `', '` + formJSON + `', '` + dataObj["formObj"]["pin"] + `', '` + dataObj["user"]["tenant_id"] + `', ` + dataObj["formObj"]["is_published"] + `, ` + dataObj["formObj"]["is_data"] + `, '` + userCreated + `')`)

    await client.query(`CREATE SEQUENCE IF NOT EXISTS id_seq`)

    await client.query(`CREATE TABLE IF NOT EXISTS "` + dataObj["formObj"]["form_id"] + `" (` + columns + `)`)
  }
  
  await client.query(`INSERT INTO "` + dataObj["formObj"]["form_id"] + `" (` + dataObj["columns"] + `) VALUES (` + obj + `)`)

  await client.query(`UPDATE form SET is_data = true WHERE form_id = '` + dataObj["formObj"]["form_id"] + `'`)

  let currentForm = await client.query(`SELECT * FROM form WHERE form_id = '` + dataObj["formObj"]["form_id"] + `'`)

  client.release()

  return currentForm.rows[0]
}

const dataUpdateSQL = async (data) => {
  /** not required at this time */
  pool.options.database = data["tenant_id"]
  let client = await pool.connect()

  return await client.query(`UPDATE ` + data["table_name"] + ` SET ` + data["params"] + `WHERE id = ` + data["id"])

  client.release()
}

const dataDeleteSQL = async (data) => {
  pool.options.database = data["tenant_id"]
  let client = await pool.connect()

  await client.query(`UPDATE` + data["tableName"] + `SET date_archived = ` + data["date_archived"] + `, user_archive = ` + data["user_archive"] + ` WHERE id = ` + data["id"])

  client.release()
}

module.exports = {
  dataReadSQL, dataCreateSQL, dataUpdateSQL, dataDeleteSQL
}
