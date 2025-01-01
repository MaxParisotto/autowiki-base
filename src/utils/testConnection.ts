import { mysqlPool, redisClient, initializeConnections } from '../config/database'
import chalk from 'chalk'
import { fileURLToPath } from 'url'

console.log(chalk.blue('Starting connection tests...'))

async function testMySQLConnection() {
  console.log(chalk.yellow('Testing MySQL connection...'))
  try {
    const [result] = await mysqlPool.execute('SELECT 1 as test')
    console.log(chalk.green('✓ MySQL Connection successful'))
    console.log(chalk.gray(`  Host: ${process.env.MYSQL_HOST}`))
    console.log(chalk.gray(`  Database: ${process.env.MYSQL_DATABASE}`))
    return true
  } catch (error: any) {
    console.log(chalk.red('✗ MySQL Connection failed'))
    console.error(chalk.red(`  Error: ${error.message}`))
    if (error.code === 'ER_ACCESS_DENIED_ERROR') {
      console.log(chalk.yellow('  Hint: Check your MySQL username and password'))
    }
    return false
  }
}

async function testRedisConnection() {
  console.log(chalk.yellow('\nTesting Redis connection...'))
  try {
    // Set a timeout for the Redis connection attempt
    const timeoutPromise = new Promise((_, reject) => 
      setTimeout(() => reject(new Error('Connection timeout')), 5000)
    )
    
    // Try to connect with timeout
    await Promise.race([
      redisClient.connect(),
      timeoutPromise
    ])

    const pong = await redisClient.ping()
    console.log(chalk.green('✓ Redis Connection successful'))
    console.log(chalk.gray(`  URL: ${process.env.REDIS_URL}`))
    console.log(chalk.gray(`  Response: ${pong}`))
    await redisClient.quit()
    return true
  } catch (error: any) {
    console.log(chalk.red('✗ Redis Connection failed'))
    console.error(chalk.red(`  Error: ${error.message}`))
    if (error.code === 'ECONNREFUSED') {
      console.log(chalk.yellow('\n  Troubleshooting Redis:'))
      console.log(chalk.gray('  1. Is Redis server installed and running?'))
      console.log(chalk.gray('  2. Install Redis:'))
      console.log(chalk.gray('     - Mac: brew install redis && brew services start redis'))
      console.log(chalk.gray('     - Linux: sudo apt install redis-server'))
      console.log(chalk.gray('     - Windows: Download from https://redis.io/download'))
      console.log(chalk.gray('  3. Check if Redis is running:'))
      console.log(chalk.gray('     - Mac/Linux: redis-cli ping'))
      console.log(chalk.gray('     - Windows: redis-cli.exe ping'))
    }
    return false
  }
}

async function runConnectionTests() {
  console.log(chalk.blue('\nTesting Database Connections...\n'))
  
  try {
    await initializeConnections()
    
    const mysqlSuccess = await testMySQLConnection()
    const redisSuccess = await testRedisConnection()

    console.log('\n' + chalk.blue('Test Summary:'))
    console.log(mysqlSuccess ? chalk.green('MySQL: OK') : chalk.red('MySQL: Failed'))
    console.log(redisSuccess ? chalk.green('Redis: OK') : chalk.red('Redis: Failed'))
    
    if (!mysqlSuccess || !redisSuccess) {
      console.log(chalk.yellow('\nTroubleshooting tips:'))
      console.log(chalk.gray('1. Check if your .env file exists and has correct credentials'))
      console.log(chalk.gray('2. Verify that MySQL and Redis servers are running'))
      console.log(chalk.gray('3. Check firewall settings and port availability'))
    }

    // Exit with appropriate code
    process.exit(mysqlSuccess && redisSuccess ? 0 : 1)
  } catch (error: any) {
    console.error(chalk.red('\nConnection initialization failed:'))
    console.error(chalk.red(error.message))
    process.exit(1)
  }
}

// Ensure we catch any unhandled promise rejections
process.on('unhandledRejection', (error: any) => {
  console.error(chalk.red('Unhandled rejection:'), error.message)
  process.exit(1)
})

// Run immediately
runConnectionTests().catch(error => {
  console.error(chalk.red('Fatal error:'), error)
  process.exit(1)
})

export { runConnectionTests, testMySQLConnection, testRedisConnection }
