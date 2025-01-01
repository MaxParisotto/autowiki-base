import { mysqlPool, redisClient } from '../config/database'
import { RowDataPacket } from 'mysql2'

export class StorageService {
  private initialized: boolean = false

  private async checkConnection() {
    if (!this.initialized) {
      try {
        // Check MySQL connection
        await mysqlPool.execute('SELECT 1')
        // Check Redis connection
        await redisClient.ping()
        this.initialized = true
      } catch (error) {
        console.error('Storage service connection check failed:', error)
        throw new Error('Storage service not properly initialized')
      }
    }
  }

  // Settings storage
  async saveSettings(userId: string, settings: any): Promise<void> {
    await this.checkConnection()
    const settingsJson = JSON.stringify(settings)
    
    // Save to Redis for quick access
    await redisClient.set(`settings:${userId}`, settingsJson)
    
    // Save to MySQL for persistence
    await mysqlPool.execute(
      'INSERT INTO user_settings (user_id, settings) VALUES (?, ?) ON DUPLICATE KEY UPDATE settings = ?',
      [userId, settingsJson, settingsJson]
    )
  }

  async getSettings(userId: string): Promise<any> {
    await this.checkConnection()
    // Try Redis first
    const cachedSettings = await redisClient.get(`settings:${userId}`)
    if (cachedSettings) {
      return JSON.parse(cachedSettings)
    }

    // Fallback to MySQL
    const [rows] = await mysqlPool.execute<RowDataPacket[]>(
      'SELECT settings FROM user_settings WHERE user_id = ?',
      [userId]
    )

    if (rows.length > 0) {
      const settings = rows[0].settings
      // Cache in Redis for next time
      await redisClient.set(`settings:${userId}`, settings)
      return JSON.parse(settings)
    }

    return null
  }

  // Vector data storage
  async saveVectorData(id: string, data: any): Promise<void> {
    await this.checkConnection()
    const dataJson = JSON.stringify(data)
    
    // Save metadata to Redis
    await redisClient.set(`vector:${id}:metadata`, dataJson)
    
    // Save to MySQL
    await mysqlPool.execute(
      'INSERT INTO vector_data (id, data, created_at) VALUES (?, ?, NOW())',
      [id, dataJson]
    )
  }

  async getVectorData(id: string): Promise<any> {
    await this.checkConnection()
    // Try Redis first
    const cachedData = await redisClient.get(`vector:${id}:metadata`)
    if (cachedData) {
      return JSON.parse(cachedData)
    }

    // Fallback to MySQL
    const [rows] = await mysqlPool.execute<RowDataPacket[]>(
      'SELECT data FROM vector_data WHERE id = ?',
      [id]
    )

    if (rows.length > 0) {
      const data = rows[0].data
      // Cache in Redis
      await redisClient.set(`vector:${id}:metadata`, data)
      return JSON.parse(data)
    }

    return null
  }

  // Cache management
  async invalidateCache(pattern: string): Promise<void> {
    await this.checkConnection()
    const keys = await redisClient.keys(pattern)
    if (keys.length > 0) {
      await redisClient.del(keys)
    }
  }
}

export const storageService = new StorageService()
