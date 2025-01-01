import { mysqlPool, redisClient } from '../config/database'
import chalk from 'chalk'

console.log(chalk.blue('Starting database connection tests...\n'))

async function testConnections() {
  try {
    // Test MySQL connection first
    console.log(chalk.yellow('Testing MySQL connection...'))
    const mysqlStartTime = Date.now()
    const [tables] = await mysqlPool.query('SHOW TABLES')
    const mysqlLatency = Date.now() - mysqlStartTime
    
    // Test Redis connection
    console.log(chalk.yellow('Testing Redis connection...'))
    const redisStartTime = Date.now()
    
    // Ensure Redis client is connected
    if (!redisClient.isOpen) {
      await redisClient.connect()
    }
    
    const pong = await redisClient.ping()
    const redisLatency = Date.now() - redisStartTime

    // Display results
    console.log(chalk.blue('\nConnection Status:'))
    console.log(chalk.green('✓ MySQL Connected'))
    console.log(chalk.gray(`  Host: ${process.env.MYSQL_HOST}`))
    console.log(chalk.gray(`  Database: ${process.env.MYSQL_DATABASE}`))
    console.log(chalk.gray(`  Tables: ${(tables as any[]).length}`))
    console.log(chalk.gray(`  Latency: ${mysqlLatency}ms`))
    
    console.log(chalk.green('\n✓ Redis Connected'))
    console.log(chalk.gray(`  Host: ${process.env.REDIS_HOST}`))
    console.log(chalk.gray(`  Port: ${process.env.REDIS_PORT}`))
    console.log(chalk.gray(`  Response: ${pong}`))
    console.log(chalk.gray(`  Latency: ${redisLatency}ms`))

    // Perform cleanup
    try {
      await redisClient.quit()
      await mysqlPool.end()
    } catch (cleanupError) {
      console.warn(chalk.yellow('Warning during cleanup:', cleanupError))
    }

    return true
  } catch (error: any) {
    console.error(chalk.red('\nConnection failed:'))
    console.error(chalk.red(`Error: ${error.message}`))
    
    // Attempt cleanup even on error
    try {
      if (redisClient.isOpen) {
        await redisClient.quit()
      }
      await mysqlPool.end()
    } catch (cleanupError) {
      console.warn(chalk.yellow('Warning during cleanup:', cleanupError))
    }
    
    return false
  }
}

// Run test with proper process handling
process.on('SIGTERM', async () => {
  console.log(chalk.yellow('\nReceived SIGTERM. Cleaning up...'))
  try {
    if (redisClient.isOpen) {
      await redisClient.quit()
    }
    await mysqlPool.end()
  } catch (error) {
    console.error('Error during cleanup:', error)
  }
  process.exit(0)
})

testConnections()
  .then(success => {
    if (success) {
      console.log(chalk.green('\nAll connection tests passed successfully'))
    } else {
      console.log(chalk.red('\nSome connection tests failed'))
      process.exit(1)
    }
  })
  .catch(error => {
    console.error(chalk.red('\nTest failed with error:'), error)
    process.exit(1)
  })
