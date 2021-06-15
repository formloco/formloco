const fs = require('fs')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

require("dotenv").config()
const loadConfig = require('../../config')
loadConfig()

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

const poolTenant = new Pool({
  user: process.env.DBUSER,
  host: process.env.HOST,
  database: '',
  password: process.env.PASSWORD,
  port: process.env.PORT
})

const loginAuthSQL = async (data) => {

  let client = await pool.connect()

  let response = await client.query(`SELECT id, password FROM public.user WHERE email = '` + data["email"] + `'`)

  client.release()
 
  if (response.rowCount > 0) {
    let passwordIsValid = bcrypt.compareSync(data["password"], response.rows[0].password)
    if (!passwordIsValid)
      return { message: 'Failed to authenticate.' }

    let token = jwt.sign({ id: response.rows[0].id }, api.secret, {
      expiresIn: 86400
    })

    let shares = await client.query(`SELECT tenant_id, forms, role, is_tenant_share FROM public.share WHERE email = '` + data["email"] + `'`)
    
    let userShares = []
    let shareRoles = []
    for (let j = 0; j < shares.rows.length; j++) {
      
      poolTenant.options.database = shares.rows[j]["tenant_id"]
      let clientTenant = await poolTenant.connect()
      
      /** if library share (is_tenant_share === true), all forms in library are shared
       * if false only the selected form is shared
      */
      if (shares.rows[j]["is_tenant_share"]) {
        let forms = await clientTenant.query(`SELECT * FROM public.form WHERE date_archived is null AND is_published is true`)

        for (let i = 0; i < forms.rows.length; i++) {
          userShares.push(forms.rows[i])
          shareRoles.push(shares.rows[j]["role"])
        }
      }
      else {
        let form = await clientTenant.query(`SELECT * FROM public.form WHERE date_archived is null AND is_published is true AND form_id = '`  + shares.rows[j]["forms"][0] + `'`)
        userShares.push(form)
        shareRoles.push(shares.rows[j]["role"])
      }
      clientTenant.release()
      
    }
       
    let user = await client.query(`SELECT tenant_id, first_name, last_name, email, role, members, settings FROM public.user WHERE id = '` + response.rows[0].id + `'`)

    user.rows[0]["share"] = userShares
    user.rows[0]["share_roles"] = shareRoles

    return {
      message: "Sign in sucessful.",
      tenant_id: user.rows[0].tenant_id,
      user: user.rows[0],
      token: token
    }
  }
  else {
    return {
      reason: "Incorrect email or password.",
      message: "Sign in unsucessful.",
    }
  }
}

// todo
const providerLoginSQL = async (data) => {
  let client = await pool.connect()

  let res = await client.query(`SELECT id FROM public.user WHERE email = '` + data["email"] + `'`)

}

const emailSignupSQL = async (data) => {

  let client = await pool.connect()

  let user = await client.query(`SELECT id FROM public.user WHERE email = '` + data["email"] + `'`)

  if (user.rowCount !== 0) {
    client.release()
    return
  }

  let tenant_id = uuidv4()

  let hashedPassword = bcrypt.hashSync(data["password"], 8)
  let settings = JSON.stringify([{isDarkMode: false}])
  let members = JSON.stringify([])

  let id = await client.query(`INSERT INTO public.user(tenant_id, role, password, email, handle, settings, members) VALUES ('` + tenant_id + `', 'Owner', '` + hashedPassword + `', '` + data["email"] + `', '` + data["handle"] + `', '` + settings + `', '` + members + `') returning id`)

  let token = jwt.sign({ id: id }, api.secret, { expiresIn: 86400 })

  // last token used to verify refresh token
  await client.query(`UPDATE public.user SET last_token = '` + token + `' WHERE id = ` + id.rows[0].id)

  let userObj = JSON.stringify({ user: 'FormlocoBot', date_created: new Date() })

  await client.query(`INSERT INTO public.tenant(tenant_id, email, user_created) VALUES ('` + tenant_id + `', '` + data["email"] + `', '` + userObj + `')`)

  await client.query(`CREATE DATABASE "` + tenant_id + `"`)

  poolTenant.options.database = tenant_id
  let clientTenant = await poolTenant.connect()

  await clientTenant.query(`CREATE SEQUENCE form_id_seq`)
  
  await clientTenant.query(`CREATE TABLE public.form ("id" int4 NOT NULL DEFAULT nextval('form_id_seq'::regclass),form_id uuid, tenant_id uuid, name varchar, form jsonb, pin varchar, date_last_access timestamp DEFAULT now(), date_created timestamp DEFAULT now(), date_archived timestamp, user_created jsonb, user_updated jsonb, user_archive int4, is_data bool, is_list bool, type varchar, is_published bool, PRIMARY KEY ("id"))`)

  await clientTenant.query(`CREATE TABLE "public"."files" ("tenant_id" uuid, "form_id" uuid, "file_name" text, "type" text, "date_created" timestamp, "date_archived" timestamp, "user_created" text)`)
  
  fs.mkdir(`../swagger/docs/`+tenant_id, function(err) {
    if (err)
      console.log(err)
  });
  user = await client.query(`SELECT tenant_id, first_name, last_name, email, handle, role, members, settings FROM public.user WHERE id = '` + id.rows[0].id + `'`)

  client.release()

  return {
    message: "Signup sucessful.",
    user: user.rows[0],
    tenant_id: tenant_id,
    token: token
  }

}

const refreshTokenSQL = async (data) => {
  let client = await pool.connect()

  let userIdToken = await client.query(`SELECT id, last_token FROM public.user WHERE tenant_id = '` + data["tenant_id"] + `'`)

  // todo: compare to token in header if equal return new token

  let token = jwt.sign({ id: userIdToken.rows[0].id }, api.secret, {
    expiresIn: 86400
  })

  let user = await client.query(`SELECT tenant_id, first_name, last_name, email, role, members, settings FROM public.user WHERE id = '` + userIdToken.rows[0].id + `'`)

  return {
    message: "Sign in sucessful.",
    user: user.rows[0],
    token: token
  }

  if (res.rowCount !== 0) {
    client.release()
    return
  }

}

module.exports = {
  loginAuthSQL, providerLoginSQL, emailSignupSQL, refreshTokenSQL
}