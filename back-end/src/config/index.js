import { merge } from 'lodash'
let envVar = ''
if (process.env.NODE_ENV === '') envVar = 'development'
else envVar = process.env.NODE_ENV

const env = envVar

const baseConfig = {
  env,
  isDev: env === 'development',
  isTest: env === 'testing',
  isProd: env === 'production',
  port: 3000
  /* secrets: {
    jwt: process.env.JWT_SECRET,
    jwtExp: '100d'
  } */
}

let envConfig = {}

switch (env) {
  case 'dev':
  case 'development':
    envConfig = require('./dev').config
    break
  case 'test':
  case 'testing':
    envConfig = require('./testing').config
    break
  case 'prod':
  case 'production':
    envConfig = require('./prod').config
    break

  default:
    envConfig = require('./dev').config
}

export default merge(baseConfig, envConfig)
