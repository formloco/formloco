const dotenv = require('dotenv')
const fs = require('fs')

let path = process.cwd()
envPath = path.slice(0, path.length - 5) + '/.env'
let staticPath = path.slice(0, path.length - 4) + 'http-server/'
dotenv.config({ path: envPath })

const { Pool } = require('pg')

const poolTenant = new Pool({
  user: process.env.DBUSER,
  host: process.env.HOST,
  database: '',
  password: process.env.PASSWORD,
  port: process.env.PORT
})

/** updates tenant form database
 * forms cannot be updated once data is stored, the frontend handles this logic
 * form objects are held in forms table
 * form data is stored in a table with the form_id(uuid) as its name
 * sync does not update form PIN, that is done in the form microservice
 */
const formSyncSQL = async (data) => {

  for (let j = 0; j < data.forms.length; j++) {
    if (data.forms[j].tenant_id !== undefined)
      poolTenant.options.database = data.forms[j].tenant_id
    else
      poolTenant.options.database = data.user.tenant_id

    for (let k = 0; k < data.forms[j].form.details.length; k++) {
      if (data.forms[j].form.details[k]["type"] === 'Select' || data.forms[j].form.details[k]["type"] === 'MultiSelect') {
        if (data.forms[j].form.details[k]["list"] !== 'none') {
          data.forms[j].form.details[k]["list"]["tenant_id"] = data["user"]["tenant_id"]
        }
      }
    }

    let client = await poolTenant.connect()

    let formObj = await client.query(`SELECT * FROM form WHERE form_id = '` + data.forms[j].form_id + `'`)
    if (formObj.rowCount === 0) {
      let formJSON = JSON.stringify(data.forms[j].form)
      let formUser = JSON.stringify(data.user)

      let qryStr = `INSERT INTO form(form_id, form, pin, tenant_id, is_published, is_data, user_created) VALUES ( '` + data.forms[j].form_id + `', '` + formJSON + `', '` + data.forms[j].pin + `', '` + data.forms[j].tenant_id + `', ` + data.forms[j].is_published + `, ` + data.forms[j].is_data + `, '` + formUser + `')`
      await client.query(qryStr)
    }
    else {
      let isObjectEqual = formObj.rows[0].form.controls.length == data.forms[j].form.controls.length;

      if (isObjectEqual) {
        let formJSON = JSON.stringify(data.forms[j].form)

        await client.query(`UPDATE form SET form = '` + formJSON + `' WHERE form_id = '` + data.forms[j].form_id + `'`)
      }
    }
    client.release()
  }

  poolTenant.options.database = data.user.tenant_id
  let client = await poolTenant.connect()

  let forms = await client.query(`SELECT * FROM form`)

  client.release()

  return forms.rows;
}

const importSyncSQL = async (data) => {

  poolTenant.options.database = data.tenant_id
  let client = await poolTenant.connect()

  let formJSON = JSON.stringify(data["form"])
  let formUser = JSON.stringify(data["user_created"])

  await client.query(`INSERT INTO form(form_id, form, pin, tenant_id, is_published, is_data, user_created) VALUES ( '` + data["form_id"] + `', '` + formJSON + `', '` + data["pin"] + `', '` + data["tenant_id"] + `', ` + data["is_published"] + `, ` + data["is_data"] + `, '` + formUser + `')`)

  client.release()

}

