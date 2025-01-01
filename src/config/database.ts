import mysql from 'mysql2/promise'
import { createClient } from 'redis'
import dotenv from 'dotenv'
import path from 'path'
import { initializeDatabase } from './initDatabase'

// Ensure .env is loaded from project root
dotenv.config({ path: path.resolve(process.cwd(), '.env') })

// Verify environment variables are loaded
console.log('Attempting connections with:')
console.log(`MySQL: ${process.env.MYSQL_HOST}:3306`)
console.log(`Redis: ${process.env.REDIS_URL}`)

// MySQL Configuration
export const mysqlConfig = {
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  multipleStatements: true,
  connectTimeout: 10000, // 10 seconds
  ssl: process.env.MYSQL_SSL === 'true' ? {} : undefined
}

// Redis Configuration
export const redisConfig = {
  url: process.env.REDIS_URL,
  password: process.env.REDIS_PASSWORD,
  database: parseInt(process.env.REDIS_DB || '0'),
  socket: {
    connectTimeout: 10000,
    reconnectStrategy: (retries) => {
      if (retries > 3) {
        console.error('Redis connection failed after 3 retries')
        return new Error('Redis max retries reached')
      }
      return Math.min(retries * 1000, 3000)
    }
  }
}

// Create MySQL pool with error handling
export const mysqlPool = mysql.createPool({
  ...mysqlConfig,
  socketTimeout: 10000
})

// Create Redis client
export const redisClient = createClient(redisConfig)

// Improved error handling
redisClient.on('error', (err) => {
  if (err.code === 'ECONNREFUSED') {
    console.error(`Redis connection refused at ${process.env.REDIS_URL}`)
  } else if (err.code === 'ENOTFOUND') {
    console.error(`Redis host not found at ${process.env.REDIS_URL}`)
  } else {
    console.error('Redis Client Error:', err.message)
  }
})

// Initialize connections and database
export const initializeConnections = async () => {
  try {
    // Test MySQL connection
    console.log('Testing MySQL connection...')
    await mysqlPool.execute('SELECT 1')
    console.log('MySQL connection successful')
    
    // Test Redis connection
    console.log('Testing Redis connection...')
    await redisClient.connect()
    await redisClient.ping()
    console.log('Redis connection successful')
    
    await initializeDatabase()
    console.log('Database initialization completed')
  } catch (error: any) {
    console.error('Connection initialization failed:')
    if (error.code === 'ECONNREFUSED') {
      console.error(`Connection refused. Please verify that the services are running and accessible:`)
      console.error(`MySQL: ${process.env.MYSQL_HOST}`)
      console.error(`Redis: ${process.env.REDIS_URL}`)
    } else {
      console.error(`Error: ${error.message}`)
    }
    throw error
  }
}
