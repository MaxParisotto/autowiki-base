import { defineStore } from 'pinia'
import api from '@/utils/api'

interface Settings {
  openai: {
    apiKey: string
    model: string
  }
  ollama: {
    url: string
  }
  customGpt: {
    url: string
    apiKey: string
  }
  redis: {
    url: string
    password: string
  }
  nextcloud: {
    url: string
    username: string
    password: string
  }
  rag: {
    embeddingModel: string
    vectorStore: {
      type: string
      url: string
      apiKey: string
    }
    retrieval: {
      topK: number
      similarityThreshold: number
      mmrLambda: number
    }
    chunking: {
      chunkSize: number
      chunkOverlap: number
      strategy: string
    }
  }
  database: {
    host: string
    database: string
  }
  // Add missing properties
  apiKey?: string
}

export const useSettingsStore = defineStore('settings', {
  state: () => ({
    settings: null as Settings | null,
    loading: false,
    error: null as string | null
  }),
  
  actions: {
    async loadSettings() {
      this.loading = true
      this.error = null
      try {
        const response = await api.get('/api/settings')
        this.settings = response.data
      } catch (error) {
        this.error = 'Failed to load settings'
        console.error('Error loading settings:', error)
      } finally {
        this.loading = false
      }
    }
  }
})