/** insert indexedDB and file upload data to db */
const dataSyncToTenantSQL = async (data) => {

  for (let j = 0; j < data.length; j++) {

    poolTenant.options.database = data[j]["tenant_id"]
    let client = await poolTenant.connect()

    /** id conflict: id is auto generated on indexDb and postgresq
     * form_id and tenant_id are redundant,form_columns is used
     * to create data table if not exist on sync
     */
    let keyArray = Object.keys(data[j])
    let valueArray = Object.values(data[j])

    let idx = keyArray.indexOf('id')
    if (idx !== -1) {
      keyArray.splice(idx, 1)
      valueArray.splice(idx, 1)
    }

    idx = keyArray.indexOf('form_id')
    if (idx !== -1) {
      keyArray.splice(idx, 1)
      valueArray.splice(idx, 1)
    }

    idx = keyArray.indexOf('tenant_id')
    if (idx !== -1) {
      keyArray.splice(idx, 1)
      valueArray.splice(idx, 1)
    }

    idx = keyArray.indexOf('form_columns')
    if (idx !== -1) {
      keyArray.splice(idx, 1)
      valueArray.splice(idx, 1)
    }

    idx = keyArray.indexOf('is_file')
    if (idx !== -1) {
      keyArray.splice(idx, 1)
      valueArray.splice(idx, 1)
    }

    idx = keyArray.indexOf('file_array')
    if (idx !== -1) {
      keyArray.splice(idx, 1)
      valueArray.splice(idx, 1)
    }

    let idxUserCreated = keyArray.indexOf('user_created')

    let valueStr = ``
    for (let i = 0; i < valueArray.length; i++) {
      if (idxUserCreated === i)
        valueStr = valueStr + `'` + JSON.stringify(data[j]["user_created"]) + `',`
      else
        valueStr = valueStr + `'` + valueArray[i] + `',`
    }

    let valStr = valueStr.slice(0, -1) // pull last comma

    let columns = data[j].form_columns.replace(/`/g, "'")

    if (data[j].file_array !== undefined) {

      for (let i = 0; i < data[j].file_array.length; i++) {

        await client.query(`INSERT INTO public.files (tenant_id, form_id, file_name, type, user_created) VALUES ('` + data[j]["tenant_id"] + `', '` + data[j]["form_id"] + `', '` + data[j]["file_array"]["name"] + `', '` + data[j]["file_array"]["type"] + `', '` + data[j]["user_created"] + `')`)

        if (!fs.existsSync(staticPath + 'files/' + data[j]["tenant_id"])) {
          fs.mkdirSync(staticPath + 'files/' + data[j]["tenant_id"] + '/', { recursive: true })
          createFile(data)
        }
        else createFile(data)

        function createFile(data) {
          fs.writeFile(staticPath + 'files/' + data[j]["tenant_id"] + '/' + data.file_array[i]["name"], data.file_array[i]["content"], (err) => {
            if (err) return err
          })
        }
      }

    }

    let dataColumns = keyArray.toString()

    // create data table
    await client.query(`CREATE SEQUENCE IF NOT EXISTS id_seq`)

    await client.query(`CREATE TABLE IF NOT EXISTS "` + data[j].form_id + `" (` + columns + `)`)

    await client.query(`INSERT INTO "` + data[j].form_id + `" (` + dataColumns + `) VALUES (` + valStr + `)`)

    client.release()

  }

}

/**
 * delete and insert data from indexedDB list, return all tenant list data
 * used on syncDataListCloud method on frontend when login
 * if no data from indexedDB just return all tenant list data
 */
const dataListTenantSyncSQL = async (listObj) => {

  let client
  
  for (let i = 0; i < listObj.data.length; i++) {

    if (listObj["tenant_id"] === listObj.data[i]["tenant_id"]) {

      poolTenant.options.database = listObj.data[i]["tenant_id"]
      let client = await poolTenant.connect()

      let columns = listObj.data[i].columns.replace(/`/g, "'")

      await client.query(`CREATE SEQUENCE IF NOT EXISTS id_seq`)

      await client.query(`CREATE TABLE IF NOT EXISTS "` + listObj.data[i]["form_id"] + `" (` + columns + `)`)

      await client.query(`DELETE FROM "` + listObj.data[i]["form_id"] + `"`)

      client.release()

    }

  }

  
  for (let j = 0; j < listObj.data.length; j++) {

    if (listObj["tenant_id"] === listObj.data[j]["tenant_id"]) {

      poolTenant.options.database = listObj["tenant_id"]
      client = await poolTenant.connect()

      let keyArray = Object.keys(listObj.data[j])
      let valueArray = Object.values(listObj.data[j])

      let idx = keyArray.indexOf('id')
      if (idx !== -1) {
        keyArray.splice(idx, 1)
        valueArray.splice(idx, 1)
      }

      let idxData = keyArray.indexOf('data')
      let idxUserCreated = keyArray.indexOf('user_created')

      let valueStr = ``
      for (let i = 0; i < valueArray.length; i++) {
        if (idxData === i)
          valueStr = valueStr + `'` + JSON.stringify(listObj.data[j]["data"]) + `',`
        else if (idxUserCreated === i)
          valueStr = valueStr + `'` + JSON.stringify(listObj.data[j]["user_created"]) + `',`
        else if (valueArray[i] === null)
          valueStr = valueStr + ` ` + valueArray[i] + `,`
        else
          valueStr = valueStr + `'` + valueArray[i] + `',`
      }

      let valStr = valueStr.slice(0, -1) // pull last comma

      let dataColumns = keyArray.toString()

      await client.query(`INSERT INTO "` + listObj.data[j].form_id + `" (` + dataColumns + `) VALUES (` + valStr + `)`)

      client.release()

    }

  }
  
  poolTenant.options.database = listObj["tenant_id"]
  client = await poolTenant.connect()

  let allForms = await client.query(`SELECT * FROM form WHERE date_archived is null`)

  let listData = []
  let lastFormID
  for (let j = 0; j < allForms.rows.length; j++) {

    if (allForms.rows[j]["form"]["is_list"]) {

      let data = await client.query(`SELECT * FROM "` + allForms.rows[j]["form_id"] + `"`)

      let obj = {
        columns: data.rows[0].columns,
        data: data.rows[0].data,
        form_id: data.rows[0].form_id,
        tenant_id: data.rows[0].tenant_id
      }
      listData.push(obj)
    }

  }

  client.release()

  return listData

}

/**
 * return all form list data used on syncDataListCloud method on frontend when login
 * used when temporary token is issued - 'copy link', 'embedded' forms
 */
const dataListFormSyncSQL = async (data) => {
 
  let listArray = []
  let lastFormID
  for (let j = 0; j < data.length; j++) {

    poolTenant.options.database = data[j]["tenant_id"]
    let client = await poolTenant.connect()

    let listData = await client.query(`SELECT * FROM "` + data[j].form_id + `"`)

    if (listData.rowCount > 0 && lastFormID !== data[j].form_id) {
      listArray = listArray.concat(listData.rows)
      lastFormID = data[j].form_id
    }

    client.release()

  }

  return listArray

}

const syncDeleteListSQL = async (formObj) => {

  poolTenant.options.database = formObj["tenant_id"]
  let client = await poolTenant.connect()

  await client.query(`DELETE FROM "` + formObj["form_id"] + `"`)
  await client.query(`DELETE FROM form WHERE form_id = '` + formObj["form_id"] + `'`)

  client.release()

}

module.exports = {
  formSyncSQL, importSyncSQL, dataSyncToTenantSQL, dataListTenantSyncSQL, dataListFormSyncSQL, syncDeleteListSQL
}