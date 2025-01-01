import axios from 'axios'

// Determine the base URL based on environment
const BASE_URL = import.meta.env.PROD ? '/api' : '/api'

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Add response interceptor for better error handling
api.interceptors.response.use(
  response => response,
  error => {
    console.error('API Error:', error)
    
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
