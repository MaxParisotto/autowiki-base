<template>
  <div class="bg-elevation-1 p-6 rounded-lg">
    <h1 class="text-2xl font-bold mb-6 text-text-primary">Tools</h1>
    <div class="tools-container">
      <h1>AI Tools Management</h1>
      <div class="tools-grid">
        <div v-for="(tool, index) in tools" :key="index" class="tool-card">
          <div class="tool-header">
            <h3>{{ tool.name }}</h3>
            <div class="tool-actions">
              <button class="tool-status" :class="{ active: tool.active }">
                {{ tool.active ? 'Active' : 'Inactive' }}
              </button>
              <button class="delete-button" @click="removeTool(index)">×</button>
            </div>
          </div>
          
          <div class="tool-content">
            <div class="form-group">
              <label>Name:</label>
              <input v-model="tool.name" type="text" required>
            </div>
            
            <div class="form-group">
              <label>Type:</label>
              <select v-model="tool.type">
                <option value="api">API Integration</option>
                <option value="function">Function Call</option>
                <option value="script">Script Execution</option>
                <option value="database">Database Operation</option>
                <option value="custom">Custom Tool</option>
              </select>
            </div>

            <div class="form-group">
              <label>Description:</label>
              <textarea v-model="tool.description" rows="2"></textarea>
            </div>

            <div class="form-group">
              <label>Parameters:</label>
              <div class="parameters-list">
                <div v-for="(param, pIndex) in tool.parameters" :key="pIndex" class="parameter-item">
                  <input v-model="param.name" placeholder="Name" type="text">
                  <select v-model="param.type">
                    <option value="string">String</option>
                    <option value="number">Number</option>
                    <option value="boolean">Boolean</option>
                    <option value="array">Array</option>
                    <option value="object">Object</option>
                  </select>
                  <input v-model="param.description" placeholder="Description" type="text">
                  <button @click="removeParameter(tool, pIndex)" class="remove-param">×</button>
                </div>
                <button @click="addParameter(tool)" class="add-param">+ Add Parameter</button>
              </div>
            </div>

            <div class="form-group">
              <label>Required Skills:</label>
              <div class="skills-tags">
                <div v-for="(skill, sIndex) in tool.requiredSkills" :key="sIndex" class="skill-tag">
                  {{ skill }}
                  <button @click="removeSkill(tool, sIndex)" class="remove-skill">×</button>
                </div>
                <input 
                  v-model="tool.newSkill"
                  @keyup.enter="addSkill(tool)"
                  placeholder="Add skill and press enter"
                  type="text"
                >
              </div>
            </div>

            <div class="form-group">
              <label>Authentication:</label>
              <select v-model="tool.auth.type">
                <option value="none">None</option>
                <option value="api_key">API Key</option>
                <option value="oauth">OAuth</option>
                <option value="basic">Basic Auth</option>
              </select>
            </div>

            <div class="form-group" v-if="tool.auth.type !== 'none'">
              <label>Auth Config:</label>
              <textarea v-model="tool.auth.config" rows="2" placeholder="Authentication configuration"></textarea>
            </div>

            <div class="form-group">
              <label>Rate Limiting:</label>
              <div class="rate-limit-config">
                <input v-model.number="tool.rateLimit.requests" type="number" placeholder="Requests">
                <span>per</span>
                <input v-model.number="tool.rateLimit.period" type="number" placeholder="Period">
                <select v-model="tool.rateLimit.unit">
                  <option value="second">Second</option>
                  <option value="minute">Minute</option>
                  <option value="hour">Hour</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div class="add-tool-card" @click="addTool">
          <span>+ Add New Tool</span>
        </div>
      </div>

      <div class="actions">
        <button class="save-button" @click="saveTools">Save Changes</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Tools',
  data() {
    return {
      tools: [
        {
          name: '',
          type: 'api',
          description: '',
          parameters: [],
          requiredSkills: [],
          newSkill: '',
          auth: {
            type: 'none',
            config: ''
          },
          rateLimit: {
            requests: 60,
            period: 1,
            unit: 'minute'
          },
          active: true
        }
      ]
    }
  },
  methods: {
    addTool() {
      this.tools.push({
        name: '',
        type: 'api',
        description: '',
        parameters: [],
        requiredSkills: [],
        newSkill: '',
        auth: {
          type: 'none',
          config: ''
        },
        rateLimit: {
          requests: 60,
          period: 1,
          unit: 'minute'
        },
        active: true
      });
    },
    removeTool(index) {
      this.tools.splice(index, 1);
    },
    addParameter(tool) {
      tool.parameters.push({
        name: '',
        type: 'string',
        description: ''
      });
    },
    removeParameter(tool, index) {
      tool.parameters.splice(index, 1);
    },
    addSkill(tool) {
      if (tool.newSkill.trim()) {
        tool.requiredSkills.push(tool.newSkill.trim());
        tool.newSkill = '';
      }
    },
    removeSkill(tool, index) {
      tool.requiredSkills.splice(index, 1);
    },
    saveTools() {
      console.log('Saving tools:', this.tools);
    }
  }
}
</script>

<style scoped>
.tools-container {
  padding: 8px;
}

.tools-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 12px;
  margin-bottom: 16px;
}

.tool-card {
  background: white;
  border-radius: 8px;
  padding: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

/* ... Add missing styling for tool cards ... */
</style>
