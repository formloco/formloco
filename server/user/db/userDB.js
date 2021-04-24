const dotenv = require('dotenv')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

let envPath = process.cwd()
envPath = envPath.slice(0,envPath.length-5)+'/.env'
dotenv.config({ path: envPath })

const api = { secret: process.env.SECRET }
const { v4: uuidv4 } = require('uuid')

const { Pool } = require('pg')

const pool = new Pool({
  user: process.env.DBUSER,
  host: process.env.HOST,
  database: 'user',
  password: process.env.PASSWORD,
  port: process.env.PORT
})

const readUsersSQL = async (tenant_id) => {

  let client = await pool.connect()

  let allUsers = await client.query(`SELECT id, tenant_id, email, role FROM public.user WHERE date_archived IS NULL`)

  client.release()

  return allUsers.rows
}

const deleteUserSQL = async (data) => {
  let client = await pool.connect()

  await client.query(`UPDATE public.user SET date_archived = ` + new Date() + `, user_archived = ` + data["user_id"] + ` WHERE id = ` + data["id"])

  client.release()

  return res.status(201)

}

const userCreateSQL = async (data) => {
  let client = await pool.connect()

  let email = await client.query(`SELECT id FROM public.user WHERE tenant_id =  ` + data["api"] + `, AND email = ` + data["email"])

  if (email) {
    client.release()
    return res.status(403).send('Email already exists.');
  }

  await client.query(`INSERT INTO public.user(tenant_id, role, status, first_name, last_name, handle, email, user_created) VALUES ('` + data["tenant_id"] + `', '` + data["role"] + `', '` + data["status"] + `', '` + data["first_name"] + `', '` + data["last_name"] + `', '` + data["handle"] + `', '` + data["email"] + `', '` + data["user_id"] + `')`)

  client.release()

}

const updateUserSQL = async (data) => {
  
  let client = await pool.connect()

  let members = JSON.stringify(data["members"])
  let settings = JSON.stringify(data["settings"])

  await client.query(`UPDATE public.user SET first_name = ` + data["first_name"] + `, last_name = ` + data["last_name"] + `, members = '` + members + `', settings = '` + settings +`' WHERE tenant_id = '` + data["tenant_id"] + `'`)

  let user = await client.query(`SELECT id, tenant_id, email, role, members, settings FROM public.user WHERE date_archived IS NULL AND tenant_id = '` + data["tenant_id"] + `'`)

  client.release()
  return user.rows[0]

}

const resetpasswordUserSQL = async (data) => {

  let client = await pool.connect()

  let user = await client.query(`SELECT id FROM public.user WHERE email = '` + data["email"] + `'`)

  if (user.rowCount === 0) {
    client.release()
    return
  }
  
  let hashedPassword = bcrypt.hashSync(data["password"], 8)

  await client.query(`UPDATE public.user SET password = '` + hashedPassword + `' WHERE id = ` + user.rows[0].id)

  client.release()
}

module.exports = {
  readUsersSQL, deleteUserSQL, userCreateSQL, updateUserSQL, resetpasswordUserSQL
}