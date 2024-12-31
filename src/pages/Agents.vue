<template>
  <div class="agents-container">
    <h1>AI Agents Management</h1>
    
    <section class="agents-section">
      <div class="agents-grid">
        <div v-for="(agent, index) in agents" :key="index" class="agent-config">
          <div class="agent-header">
            <div class="agent-title">
              <h3>{{ agent.name || `Agent ${index + 1}` }}</h3>
              <span class="agent-status" :class="{ active: agent.active }">
                {{ agent.active ? 'Active' : 'Inactive' }}
              </span>
            </div>
            <button class="delete-button" @click="removeAgent(index)">×</button>
          </div>

          <!-- Basic Configuration -->
          <div class="form-section">
            <h4>Basic Configuration</h4>
            <div class="form-group">
              <label>Name:</label>
              <input v-model="agent.name" type="text" required placeholder="Agent name">
            </div>
            <div class="form-group">
              <label>Type:</label>
              <select v-model="agent.type">
                <option value="assistant">Assistant</option>
                <option value="expert">Domain Expert</option>
                <option value="researcher">Researcher</option>
                <option value="critic">Critic/Reviewer</option>
                <option value="custom">Custom</option>
              </select>
            </div>
            <div class="form-group">
              <label>API Endpoint:</label>
              <input v-model="agent.endpoint" type="url" required placeholder="https://api.example.com">
            </div>
            <div class="form-group">
              <label>API Key:</label>
              <input v-model="agent.apiKey" type="password" required>
            </div>
          </div>

          <!-- Role Definition -->
          <div class="form-section">
            <h4>Role Definition</h4>
            <div class="form-group">
              <label>Primary Role:</label>
              <input v-model="agent.role.primary" type="text" placeholder="e.g., Technical Documentation Specialist">
            </div>
            <div class="form-group">
              <label>Expertise Areas:</label>
              <vue-tags-input
                v-model="agent.role.expertiseTag"
                :tags="agent.role.expertise"
                @tags-changed="newTags => agent.role.expertise = newTags"
                placeholder="Add expertise and press enter"
              />
            </div>
          </div>

          <!-- Personality -->
          <div class="form-section">
            <h4>Personality</h4>
            <div class="form-group">
              <label>Communication Style:</label>
              <select v-model="agent.personality.communicationStyle">
                <option value="formal">Formal</option>
                <option value="casual">Casual</option>
                <option value="technical">Technical</option>
                <option value="friendly">Friendly</option>
                <option value="socratic">Socratic</option>
              </select>
            </div>
            <div class="form-group">
              <label>Traits:</label>
              <div class="traits-grid">
                <label v-for="trait in personalityTraits" :key="trait.id">
                  <input 
                    type="checkbox" 
                    v-model="agent.personality.traits" 
                    :value="trait.id"
                  >
                  {{ trait.name }}
                </label>
              </div>
            </div>
          </div>

          <!-- Context Management -->
          <div class="form-section">
            <h4>Context Management</h4>
            <div class="form-group">
              <label>System Context:</label>
              <textarea 
                v-model="agent.context.system" 
                rows="3" 
                placeholder="Define the agent's core behavior and limitations"
              ></textarea>
            </div>
            <div class="form-group">
              <label>Knowledge Base:</label>
              <div class="knowledge-sources">
                <div v-for="(source, idx) in agent.context.knowledgeSources" 
                     :key="idx" 
                     class="knowledge-source">
                  <input v-model="source.url" type="url" placeholder="Resource URL">
                  <select v-model="source.type">
                    <option value="documentation">Documentation</option>
                    <option value="api">API Reference</option>
                    <option value="guidelines">Guidelines</option>
                    <option value="examples">Examples</option>
                  </select>
                  <button @click="removeKnowledgeSource(agent, idx)" class="remove-source">×</button>
                </div>
                <button @click="addKnowledgeSource(agent)" class="add-source">+ Add Resource</button>
              </div>
            </div>
          </div>

          <!-- Advanced Settings -->
          <div class="form-section">
            <h4>Advanced Settings</h4>
            <div class="form-group">
              <label>Temperature:</label>
              <input 
                v-model="agent.settings.temperature" 
                type="range" 
                min="0" 
                max="1" 
                step="0.1"
              >
              <span class="range-value">{{ agent.settings.temperature }}</span>
            </div>
            <div class="form-group">
              <label>Max Tokens:</label>
              <input 
                v-model="agent.settings.maxTokens" 
                type="number" 
                min="100" 
                max="4000"
              >
            </div>
            <div class="form-group">
              <label>Memory Management:</label>
              <select v-model="agent.settings.memoryManagement">
                <option value="none">No Memory</option>
                <option value="conversation">Conversation History</option>
                <option value="summarized">Summarized History</option>
                <option value="selective">Selective Memory</option>
              </select>
            </div>
            <div class="form-group switches">
              <label class="switch">
                <input type="checkbox" v-model="agent.settings.learning">
                <span class="slider"></span>
                Adaptive Learning
              </label>
              <label class="switch">
                <input type="checkbox" v-model="agent.settings.collaborative">
                <span class="slider"></span>
                Collaborative Mode
              </label>
            </div>
          </div>
        </div>
      </div>
      
      <div class="actions">
        <button class="add-button" @click="addAgent">Add Agent</button>
        <button class="save-button" @click="saveAgents">Save Changes</button>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "Agents",
  data() {
    return {
      agents: [
        {
          name: '',
          type: 'assistant',
          endpoint: '',
          apiKey: '',
          active: true,
          role: {
            primary: '',
            expertise: [],
            expertiseTag: ''
          },
          personality: {
            communicationStyle: 'friendly',
            traits: []
          },
          context: {
            system: '',
            knowledgeSources: []
          },
          settings: {
            temperature: 0.7,
            maxTokens: 2000,
            memoryManagement: 'conversation',
            learning: false,
            collaborative: false
          }
        }
      ],
      personalityTraits: [
        { id: 'analytical', name: 'Analytical' },
        { id: 'creative', name: 'Creative' },
        { id: 'thorough', name: 'Thorough' },
        { id: 'efficient', name: 'Efficient' },
        { id: 'adaptive', name: 'Adaptive' },
        { id: 'proactive', name: 'Proactive' }
      ]
    }
  },
  methods: {
    addAgent() {
      this.agents.push({
        name: '',
        type: 'assistant',
        endpoint: '',
        apiKey: '',
        active: true,
        role: {
          primary: '',
          expertise: [],
          expertiseTag: ''
        },
        personality: {
          communicationStyle: 'friendly',
          traits: []
        },
        context: {
          system: '',
          knowledgeSources: []
        },
        settings: {
          temperature: 0.7,
          maxTokens: 2000,
          memoryManagement: 'conversation',
          learning: false,
          collaborative: false
        }
      });
    },
    removeAgent(index) {
      this.agents.splice(index, 1);
    },
    addKnowledgeSource(agent) {
      agent.context.knowledgeSources.push({
        url: '',
        type: 'documentation'
      });
    },
    removeKnowledgeSource(agent, index) {
      agent.context.knowledgeSources.splice(index, 1);
    },
    saveAgents() {
      // TODO: Implement API call to save agents
      console.log('Saving agents:', this.agents);
    }
  }
}
</script>

