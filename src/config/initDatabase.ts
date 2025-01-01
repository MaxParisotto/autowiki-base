import { mysqlPool } from './database'

const createDatabase = async () => {
  try {
    // Create database if it doesn't exist
    await mysqlPool.execute(`
      CREATE DATABASE IF NOT EXISTS ${process.env.MYSQL_DATABASE || 'autowiki'}
      CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci
    `)

    // Switch to the database
    await mysqlPool.execute(`USE ${process.env.MYSQL_DATABASE || 'autowiki'}`)

    // Create user_settings table
    await mysqlPool.execute(`
      CREATE TABLE IF NOT EXISTS user_settings (
        user_id VARCHAR(255) PRIMARY KEY,
        settings JSON NOT NULL,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `)

    // Create vector_data table
    await mysqlPool.execute(`
      CREATE TABLE IF NOT EXISTS vector_data (
        id VARCHAR(255) PRIMARY KEY,
        data JSON NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_created (created_at)
      )
    `)

    console.log('Database and tables initialized successfully')
  } catch (error) {
    console.error('Error initializing database:', error)
    throw error
  }
}

export const initializeDatabase = async () => {
  try {
    await createDatabase()
  } catch (error) {
    console.error('Failed to initialize database:', error)
    process.exit(1)
  }
}
