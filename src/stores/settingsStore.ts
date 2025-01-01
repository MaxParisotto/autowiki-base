import { defineStore } from 'pinia'

export const useSettingsStore = defineStore('settings', {
  state: () => ({
    settings: {
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
    },
    loading: false,
    error: null as string | null
  }),

  actions: {
    async loadSettings() {
      this.loading = true
      try {
        // TODO: Replace with actual API call
        const response = await fetch('/api/settings')
        if (response.ok) {
          const data = await response.json()
          this.settings = data
        }
      } catch (err: any) {
        this.error = err.message
      } finally {
        this.loading = false
      }
    },

    async saveSettings(settings: any) {
      try {
        // TODO: Replace with actual API call
        const response = await fetch('/api/settings', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(settings)
        })
        return response.ok
      } catch (err) {
        return false
      }
    }
  }
})