<style scoped>
.agents-container {
  padding: 4px;
  font-size: 1rem;
}

.agents-section {
  padding: 8px;
}

.agents-grid {
  gap: 8px;
  margin-bottom: 8px;
}

.agent-config {
  padding: 8px;
}

.form-section {
  margin-bottom: 8px;
  padding: 6px;
}

.form-section h4 {
  font-size: 1rem;
  margin: 0 0 4px 0;
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

.actions {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
}

.add-button, .save-button {
  padding: 4px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.875rem;
  transition: background-color 0.3s;
}

.add-button {
  background-color: var(--background-dark);
  color: var(--text-dark);
}

.save-button {
  background-color: var(--primary-color);
  color: white;
}

.add-button:hover {
  background-color: #e0e0e0;
}

.save-button:hover {
  background-color: var(--hover-color);
}

.form-section {
  margin-bottom: 16px;
  padding: 8px;
  border: 1px solid #eee;
  border-radius: 4px;
}

.form-section h4 {
  margin: 0 0 8px 0;
  font-size: 0.9rem;
  color: var(--primary-color);
}

.agent-title {
  display: flex;
  align-items: center;
  gap: 8px;
}

.agent-status {
  font-size: 0.75rem;
  padding: 2px 6px;
  border-radius: 12px;
  background-color: #ddd;
}

.agent-status.active {
  background-color: var(--active-color);
  color: white;
}

.traits-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 8px;
}

.knowledge-sources {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.knowledge-source {
  display: flex;
  gap: 8px;
}

.remove-source {
  padding: 0 8px;
  background: none;
  border: none;
  color: #666;
  cursor: pointer;
}

.remove-source:hover {
  color: #e74c3c;
}
</style>
