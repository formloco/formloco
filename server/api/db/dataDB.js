const loadConfig = require('../../config')
loadConfig()
const moment = require('moment')

const { Pool } = require('pg')

const pool = new Pool({
  user: process.env.DBUSER,
  host: process.env.HOST,
  password: process.env.PASSWORD,
  port: process.env.PORT
})


const dataReadSQL = async (tenant_id, form_id) => {
  pool.options.database = tenant_id
  let client = await pool.connect()

  let data = []
  
  let tableExist = await client.query(`SELECT EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename  = '` + form_id + `')`)

  if (tableExist.rows[0].exists) {
   let formData = await client.query(`SELECT * FROM "` + form_id + `" ORDER BY id`)
    data = formData.rows
  }
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
  else obj = `'` + dataObj["user"]["email"] + `'` + ',' + `'` + moment().format('YYYYMMDD, h:mm:ss') + `'`;

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
    
    await client.query(`INSERT INTO form(form_id, form, pin, tenant_id, is_published, is_data, user_created, type, name) VALUES ( '` + dataObj["formObj"]["form_id"] + `', '` + formJSON + `', '` + dataObj["formObj"]["form"]["pin"] + `', '` + dataObj["user"]["tenant_id"] + `', ` + dataObj["formObj"]["is_published"] + `, ` + dataObj["formObj"]["is_data"] + `, '` + userCreated + `', '` + dataObj["type"] + `', '` + dataObj["name"] + `')`)

    await client.query(`CREATE SEQUENCE IF NOT EXISTS id_seq`)

    await client.query(`CREATE TABLE IF NOT EXISTS "` + dataObj["formObj"]["form_id"] + `" (` + columns + `)`)
  
  }

  // data update
  await client.query(`INSERT INTO "` + dataObj["formObj"]["form_id"] + `" (` + dataObj["columns"] + `) VALUES (` + obj + `)`)

  await client.query(`UPDATE form SET is_data = true WHERE form_id = '` + dataObj["formObj"]["form_id"] + `'`)

  let currentForm = await client.query(`SELECT * FROM form WHERE form_id = '` + dataObj["formObj"]["form_id"] + `'`)

  client.release()

  return currentForm.rows[0]
}

const dataUpdateSQL = async (data) => {

  pool.options.database = data["tenant_id"]
  let client = await pool.connect()

  let params = + `date_updated = '` + moment().format('YYYYMMDD, h:mm:ss') + `', ` + data["params"]

  await client.query(`UPDATE "` + data["form_id"] + `" SET date_updated = '` + moment().format('YYYYMMDD, h:mm:ss') + `', ` + data["params"] + ` WHERE id = ` + data["id"])

  let updatedData = await client.query(`SELECT * FROM "` + data["form_id"] + `"`)

  client.release()

  return updatedData.rows
}

const dataDeleteSQL = async (data) => {

  pool.options.database = data["tenant_id"]
  let client = await pool.connect()

  await client.query(`DELETE FROM "` + data["form_id"] + `" WHERE id = ` + data["id"])

  let updatedData = await client.query(`SELECT * FROM "` + data["form_id"] + `"`)

  client.release()

  return updatedData.rows
}

const listsGetSQL = async (data) => {

  pool.options.database = data["tenant_id"]
  let client = await pool.connect()

  let listArray = []
  
  let lists  = await client.query(`SELECT * FROM form WHERE is_list = true`)

  for (let i = 0; i < lists.rows.length; i++) {

    let listRows = []
    
    let tableExist = await client.query(`SELECT EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename  = '` + lists.rows[i].form_id + `')`)

    if (tableExist.rows[0].exists) {
      let listData  = await client.query(`SELECT id, data FROM "` + lists.rows[i].form_id + `"`)
      listRows = listData.rows
    }
    listArray.push({name: lists.rows[i].name, form_id: lists.rows[i].form_id, rows: listRows })
  }
  client.release()

  return listArray
}

const listSaveSQL = async (dataObj) => {

  pool.options.database = dataObj["user"]["tenant_id"]
  let client = await pool.connect()
  let obj = ``

  if (dataObj.data !== undefined) {
    dataObj.data.forEach(element => {
      obj = obj + `'` + element + `',`
    })
    obj = obj.slice(0, -1)
  }
  else obj = `'` + dataObj["user"]["email"] + `'` + ',' + `'` + moment().format('YYYYMMDD, h:mm:ss') + `'`;

  let tableExist = await client.query(`SELECT EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename  = '` + dataObj["formObj"]["form_id"] + `')`)

  // create data table
  if (!tableExist.rows[0].exists) {

    let columns = dataObj["formObj"]["form"]["columns"].replace(/`/g, "'")
    
    await client.query(`CREATE SEQUENCE IF NOT EXISTS id_seq`)

    await client.query(`CREATE TABLE IF NOT EXISTS "` + dataObj["formObj"]["form_id"] + `" (` + columns + `)`)
  
  }

  // data update
  await client.query(`INSERT INTO "` + dataObj["formObj"]["form_id"] + `" (` + dataObj["columns"] + `) VALUES (` + obj + `)`)

  await client.query(`UPDATE form SET is_data = true WHERE form_id = '` + dataObj["formObj"]["form_id"] + `'`)

  let currentForm = await client.query(`SELECT * FROM form WHERE form_id = '` + dataObj["formObj"]["form_id"] + `'`)

  client.release()

  return currentForm.rows[0]
}

module.exports = { 
  dataReadSQL, dataCreateSQL, dataUpdateSQL, dataDeleteSQL, listsGetSQL, listSaveSQL
}
