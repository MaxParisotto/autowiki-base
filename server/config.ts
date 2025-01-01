import dotenv from 'dotenv'
import { resolve } from 'path'

// Load environment variables from .env file
dotenv.config({ path: resolve(__dirname, '../.env') })

// Validate required environment variables
const requiredEnvVars = [
  'REDIS_HOST',
  'REDIS_PORT',
  'MYSQL_HOST',
  'MYSQL_USER',
  'MYSQL_PASSWORD',
  'MYSQL_DATABASE'
]

for (const envVar of requiredEnvVars) {
  if (!process.env[envVar]) {
    throw new Error(`Missing required environment variable: ${envVar}`)
  }
}

export const config = {
  port: process.env.PORT || 3000,
  mysql: {
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
  },
  redis: {
    host: process.env.REDIS_HOST,
    port: parseInt(process.env.REDIS_PORT || '6379'),
    db: parseInt(process.env.REDIS_DB || '0')
  }
}

// Log config without sensitive information
console.log('Configuration:', {
  port: config.port,
  mysql: {
    host: config.mysql.host,
    database: config.mysql.database
  },
  redis: {
    host: config.redis.host,
    port: config.redis.port,
    db: config.redis.db
  }
})
