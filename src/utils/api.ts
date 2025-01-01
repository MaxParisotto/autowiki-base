import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true
})

api.interceptors.response.use(
  response => response,
  error => {
    console.error('API Error:', error)
    return Promise.reject(error)
  }
)

export const testDatabaseConnections = async () => {
  try {
    const response = await api.get('/health/db')
    return response.data
  } catch (error) {
    console.error('Database test failed:', error)
    throw error
  }
}

export default api
