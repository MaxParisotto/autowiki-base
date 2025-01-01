import express, { Request, Response } from 'express'
import cors from 'cors'
import { config } from './config'
import mysql from 'mysql2/promise'
import { createClient } from 'redis'

const app = express()

// Enable CORS
app.use(cors())
app.use(express.json())

// Create MySQL connection pool
const pool = mysql.createPool(config.mysql)

// Create Redis client
const redis = createClient({
  socket: {
    host: config.redis.host,
    port: config.redis.port
  },
  password: config.redis.password,
  database: config.redis.db
})

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
