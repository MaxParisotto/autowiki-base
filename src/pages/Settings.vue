<template>
<template>
  <div class="settings-layout p-6">
    <h1 class="text-2xl font-bold mb-6 text-text-primary">Settings</h1>
    
    <div class="grid grid-cols-12 gap-6">
      <!-- Settings Navigation -->
      <div class="col-span-3">
        <nav class="space-y-2">
          <router-link 
            to="/settings/agents"
            class="block p-3 rounded-lg hover:bg-elevation-2-hover transition-colors"
            active-class="bg-elevation-2 text-accent-orange"
          >
            OpenAI Agents
          </router-link>
          <!-- Add more settings navigation items as needed -->
        </nav>
      </div>

      <!-- Settings Content -->
      <div class="col-span-9">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Settings'
}
</script>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-6 text-text-primary">Settings</h1>
    <div class="space-y-6">
      <!-- General Settings -->
      <div class="bg-elevation-2 rounded-lg p-6 border border-border-weak">
        <h2 class="text-xl font-semibold mb-4 text-text-primary">General Settings</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <!-- API Selection Cards -->
          <div v-for="api in apiServices" 
               :key="api.id"
               @click="selectApi(api.id)"
               class="bg-elevation-3 hover:bg-elevation-3-hover rounded-lg p-4 border border-border-weak transition-all duration-200 cursor-pointer"
               :class="{ 'border-accent-orange': selectedApis.includes(api.id) }">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-3">
                <component :is="api.icon" class="w-6 h-6 text-text-primary" />
                <div>
                  <h3 class="text-text-primary font-medium">{{ api.name }}</h3>
                  <p class="text-text-secondary text-sm">{{ api.description }}</p>
                </div>
              </div>
              <div class="flex items-center gap-2">
                <span class="badge" :class="api.configured ? 'badge-primary' : 'badge-secondary'">
                  {{ api.configured ? 'Configured' : 'Not Set' }}
                </span>
                <input type="checkbox" 
                       :checked="selectedApis.includes(api.id)"
                       class="bg-elevation-2 border-border-medium rounded text-accent-orange focus:ring-accent-orange">
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- API Configuration -->
      <template v-for="api in apiServices" :key="api.id">
        <div v-if="selectedApis.includes(api.id)"
             class="bg-elevation-2 rounded-lg p-6 border border-border-weak">
          <h2 class="text-xl font-semibold mb-4 text-text-primary">{{ api.name }} Configuration</h2>
          <div class="space-y-4">
            <component :is="api.configComponent" 
                      v-model="settings[api.id]"
                      @update:modelValue="updateApiConfig(api.id, $event)" />
          </div>
        </div>
      </template>

      <!-- Danger Zone -->
      <div class="bg-elevation-2 rounded-lg p-6 border border-error-text border-opacity-20">
        <h2 class="text-xl font-semibold mb-4 text-error-text">Danger Zone</h2>
        <div class="space-y-4">
          <div class="flex items-center justify-between p-4 bg-elevation-3 hover:bg-elevation-3-hover rounded-lg transition-colors">
            <div>
              <h3 class="text-text-primary font-medium">Reset All Settings</h3>
              <p class="text-text-secondary text-sm">This will reset all settings to default</p>
            </div>
            <button class="bg-error-text bg-opacity-10 hover:bg-opacity-20 text-error-text px-4 py-2 rounded-lg transition-colors font-medium">
              Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  CloudIcon,
  CommandLineIcon,
  CpuChipIcon,
  ServerIcon,
  SparklesIcon,
  UserGroupIcon
} from '@heroicons/vue/24/outline'

import WeaviateConfig from '../components/settings/WeaviateConfig.vue'
import OllamaConfig from '../components/settings/OllamaConfig.vue'
import OpenAIAgentsConfig from '../components/settings/OpenAIAgentsConfig.vue'
import OpenAICustomConfig from '../components/settings/OpenAICustomConfig.vue'
import NextcloudConfig from '../components/settings/NextcloudConfig.vue'
import RedisConfig from '../components/settings/RedisConfig.vue'

