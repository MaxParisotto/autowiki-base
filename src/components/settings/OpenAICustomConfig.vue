<template></template>
    <div class="openai-custom-config">
        <v-card class="pa-4">
            <v-card-title>OpenAI Configuration</v-card-title>
            <v-form @submit.prevent="saveConfig">
                <v-text-field
                    v-model="config.apiKey"
                    label="API Key"
                    type="password"
                    :rules="[v => !!v || 'API Key is required']"
                />
                <v-text-field
                    v-model="config.model"
                    label="Model"
                    :rules="[v => !!v || 'Model is required']"
                />
                <v-slider
                    v-model="config.temperature"
                    label="Temperature"
                    min="0"
                    max="2"
                    step="0.1"
                    thumb-label
                />
                <v-btn type="submit" color="primary" class="mt-4">
                    Save Configuration
                </v-btn>
            </v-form>
        </v-card>
    </div>
</template>

<script>
export default {
    name: 'OpenAICustomConfig',
    data() {
        return {
            config: {
                apiKey: '',
                model: 'gpt-3.5-turbo',
                temperature: 0.7
            }
        }
    },
    methods: {
        saveConfig() {
            this.$emit('update:config', this.config)
            // You might want to add localStorage or other persistence here
            localStorage.setItem('openai-config', JSON.stringify(this.config))
        }
    },
    mounted() {
        // Load saved config if exists
        const savedConfig = localStorage.getItem('openai-config')
        if (savedConfig) {
            this.config = { ...this.config, ...JSON.parse(savedConfig) }
        }
    }
}
</script>

<style scoped>
.openai-custom-config {
    max-width: 600px;
    margin: 0 auto;
}
</style>