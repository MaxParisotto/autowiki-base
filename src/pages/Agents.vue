<template>
  <div class="bg-elevation-1 p-6 rounded-lg">
    <h1 class="text-2xl font-bold mb-6 text-text-primary">Agents</h1>
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
                <div class="tags-input-container mb-8">
                  <div class="flex gap-2 flex-wrap mb-2">
                    <span 
                      v-for="tag in agent.role.expertise" 
                      :key="tag"
                      class="inline-flex items-center gap-1 px-3 py-1 bg-elevation-2 rounded-full"
                    >
                      {{ tag }}
                      <button 
                        @click="removeTag(agent, tag)"
                        class="text-text-secondary hover:text-text-primary"
                      >
                        ×
                      </button>
                    </span>
                  </div>
                  <div class="flex gap-2">
                    <input
                      v-model="agent.role.expertiseTag"
                      @keydown.enter.prevent="addTag(agent)"
                      placeholder="Add new tag..."
                      class="flex-1 px-4 py-2 rounded-lg"
                    />
                    <button 
                      @click="addTag(agent)"
                      class="bg-accent-orange text-black px-4 py-2 rounded-lg"
                    >
                      Add Tag
                    </button>
                  </div>
                </div>
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
  
            <!-- Prime Directives -->
            <div class="form-section">
              <h4>Prime Directives</h4>
              <div class="form-group directives-grid">
                <label v-for="directive in primeDirectives" :key="directive.id" class="directive-item">
                  <input 
                    type="checkbox" 
                    v-model="agent.directives" 
                    :value="directive.id"
                  >
                  <span class="directive-text" :title="directive.text">
                    {{directive.text}}
                  </span>
                </label>
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
          },
          directives: [1, 2, 3], // Default enabled directives
        }
      ],
      personalityTraits: [
        { id: 'analytical', name: 'Analytical' },
        { id: 'creative', name: 'Creative' },
        { id: 'thorough', name: 'Thorough' },
        { id: 'efficient', name: 'Efficient' },
        { id: 'adaptive', name: 'Adaptive' },
        { id: 'proactive', name: 'Proactive' }
      ],
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
        },
        directives: [1, 2, 3], // Default enabled directives
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
    },
    toggleSection(event) {
      const section = event.target.closest('.form-section');
      if (section) {
        section.classList.toggle('collapsed');
      }
    },
    addTag(agent) {
      if (agent.role.expertiseTag.trim()) {
        agent.role.expertise.push(agent.role.expertiseTag.trim());
        agent.role.expertiseTag = '';
      }
    },
    removeTag(agent, tagToRemove) {
      agent.role.expertise = agent.role.expertise.filter(tag => tag !== tagToRemove);
    }
  },
  mounted() {
    // Add click handlers to section headers
    const headers = document.querySelectorAll('.form-section h4');
    headers.forEach(header => {
      header.addEventListener('click', this.toggleSection);
    });
  }
}
</script>

<style scoped>
.agents-container {
  padding: 2px;
  font-size: 0.9rem;
  max-width: 100%; /* Adjust to fit new layout */
}

.agents-section {
  padding: 4px;
}

.agents-grid {
  gap: 4px;
  margin-bottom: 4px;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
}

.agent-config {
  padding: 4px;
}

.form-section {
  margin-bottom: 4px;
  padding: 4px;
  border: 1px solid #eee;
}

.form-section h4 {
  font-size: 0.9rem;
  margin: 0 0 2px 0;
  color: var(--primary-color);
  display: inline-block;
  padding: 2px 0;
}

.form-group {
  margin-bottom: 2px;
  display: flex;
  align-items: center;
  gap: 4px;
  max-width: 400px; /* Add max-width constraint */
}

.form-group label {
  margin: 0;
  font-size: 0.85rem;
  width: 120px; /* Fixed width for labels */
  flex-shrink: 0;
}

.form-group input,
.form-group select {
  height: 24px;
  padding: 2px 4px;
  font-size: 0.85rem;
  width: 200px; /* Fixed width for inputs */
  flex-shrink: 1;
}

.form-group textarea {
  width: 200px; /* Fixed width for textarea */
  padding: 2px 4px;
  font-size: 0.85rem;
  min-height: 40px;
}

/* Specific styles for knowledge sources */
.knowledge-source {
  gap: 4px;
  max-width: 400px;
}

.knowledge-source input {
  width: 200px;
}

.knowledge-source select {
  width: 120px;
}

/* Adjust traits grid */
.traits-grid {
  width: 200px;
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  padding: 2px;
}

/* Adjust range input */
input[type="range"] {
  width: 150px;
}

.range-value {
  width: 40px;
  text-align: right;
}

/* Style for switches container */
.switches {
  flex-direction: column;
  align-items: flex-start;
}

.switch {
  margin-left: 120px; /* Align with other inputs */
  font-size: 0.85rem;
}

.agent-header {
  margin-bottom: 4px;
  padding: 2px;
}

.agent-title h3 {
  font-size: 1rem;
  margin: 0;
}

.agent-status {
  font-size: 0.7rem;
  padding: 1px 4px;
}

.actions {
  margin-top: 4px;
  gap: 4px;
}

.add-button, .save-button {
  padding: 3px 8px;
  font-size: 0.85rem;
}

.remove-source {
  padding: 0 4px;
}

/* New styles for collapsible sections */
.form-section {
  position: relative;
}

.form-section h4 {
  cursor: pointer;
  user-select: none;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.form-section h4::after {
  content: '▼';
  font-size: 0.7rem;
  color: var(--primary-color);
  margin-left: 4px;
}

.form-section.collapsed h4::after {
  content: '▶';
}

.form-section.collapsed .form-group {
  display: none;
}

.directives-grid {
  display: flex;
  flex-direction: column;
  gap: 2px;
  max-height: 200px;
  overflow-y: auto;
  padding: 4px;
}

.directive-item {
  display: flex;
  align-items: flex-start;
  gap: 6px;
  font-size: 0.85rem;
  padding: 2px;
  margin: 0;
  min-width: 100%;
}

.directive-item input[type="checkbox"] {
  margin-top: 2px;
}

.directive-text {
  line-height: 1.2;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
