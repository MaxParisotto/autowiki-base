<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-6 text-text-primary">Agents</h1>
    <div class="space-y-6">
      <div class="bg-elevation-2 rounded-lg p-6 border border-border-weak">
        <h2 class="text-xl font-semibold mb-4 text-text-primary">AI Agents Management</h2>
        
        <div class="agents-grid">
          <div v-for="(agent, index) in agents" 
               :key="index">
            <form 
              :id="`agent-form-${index}`"
              class="bg-elevation-3 hover:bg-elevation-3-hover rounded-lg p-4 border border-border-weak transition-all duration-200"
              @submit.prevent="saveAgent(index)"
            >
              <!-- Agent Header -->
              <div class="flex justify-between items-start mb-4">
                <div class="flex items-center gap-2">
                  <h3 class="text-text-primary font-medium">{{ agent.name || `Agent ${index + 1}` }}</h3>
                  <span class="badge" :class="agent.active ? 'badge-primary' : 'badge-secondary'">
                    {{ agent.active ? 'Active' : 'Inactive' }}
                  </span>
                </div>
                <button class="text-text-secondary hover:text-text-primary" @click="removeAgent(index)">×</button>
              </div>
    
              <!-- Form Sections -->
              <div class="space-y-4">
                <!-- Basic Configuration -->
                <div class="bg-elevation-2 rounded-lg p-4 border border-border-weak">
                  <h4 class="text-lg font-medium mb-3 text-text-primary">Basic Configuration</h4>
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
                    <PasswordField
                      :id="`agent-api-key-${index}`"
                      v-model="agent.apiKey"
                      :form-id="`agent-form-${index}`"
                      :username-value="`agent-${index}`"
                      label="API Key"
                      required
                    />
                  </div>
                  <div class="form-group">
                    <label>Model:</label>
                    <select v-model="agent.model" 
                            class="bg-elevation-3 border border-border-weak rounded-lg px-4 py-2 text-text-primary">
                      <optgroup label="GPT Models">
                        <option value="gpt-4">GPT-4</option>
                        <option value="gpt-4-turbo">GPT-4 Turbo</option>
                        <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
                      </optgroup>
                      <optgroup label="Local Models">
                        <option value="llama2">Llama 2</option>
                        <option value="mistral">Mistral</option>
                        <option value="codellama">CodeLlama</option>
                      </optgroup>
                      <optgroup label="Specialized Models">
                        <option value="claude-2">Claude 2</option>
                        <option value="palm">PaLM</option>
                      </optgroup>
                    </select>
                  </div>
                </div>

                <!-- Role Definition -->
                <div class="bg-elevation-2 rounded-lg p-4 border border-border-weak">
                  <h4 class="text-lg font-medium mb-3 text-text-primary">Role Definition</h4>
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
                <div class="bg-elevation-2 rounded-lg p-4 border border-border-weak">
                  <h4 class="text-lg font-medium mb-3 text-text-primary">Personality</h4>
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
                <div class="bg-elevation-2 rounded-lg p-4 border border-border-weak">
                  <h4 class="text-lg font-medium mb-3 text-text-primary">Context Management</h4>
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
                <div class="bg-elevation-2 rounded-lg p-4 border border-border-weak">
                  <h4 class="text-lg font-medium mb-3 text-text-primary">Prime Directives</h4>
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
                <div class="bg-elevation-2 rounded-lg p-4 border border-border-weak">
                  <h4 class="text-lg font-medium mb-3 text-text-primary">Advanced Settings</h4>
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
              <div class="mt-4">
                <button type="submit" class="save-button">
                  Save Agent
                </button>
              </div>
            </form>
          </div>
        </div>
        
        <div class="flex justify-end gap-4 mt-6">
          <button @click="addAgent" 
                  class="bg-elevation-3 hover:bg-elevation-3-hover text-text-primary px-4 py-2 rounded-lg transition-colors">
            Add Agent
          </button>
          <button @click="saveAgents" 
                  class="bg-accent-orange hover:bg-accent-orange-dark text-black px-4 py-2 rounded-lg transition-colors font-medium">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import PasswordField from '../components/PasswordField.vue';

const agents = ref([{
  name: '',
  type: 'assistant',
  endpoint: '',
  apiKey: '',
  model: 'gpt-4',
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
  directives: [1, 2, 3],
}]);

const personalityTraits = [
  { id: 'analytical', name: 'Analytical' },
  { id: 'creative', name: 'Creative' },
  { id: 'thorough', name: 'Thorough' },
  { id: 'efficient', name: 'Efficient' },
  { id: 'adaptive', name: 'Adaptive' },
  { id: 'proactive', name: 'Proactive' }
];

const primeDirectives = [
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
];

const addAgent = () => {
  agents.value.push({
    name: '',
    type: 'assistant',
    endpoint: '',
    apiKey: '',
    model: 'gpt-4',
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
    directives: [1, 2, 3],
  });
};

const removeAgent = (index: number) => {
  agents.value.splice(index, 1);
};

const addKnowledgeSource = (agent: any) => {
  agent.context.knowledgeSources.push({
    url: '',
    type: 'documentation'
  });
};

const removeKnowledgeSource = (agent: any, index: number) => {
  agent.context.knowledgeSources.splice(index, 1);
};

const saveAgents = () => {
  // TODO: Implement API call to save agents
  console.log('Saving agents:', agents.value);
};

const addTag = (agent: any) => {
  if (agent.role.expertiseTag.trim()) {
    agent.role.expertise.push(agent.role.expertiseTag.trim());
    agent.role.expertiseTag = '';
  }
};

const removeTag = (agent: any, tagToRemove: string) => {
  agent.role.expertise = agent.role.expertise.filter(tag => tag !== tagToRemove);
};

const saveAgent = (index: number) => {
  // Handle saving individual agent
  console.log('Saving agent:', agents.value[index]);
};
</script>

<style scoped>
.agents-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1rem;
}

/* Remove all other styles as they're now handled by Tailwind classes */
</style>
