<template>
    <div class="openai-agents-config">
        <h2>OpenAI Agents Configuration</h2>
        <v-form @submit.prevent="saveConfig">
            <v-container>
                <v-row>
                    <v-col cols="12">
                        <v-text-field
                            v-model="apiKey"
                            label="OpenAI API Key"
                            :type="showApiKey ? 'text' : 'password'"
                            :append-icon="showApiKey ? 'mdi-eye-off' : 'mdi-eye'"
                            @click:append="showApiKey = !showApiKey"
                        />
                    </v-col>
                    <v-col cols="12">
                        <v-select
                            v-model="selectedModel"
                            :items="availableModels"
                            label="Default Model"
                        />
                    </v-col>
                    <v-col cols="12">
                        <v-btn color="primary" type="submit">Save Configuration</v-btn>
                    </v-col>
                </v-row>
            </v-container>
        </v-form>
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
</style></v-col>