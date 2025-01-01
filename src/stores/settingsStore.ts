import { defineStore } from 'pinia'
import { ref } from 'vue'
import api from '@/utils/api'
import type { Settings } from '../types/settings'

const defaultSettings: Settings = {
  openai: {
    apiKey: '',
    model: 'gpt-4',
  },
  ollama: {
    url: 'http://localhost:11434',
  },
  customGpt: {
    url: '',
    apiKey: '',
  },
  redis: {
    url: '',
    password: '',
  },
  nextcloud: {
    url: '',
    username: '',
    password: '',
  },
  rag: {
    embeddingModel: 'text-embedding-3-small',
    vectorStore: {
      type: 'weaviate',
      url: '',
      apiKey: '',
    },
    retrieval: {
      topK: 5,
      similarityThreshold: 0.7,
      mmrLambda: 0.5,
    },
    chunking: {
      chunkSize: 500,
      chunkOverlap: 50,
      strategy: 'paragraph',
    },
  },
}

export const useSettingsStore = defineStore('settings', () => {
  const settings = ref<Settings>({ ...defaultSettings })
  const loading = ref(false)
  const error = ref<string | null>(null)

  const loadSettings = async () => {
    loading.value = true
    error.value = null
    try {
      const response = await api.get('/api/settings')
      settings.value = response.data
    } catch (err) {
      error.value = 'Failed to load settings'
      console.error('Error loading settings:', err)
    } finally {
      loading.value = false
    }
  }

  const saveSettings = async () => {
    loading.value = true
    error.value = null
    try {
      await api.post('/api/settings', settings.value)
    } catch (err) {
      error.value = 'Failed to save settings'
      console.error('Error saving settings:', err)
    } finally {
      loading.value = false
    }
  }

  return {
    settings,
    loading,
    error,
    loadSettings,
    saveSettings,
  }
})
