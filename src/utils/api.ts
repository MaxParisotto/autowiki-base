import axios from 'axios'

const isDev = import.meta.env.DEV

const api = axios.create({
  baseURL: '/api',
  timeout: 10000, // Increase timeout for development
  headers: {
    'Content-Type': 'application/json'
  }
})

api.interceptors.request.use(
  config => {
    if (isDev) {
      console.log('Request:', config.method?.toUpperCase(), config.url)
    }
    return config
  },
  error => {
    if (isDev) {
      console.error('Request Error:', error)
    }
    return Promise.reject(error)
  }
)

api.interceptors.response.use(
  response => {
    if (isDev) {
      console.log('Response:', response.status, response.config.url)
    }
    return response
  },
  error => {
    if (isDev) {
      console.error('Response Error:', error)
    }
    
    if (error.code === 'ERR_NETWORK') {
      error.message = 'Cannot connect to server. Please check if the backend is running.'
    } else if (error.response?.status === 500) {
      error.message = 'Internal server error. Please try again later.'
    }
    
    return Promise.reject(error)
  }
)

// Improved error handling for database tests
export const testDatabaseConnections = async () => {
  try {
    const response = await api.get('/health/db')
    if (response.status === 200 && response.data) {
      return response.data
    }
    throw new Error('Invalid response format from health check')
  } catch (error: any) {
    console.error('Database test failed:', error)
    const errorMessage = error.message || 'Connection test failed'
    return {
      mysql: { connected: false, message: 'Failed', details: errorMessage },
      redis: { connected: false, message: 'Failed', details: errorMessage }
    }
  }
}

export default api
