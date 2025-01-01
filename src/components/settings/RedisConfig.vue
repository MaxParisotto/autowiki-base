<template>
    <div class="redis-config">
        <h2>Redis Configuration</h2>
        <form @submit.prevent="saveConfig">
            <div class="form-group">
                <label for="host">Host:</label>
                <input 
                    type="text" 
                    id="host" 
                    v-model="config.host" 
                    placeholder="localhost"
                    required
                >
            </div>
            
            <div class="form-group">
                <label for="port">Port:</label>
                <input 
                    type="number" 
                    id="port" 
                    v-model.number="config.port" 
                    placeholder="6379"
                    required
                >
            </div>

            <div class="form-group">
                <label for="password">Password:</label>
                <input 
                    type="password" 
                    id="password" 
                    v-model="config.password"
                    placeholder="Optional"
                >
            </div>

            <div class="form-group">
                <label for="db">Database:</label>
                <input 
                    type="number" 
                    id="db" 
                    v-model.number="config.db" 
                    placeholder="0"
                    min="0"
                    required
                >
            </div>

            <button type="submit" :disabled="isSaving">Save Configuration</button>
        </form>
    </div>
</template>

<script>
export default {
    name: 'RedisConfig',
    data() {
        return {
            config: {
                host: 'localhost',
                port: 6379,
                password: '',
                db: 0
            },
            isSaving: false
        }
    },
    methods: {
        async saveConfig() {
            this.isSaving = true
            try {
                // Replace with your actual API call
                await this.$axios.post('/api/redis/config', this.config)
                this.$emit('config-saved', this.config)
                this.$toast.success('Redis configuration saved successfully')
            } catch (error) {
                this.$toast.error('Failed to save Redis configuration')
                console.error('Redis config save error:', error)
            } finally {
                this.isSaving = false
            }
        }
    },
    async created() {
        try {
            // Replace with your actual API call
            const response = await this.$axios.get('/api/redis/config')
            this.config = { ...this.config, ...response.data }
        } catch (error) {
            console.error('Failed to load Redis config:', error)
        }
    }
}
</script>

<style scoped>
.redis-config {
    max-width: 500px;
    margin: 0 auto;
    padding: 20px;
}

.form-group {
    margin-bottom: 15px;
}

label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
}

input {
    width: 100%;
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
}

button {
    background-color: #4CAF50;
    color: white;
    padding: 10px 15px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

button:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
}

button:hover:not(:disabled) {
    background-color: #45a049;
}
</style></form></template>