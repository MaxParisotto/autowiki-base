import express, { Request, Response } from 'express'
import cors from 'cors'
import { config } from './config'  // Remove .js extension
import mysql from 'mysql2/promise'
import { createClient } from 'redis'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const app = express()

// Enable CORS
app.use(cors({
  origin: 'http://localhost:5173', // Allow requests from Vite dev server
  credentials: true
}))
app.use(express.json())

// Create MySQL connection pool
const pool = mysql.createPool(config.mysql)

// Create Redis client
const redis = createClient({
  url: `redis://${config.redis.host}:${config.redis.port}`,
  database: config.redis.db // Remove password since Redis auth is not configured
})

// Add more error handling for Redis
redis.on('error', (err) => {
  console.error('Redis Error:', err);
});

// Connect to Redis
redis.connect().catch(err => {
  console.error('Redis connection error:', err)
})

// Health check endpoints
app.get('/api/health/db', async (_req: Request, res: Response) => {
  try {
    const conn = await pool.getConnection()
    await conn.ping()
    conn.release()
    res.json({ status: 'ok', message: 'Database connection successful' })
  } catch (error) {
    console.error('Database health check failed:', error)
    res.status(500).json({ status: 'error', message: 'Database connection failed' })
  }
})

// Settings endpoints
app.get('/api/settings', async (_req: Request, res: Response) => {
  try {
    // Placeholder response - implement actual settings logic
    res.json({
      database: {
        host: config.mysql.host,
        database: config.mysql.database
      },
      redis: {
        host: config.redis.host,
        port: config.redis.port,
        db: config.redis.db
      }
    })
  } catch (error) {
    console.error('Failed to fetch settings:', error)
    res.status(500).json({ error: 'Failed to fetch settings' })
  }
})

// Error handling middleware
app.use((err: Error, _req: Request, res: Response) => {
  console.error('Unhandled error:', err)
  res.status(500).json({ error: 'Internal server error' })
})

// Start server
app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`)
})
