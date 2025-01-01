import { createClient } from 'redis'
import { createPool } from 'mysql2/promise'
import dotenv from 'dotenv'

dotenv.config()

// Redis client
export const redisClient = createClient({
  url: process.env.REDIS_URL
})

redisClient.on('error', err => console.error('Redis Client Error', err))

// MySQL pool
export const mysqlPool = createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE
})

export async function initDatabases() {
  try {
    await redisClient.connect()
    await mysqlPool.getConnection()
    console.log('Database connections established')
  } catch (error) {
    console.error('Failed to initialize databases:', error)
    throw error
  }
}
