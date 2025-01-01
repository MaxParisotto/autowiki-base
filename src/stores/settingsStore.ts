import { defineStore } from 'pinia'
import { ref } from 'vue'
import api from '../utils/api'

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
}

export const useSettingsStore = defineStore('settings', () => {
  const settings = ref({
    openai: { apiKey: '', model: '' },
    ollama: { url: '' },
    customGpt: { url: '', apiKey: '' },
    redis: { url: '', password: '' },
    nextcloud: { url: '', username: '', password: '' },
    rag: {
      embeddingModel: 'text-embedding-3-small',
      vectorStore: { type: 'weaviate', url: '', apiKey: '' },
      retrieval: { topK: 5, similarityThreshold: 0.7, mmrLambda: 0.5 },
      chunking: { chunkSize: 500, chunkOverlap: 50, strategy: 'fixed' }
    }
  })
  const loading = ref(false)
  const error = ref(null)

  async function loadSettings() {
    loading.value = true
    try {
      const response = await api.get('/settings')
      settings.value = response.data
      error.value = null
    } catch (err) {
      error.value = 'Failed to load settings'
      throw err
    } finally {
      loading.value = false
    }
  }

  async function saveSettings(newSettings: Settings) {
    loading.value = true
    try {
      await api.post('/settings', newSettings)
      settings.value = newSettings
      error.value = null
      return true
    } catch (err) {
      error.value = 'Failed to save settings'
      return false
    } finally {
      loading.value = false
    }
  }

  return {
    settings,
    loading,
    error,
    loadSettings,
    saveSettings
  }
})
