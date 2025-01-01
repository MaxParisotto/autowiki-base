import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api'
})

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