export default {
  name: "Settings",
  components: {
    WeaviateConfig,
    OllamaConfig,
    OpenAIAgentsConfig,
    OpenAICustomConfig,
    NextcloudConfig,
    RedisConfig
  },
  data() {
    return {
      selectedApis: [],
      apiServices: [
        {
          id: 'weaviate',
          name: 'Weaviate',
          description: 'Vector Database',
          icon: ServerIcon,
          configured: false,
          configComponent: 'WeaviateConfig'
        },
        {
          id: 'ollama',
          name: 'Ollama',
          description: 'Local LLM Runtime',
          icon: CpuChipIcon,
          configured: false,
          configComponent: 'OllamaConfig'
        },
        {
          id: 'openai_agents',
          name: 'OpenAI (Agents)',
          description: 'Agent LLM Provider',
          icon: UserGroupIcon,
          configured: false,
          configComponent: 'OpenAIAgentsConfig'
        },
        {
          id: 'openai_custom',
          name: 'OpenAI (Custom GPT)',
          description: 'Custom GPT Provider',
          icon: SparklesIcon,
          configured: false,
          configComponent: 'OpenAICustomConfig'
        },
        {
          id: 'nextcloud',
          name: 'Nextcloud',
          description: 'File Storage',
          icon: CloudIcon,
          configured: false,
          configComponent: 'NextcloudConfig'
        },
        {
          id: 'redis',
          name: 'Redis',
          description: 'Cache & Queue',
          icon: CommandLineIcon,
          configured: false,
          configComponent: 'RedisConfig'
        }
      ],
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
        redis: {
          host: 'localhost',
          port: 6379,
          password: '',
          db: 0,
          tls: false
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
        },
        primeDirectives: [
          { id: 1, text: "Never generate harmful or malicious content" },
          { id: 2, text: "Always maintain data privacy and security" },
          { id: 3, text: "Provide accurate and truthful information" },
          { id: 4, text: "Respect intellectual property rights" },
          { id: 5, text: "Maintain professional communication" },
          { id: 6, text: "Never impersonate humans" },
          { id: 7, text: "Acknowledge limitations and uncertainties" },
          { id: 8, text: "Prevent misuse of AI capabilities" },
          { id: 9, text: "Promote ethical AI practices" },
          { id: 10, text: "Support human decision-making, not replace it" }
        ]
      },
      isExpanded: {
        weaviate: false,
        postgresql: false,
        redis: false,
        nextcloud: false,
        openai: false,
        ollama: false,
        primeDirectives: false
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
    },
    selectApi(apiId) {
      const index = this.selectedApis.indexOf(apiId)
      if (index === -1) {
        this.selectedApis.push(apiId)
      } else {
        this.selectedApis.splice(index, 1)
      }
    },
    updateApiConfig(apiId, config) {
      this.settings[apiId] = config
      this.apiServices.find(api => api.id === apiId).configured = this.isApiConfigured(apiId)
    },
    isApiConfigured(apiId) {
      const config = this.settings[apiId]
      return config && Object.values(config).every(value => value !== '' && value !== null)
    }
  }
}
</script>

<style scoped>
.settings-container {
  padding: 4px;
  font-size: 1rem;
  max-width: 100%; /* Adjust to fit new layout */
}

.settings-section {
  padding: 6px;
  margin-bottom: 6px;
}

.form-group {
  margin-bottom: 4px;
  display: flex;
  align-items: center;
  gap: 4px;
  max-width: 400px;
}

.form-group label {
  margin: 0;
  font-size: 0.9rem;
  width: 120px;
  flex-shrink: 0;
}

.form-group input,
.form-group select {
  width: 200px;
  padding: 4px 6px;
  height: 28px;
  font-size: 0.95rem;
}

.form-group textarea {
  width: 200px;
  padding: 4px 6px;
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

/* Add styles for checkbox in form group */
.form-group input[type="checkbox"] {
  width: auto;
  height: auto;
  margin-left: 0;
}
</style>