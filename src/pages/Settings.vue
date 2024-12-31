<template>
  <div class="settings-container">
    <h1>API Settings</h1>
    
    <form @submit.prevent="saveSettings" class="settings-form">
      <!-- Weaviate Section -->
      <section class="settings-section">
        <div class="section-header" @click="toggleSection('weaviate')">
          <h2>Weaviate Configuration</h2>
          <span class="toggle-icon">{{ isExpanded.weaviate ? '−' : '+' }}</span>
        </div>
        <div class="section-content" v-show="isExpanded.weaviate">
          <div class="form-group">
            <label>Host URL:</label>
            <input v-model="settings.weaviate.host" type="url" required>
          </div>
          <div class="form-group">
            <label>API Key:</label>
            <input v-model="settings.weaviate.apiKey" type="password" required>
          </div>
        </div>
      </section>

      <!-- PostgreSQL Section -->
      <section class="settings-section">
        <div class="section-header" @click="toggleSection('postgresql')">
          <h2>PostgreSQL Configuration</h2>
          <span class="toggle-icon">{{ isExpanded.postgresql ? '−' : '+' }}</span>
        </div>
        <div class="section-content" v-show="isExpanded.postgresql">
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
        </div>
      </section>

      <!-- Nextcloud Section -->
      <section class="settings-section">
        <div class="section-header" @click="toggleSection('nextcloud')">
          <h2>Nextcloud Configuration</h2>
          <span class="toggle-icon">{{ isExpanded.nextcloud ? '−' : '+' }}</span>
        </div>
        <div class="section-content" v-show="isExpanded.nextcloud">
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
        </div>
      </section>

      <!-- OpenAI Custom GPT Section -->
      <section class="settings-section">
        <div class="section-header" @click="toggleSection('openai')">
          <h2>OpenAI Custom GPT Configuration</h2>
          <span class="toggle-icon">{{ isExpanded.openai ? '−' : '+' }}</span>
        </div>
        <div class="section-content" v-show="isExpanded.openai">
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
        </div>
      </section>

      <!-- Ollama Section -->
      <section class="settings-section">
        <div class="section-header" @click="toggleSection('ollama')">
          <h2>Ollama Configuration</h2>
          <span class="toggle-icon">{{ isExpanded.ollama ? '−' : '+' }}</span>
        </div>
        <div class="section-content" v-show="isExpanded.ollama">
          <div class="form-group">
            <label>Base URL:</label>
            <input v-model="settings.ollama.baseUrl" type="url" required placeholder="http://localhost:11434">
          </div>
          <div class="form-group">
            <label>Model Name:</label>
            <input v-model="settings.ollama.model" type="text" required placeholder="llama2">
          </div>
          <div class="form-group">
            <label>System Context:</label>
            <textarea v-model="settings.ollama.systemContext" rows="3" placeholder="Optional system context for the model"></textarea>
          </div>
          <div class="form-group">
            <label>Temperature:</label>
            <input v-model="settings.ollama.temperature" type="number" step="0.1" min="0" max="1" required>
          </div>
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
        },
        ollama: {
          baseUrl: 'http://localhost:11434',
          model: 'llama2',
          systemContext: '',
          temperature: 0.7
        }
      },
      isExpanded: {
        weaviate: false,
        postgresql: false,
        nextcloud: false,
        openai: false,
        ollama: false
      }
    }
  },
  methods: {
    saveSettings() {
      // TODO: Implement API call to save settings
      console.log('Saving settings:', this.settings)
    },
    toggleSection(section) {
      this.isExpanded[section] = !this.isExpanded[section];
    }
  }
}
</script>

<style scoped>
.settings-container {
  padding: 4px;
  font-size: 1rem;
}

.settings-section {
  padding: 6px;
  margin-bottom: 6px;
}

.form-group {
  margin-bottom: 4px;
}

.form-group label {
  margin-bottom: 1px;
  font-size: 0.9rem;
}

.form-group input {
  padding: 4px 6px;
  height: 28px;
  font-size: 0.95rem;
}

h1 {
  font-size: 1.75rem;
  margin-bottom: 6px;
}

h2 {
  font-size: 1.25rem;
  margin-bottom: 6px;
}

.settings-section {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.agents-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 8px;
}

.agent-config {
  background: var(--background-dark);
  padding: 8px;
  border-radius: 6px;
}

.form-group {
  margin-bottom: 6px;
}

.form-group label {
  display: block;
  font-weight: bold;
  color: var(--text-dark);
  font-size: 0.8125rem;
}

.form-group input {
  width: 100%;
  padding: 3px 6px;
  height: 24px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 0.8125rem;
}

.form-group textarea {
  width: 100%;
  padding: 3px 6px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 0.8125rem;
  resize: vertical;
  min-height: 60px;
}

.form-actions {
  margin-top: 12px;
  text-align: right;
}

.save-button {
  background-color: var(--primary-color);
  color: white;
  padding: 4px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.875rem;
  transition: background-color 0.3s;
}

.save-button:hover {
  background-color: var(--hover-color);
}

h1 {
  font-size: 1.5rem;
  margin-bottom: 8px;
}

h2 {
  font-size: 1.25rem;
  margin-bottom: 8px;
}

h3 {
  font-size: 1rem;
  margin-bottom: 6px;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  padding: 4px;
}

.section-header:hover {
  background-color: var(--background-dark);
  border-radius: 4px;
}

.toggle-icon {
  font-size: 1.2rem;
  font-weight: bold;
  color: var(--primary-color);
  width: 20px;
  text-align: center;
}

.section-content {
  margin-top: 8px;
  transition: all 0.3s ease-in-out;
  overflow: hidden;
}
</style>