let envPath = process.cwd()
envPath = envPath.slice(0,envPath.length-10)+'/.env'

const dotenv = require('dotenv')
dotenv.config({ path: envPath })

const { Pool } = require('pg')

const pool = new Pool({
  user: process.env.DBUSER,
  host: process.env.HOST,
  database: '',
  password: process.env.PASSWORD,
  port: process.env.PORT
})

const settingReadSQL = async (tenant_id) => {
  pool.options.database = tenant_id
  let client = await pool.connect()

  let tenantTables = await client.query(`SELECT EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'connector_settings')`)

  if (!tenantTables.rows[0].exists) {
    await client.query(`CREATE SEQUENCE IF NOT EXISTS connector_settings_id_seq`)
    await client.query(`CREATE TABLE "public"."connector_settings"("id" int4 NOT NULL DEFAULT nextval('connector_settings_id_seq'::regclass),"settings" jsonb,"user_archived" jsonb,"user_created" jsonb,"user_updated" jsonb)`)
  }
    
  let settings = await client.query(`SELECT * FROM "public"."connector_settings"`)

  return settings.rows
}

const settingCreateSQL = async (data) => {
  pool.options.database = data["tenant_id"]
  let client = await pool.connect()

  let user_archived = JSON.stringify(data["user_archived"])
  let user_created = JSON.stringify(data["user_created"])
  let user_updated = JSON.stringify(data["user_updated"])
  let settingsData = JSON.stringify(data["settings"])

  await client.query(`INSERT INTO "public"."connector_settings"(settings, user_created) VALUES ( '` + settingsData + `', '` + user_created + `')`)
  
  client.release()
}

const settingUpdateSQL = async (data) => {
  pool.options.database = data["tenant_id"]
  let client = await pool.connect()

  let user_archived = JSON.stringify(data["user_archived"])
  let user_created = JSON.stringify(data["user_created"])
  let user_updated = JSON.stringify(data["user_updated"])
  let settingsData = JSON.stringify(data["settings"])

  await client.query(`UPDATE "public"."connector_settings" SET settings = '` + settingsData + `', user_updated = '` + user_updated + `' WHERE "id" = ` + data["id"])

  client.release()
}

module.exports = {
  settingReadSQL, settingCreateSQL, settingUpdateSQL
}
