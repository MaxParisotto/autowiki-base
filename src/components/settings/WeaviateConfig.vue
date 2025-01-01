<template>
  <div class="space-y-4">
    <!-- Host Configuration -->
    <div>
      <label class="block text-text-primary mb-2">Host URL</label>
      <input type="url" 
             v-model="config.host" 
             class="w-full bg-elevation-3 border border-border-weak rounded-lg px-4 py-2 text-text-primary"
             placeholder="http://localhost:8080">
      <p class="mt-1 text-text-secondary text-sm">The URL where your Weaviate instance is running</p>
    </div>

    <!-- API Key -->
    <div>
      <label class="block text-text-primary mb-2">API Key</label>
      <div class="flex gap-2">
        <input type="password" 
               v-model="config.apiKey" 
               class="flex-1 bg-elevation-3 border border-border-weak rounded-lg px-4 py-2 text-text-primary">
        <button @click="testConnection" 
                class="bg-accent-orange hover:bg-accent-orange-dark text-black px-4 py-2 rounded-lg transition-colors font-medium">
          Test Connection
        </button>
      </div>
    </div>

    <!-- Status Display -->
    <div v-if="connectionStatus" 
         class="mt-4 p-4 rounded-lg"
         :class="{
           'bg-success-text bg-opacity-10 border border-success-text border-opacity-20': connectionStatus.success,
           'bg-error-text bg-opacity-10 border border-error-text border-opacity-20': !connectionStatus.success
         }">
      <p :class="{
           'text-success-text': connectionStatus.success,
           'text-error-text': !connectionStatus.success
         }">
        {{ connectionStatus.message }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'WeaviateConfig',
  props: {
    modelValue: {
      type: Object,
      default: () => ({
        host: 'http://localhost:8080',
        apiKey: ''
      })
    }
  },
  data() {
    return {
      connectionStatus: null
    }
  },
  computed: {
    config: {
      get() { return this.modelValue },
      set(value) { this.$emit('update:modelValue', value) }
    }
  },
  methods: {
    async testConnection() {
      try {
        // TODO: Implement connection test
        const response = await fetch(this.config.host, {
          headers: { 'Authorization': `Bearer ${this.config.apiKey}` }
        })
        
        if (response.ok) {
          this.connectionStatus = {
            success: true,
            message: 'Successfully connected to Weaviate!'
          }
        } else {
          throw new Error('Failed to connect')
        }
      } catch (error) {
        this.connectionStatus = {
          success: false,
          message: `Connection failed: ${error.message}`
        }
      }
      setTimeout(() => this.connectionStatus = null, 3000)
    }
  }
}
</script>
