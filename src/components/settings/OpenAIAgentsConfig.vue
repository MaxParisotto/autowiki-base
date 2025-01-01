<template>
    <div class="openai-agents-config">
        <h2>OpenAI Agents Configuration</h2>
        <form @submit.prevent="saveConfig" class="config-form">
            <div class="form-grid">
                <div class="form-group">
                    <label>OpenAI API Key</label>
                    <input 
                        v-model="apiKey"
                        :type="showApiKey ? 'text' : 'password'"
                        class="form-input"
                    />
                    <button 
                        type="button" 
                        @click="showApiKey = !showApiKey"
                        class="toggle-visibility"
                    >
                        {{ showApiKey ? 'Hide' : 'Show' }}
                    </button>
                </div>
                <div class="form-group">
                    <label>Default Model</label>
                    <select v-model="selectedModel" class="form-select">
                        <option v-for="model in availableModels" 
                                :key="model" 
                                :value="model">
                            {{ model }}
                        </option>
                    </select>
                </div>
                <div class="form-actions">
                    <button type="submit" class="btn-primary">
                        Save Configuration
                    </button>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
export default {
    name: 'OpenAIAgentsConfig',
    data() {
        return {
            apiKey: '',
            showApiKey: false,
            selectedModel: 'gpt-3.5-turbo',
            availableModels: [
                'gpt-3.5-turbo',
                'gpt-4',
                'gpt-4-turbo-preview'
            ]
        }
    },
    methods: {
        async saveConfig() {
            try {
                // Implement your save logic here
                await this.$store.dispatch('settings/saveOpenAIConfig', {
                    apiKey: this.apiKey,
                    model: this.selectedModel
                })
                this.$toast.success('OpenAI configuration saved successfully')
            } catch (error) {
                this.$toast.error('Failed to save configuration')
                console.error('Error saving OpenAI config:', error)
            }
        }
    },
    async created() {
        // Load existing configuration
        try {
            const config = await this.$store.dispatch('settings/loadOpenAIConfig')
            if (config) {
                this.apiKey = config.apiKey
                this.selectedModel = config.model
            }
        } catch (error) {
            console.error('Error loading OpenAI config:', error)
        }
    }
}
</script>

<style scoped>
.openai-agents-config {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
}

.form-grid {
    display: grid;
    gap: 1.5rem;
}

.form-group {
    display: grid;
    gap: 0.5rem;
}

.form-input, .form-select {
    @apply bg-elevation-1 border border-border-weak rounded-lg px-4 py-2;
}

.btn-primary {
    @apply bg-accent-orange hover:bg-accent-orange-dark text-black px-4 py-2 rounded-lg transition-colors;
}
</style>