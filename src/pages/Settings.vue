<template>
  <div class="settings-container">
    <h1>API Settings</h1>
    
    <form @submit.prevent="saveSettings" class="settings-form">
      <!-- AI Agents Section -->
      <section class="settings-section">
        <h2>AI Agents Configuration</h2>
        <div class="agents-grid">
          <div v-for="(agent, index) in settings.aiAgents" :key="index" class="agent-config">
            <h3>Agent {{index + 1}}</h3>
            <div class="form-group">
              <label>Name:</label>
              <input v-model="agent.name" type="text" required>
            </div>
            <div class="form-group">
              <label>API Endpoint:</label>
              <input v-model="agent.endpoint" type="url" required>
            </div>
            <div class="form-group">
              <label>API Key:</label>
              <input v-model="agent.apiKey" type="password" required>
            </div>
          </div>
        </div>
      </section>

      <!-- Weaviate Section -->
      <section class="settings-section">
        <h2>Weaviate Configuration</h2>
        <div class="form-group">
          <label>Host URL:</label>
          <input v-model="settings.weaviate.host" type="url" required>
        </div>
        <div class="form-group">
          <label>API Key:</label>
          <input v-model="settings.weaviate.apiKey" type="password" required>
        </div>
      </section>

      <!-- PostgreSQL Section -->
      <section class="settings-section">
        <h2>PostgreSQL Configuration</h2>
        <div class="form-group">
          <label>Host:</label>
          <input v-model="settings.postgresql.host" type="text" required>
        </div>
        <div class="form-group">
          <label>Port:</label>
          <input v-model="settings.postgresql.port" type="number" required>
        </div>
        <div class="form-group">
          <label>Database:</label>
          <input v-model="settings.postgresql.database" type="text" required>
        </div>
        <div class="form-group">
          <label>Username:</label>
          <input v-model="settings.postgresql.username" type="text" required>
        </div>
        <div class="form-group">
          <label>Password:</label>
          <input v-model="settings.postgresql.password" type="password" required>
        </div>
      </section>

      <!-- Nextcloud Section -->
      <section class="settings-section">
        <h2>Nextcloud Configuration</h2>
        <div class="form-group">
          <label>Instance URL:</label>
          <input v-model="settings.nextcloud.url" type="url" required>
        </div>
        <div class="form-group">
          <label>Username:</label>
          <input v-model="settings.nextcloud.username" type="text" required>
        </div>
        <div class="form-group">
          <label>App Password:</label>
          <input v-model="settings.nextcloud.password" type="password" required>
        </div>
      </section>

      <!-- OpenAI Custom GPT Section -->
      <section class="settings-section">
        <h2>OpenAI Custom GPT Configuration</h2>
        <div class="form-group">
          <label>API Key:</label>
          <input v-model="settings.openai.apiKey" type="password" required>
        </div>
        <div class="form-group">
          <label>Model Name:</label>
          <input v-model="settings.openai.model" type="text" required>
        </div>
        <div class="form-group">
          <label>Organization ID:</label>
          <input v-model="settings.openai.orgId" type="text">
        </div>
      </section>

      <div class="form-actions">
        <button type="submit" class="save-button">Save Settings</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "Settings",
  data() {
    return {
      settings: {
        aiAgents: [
          { name: '', endpoint: '', apiKey: '' },
          { name: '', endpoint: '', apiKey: '' },
          { name: '', endpoint: '', apiKey: '' },
          { name: '', endpoint: '', apiKey: '' }
        ],
        weaviate: {
          host: '',
          apiKey: ''
        },
        postgresql: {
          host: '',
          port: 5432,
          database: '',
          username: '',
          password: ''
        },
        nextcloud: {
          url: '',
          username: '',
          password: ''
        },
        openai: {
          apiKey: '',
          model: 'gpt-4',
          orgId: ''
        }
      }
    }
  },
  methods: {
    saveSettings() {
      // TODO: Implement API call to save settings
      console.log('Saving settings:', this.settings)
    }
  }
}
</script>

<style scoped>
.settings-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.settings-section {
  background: white;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.agents-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}

.agent-config {
  background: var(--background-dark);
  padding: 15px;
  border-radius: 6px;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  color: var(--text-dark);
}

.form-group input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}

.form-actions {
  margin-top: 30px;
  text-align: right;
}

.save-button {
  background-color: var(--primary-color);
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;
}

.save-button:hover {
  background-color: var(--hover-color);
}

h1, h2 {
  color: var(--text-dark);
}

h2 {
  margin-bottom: 20px;
}
</style>