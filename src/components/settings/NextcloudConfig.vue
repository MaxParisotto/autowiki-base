<template>
    <div class="nextcloud-config">
        <h2>Nextcloud Configuration</h2>
        <form @submit.prevent="saveConfig">
            <div class="form-group">
                <label for="server">Nextcloud Server URL</label>
                <input
                    type="url"
                    id="server"
                    v-model="config.serverUrl"
                    placeholder="https://your-nextcloud-instance.com"
                    required
                />
            </div>
            
            <div class="form-group">
                <label for="username">Username</label>
                <input
                    type="text"
                    id="username"
                    v-model="config.username"
                    required
                />
            </div>

            <div class="form-group">
                <label for="password">Password</label>
                <input
                    type="password"
                    id="password"
                    v-model="config.password"
                    required
                />
            </div>

            <button type="submit" :disabled="isSaving">
                {{ isSaving ? 'Saving...' : 'Save Configuration' }}
            </button>
        </form>
    </div>
</template>

<script>
export default {
    name: 'NextcloudConfig',
    data() {
        return {
            config: {
                serverUrl: '',
                username: '',
                password: ''
            },
            isSaving: false
        }
    },
    methods: {
        async saveConfig() {
            try {
                this.isSaving = true
                // TODO: Implement actual save logic here
                await this.$store.dispatch('saveNextcloudConfig', this.config)
                this.$emit('config-saved')
            } catch (error) {
                console.error('Failed to save Nextcloud config:', error)
            } finally {
                this.isSaving = false
            }
        }
    },
    async created() {
        // TODO: Load existing config if available
        const existingConfig = await this.$store.getters.nextcloudConfig
        if (existingConfig) {
            this.config = { ...existingConfig }
        }
    }
}
</script>

<style scoped>
.nextcloud-config {
    max-width: 500px;
    margin: 0 auto;
    padding: 20px;
}

.form-group {
    margin-bottom: 1rem;
}

.form-group label {
    display: block;
    margin-bottom: 0.5rem;
}

.form-group input {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
}

button {
    background-color: #0082c9;
    color: white;
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

button:disabled {
    background-color: #ccc;
    cursor: not-allowed;
}
</style></button></div>