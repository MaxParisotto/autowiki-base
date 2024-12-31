<template>
  <div class="projects-container">
    <div class="projects-header">
      <h1>Projects Management</h1>
      <button class="new-project-button" @click="createProject">
        <i class="fas fa-plus"></i> New Project
      </button>
    </div>

    <!-- Project Creation/Edit Form -->
    <div v-if="editingProject" class="project-form">
      <div class="form-section">
        <h2>{{ isEditing ? 'Edit Project' : 'Create New Project' }}</h2>
        <div class="form-group">
          <label>Project Name:</label>
          <input v-model="editingProject.name" type="text" required>
        </div>
        <div class="form-group">
          <label>Description:</label>
          <textarea v-model="editingProject.description" rows="3"></textarea>
        </div>
        <div class="form-group">
          <label>Repository URL:</label>
          <input v-model="editingProject.repoUrl" type="url" placeholder="https://github.com/username/repo">
        </div>
        <div class="form-group">
          <label>Project Type:</label>
          <select v-model="editingProject.type">
            <option value="documentation">Documentation</option>
            <option value="code-review">Code Review</option>
            <option value="testing">Testing</option>
            <option value="research">Research</option>
            <option value="analysis">Analysis</option>
          </select>
        </div>
        <div class="form-group">
          <label>Deadline:</label>
          <input v-model="editingProject.deadline" type="date">
        </div>

        <!-- Add after deadline field -->
        <h3>Project Phases</h3>
        <div class="phases-container">
          <div v-for="(phase, index) in editingProject.phases" :key="index" class="phase-item">
            <div class="phase-header">
              <h4>Phase {{index + 1}}</h4>
              <button class="remove-phase" @click="removePhase(index)">×</button>
            </div>
            <div class="form-group">
              <label>Name:</label>
              <input v-model="phase.name" type="text" required>
            </div>
            <div class="form-group">
              <label>Description:</label>
              <textarea v-model="phase.description" rows="2"></textarea>
            </div>
            <div class="form-group">
              <label>Status:</label>
              <select v-model="phase.status">
                <option value="pending">Pending</option>
                <option value="in_progress">In Progress</option>
                <option value="review">Under Review</option>
                <option value="completed">Completed</option>
                <option value="blocked">Blocked</option>
              </select>
            </div>
            <div class="phase-requirements">
              <div class="form-group approval-toggle">
                <label>Requires Approval:</label>
                <input type="checkbox" v-model="phase.requiresApproval">
              </div>
              <div v-if="phase.requiresApproval" class="form-group">
                <label>Approver:</label>
                <select v-model="phase.approverId">
                  <option value="">Select Approver</option>
                  <option v-for="user in availableApprovers" 
                          :key="user.id" 
                          :value="user.id">
                    {{ user.name }}
                  </option>
                </select>
              </div>
              <div class="form-group">
                <label>Dependencies:</label>
                <select v-model="phase.dependencies" multiple>
                  <option v-for="(p, i) in editingProject.phases" 
                          :key="i" 
                          :value="i"
                          :disabled="i === index">
                    Phase {{i + 1}}: {{p.name}}
                  </option>
                </select>
              </div>
            </div>
          </div>
          <button class="add-phase-button" @click="addPhase">+ Add Phase</button>
        </div>

        <!-- Agent Assignment Section -->
        <div class="agents-section">
          <h3>Assigned Agents</h3>
          <div class="assigned-agents">
            <div v-for="agent in availableAgents" :key="agent.id" class="agent-card"
                 :class="{ selected: isAgentAssigned(agent.id) }"
                 @click="toggleAgent(agent.id)">
              <div class="agent-info">
                <span class="agent-name">{{ agent.name }}</span>
                <span class="agent-type">{{ agent.type }}</span>
              </div>
              <div class="agent-role" v-if="isAgentAssigned(agent.id)">
                <select v-model="editingProject.agents[agent.id].role">
                  <option value="primary">Primary</option>
                  <option value="secondary">Secondary</option>
                  <option value="reviewer">Reviewer</option>
                  <option value="assistant">Assistant</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div class="form-actions">
          <button class="cancel-button" @click="cancelEdit">Cancel</button>
          <button class="save-button" @click="saveProject">Save Project</button>
        </div>
      </div>
    </div>

    <!-- Projects List -->
    <div v-else class="projects-grid">
      <div v-for="project in projects" :key="project.id" class="project-card">
        <div class="project-header">
          <h3>{{ project.name }}</h3>
          <div class="project-actions">
            <a :href="project.viewUrl" target="_blank" class="view-button">
              <i class="fas fa-external-link-alt"></i>
            </a>
            <button @click="editProject(project)" class="edit-button">
              <i class="fas fa-edit"></i>
            </button>
            <button @click="deleteProject(project.id)" class="delete-button">
              <i class="fas fa-trash"></i>
            </button>
          </div>
        </div>
        <p class="project-description">{{ project.description }}</p>
        <div class="project-meta">
          <span class="project-type">{{ project.type }}</span>
          <span class="project-deadline">Due: {{ formatDate(project.deadline) }}</span>
        </div>
        <div class="assigned-agents-preview">
          <div v-for="(agent, agentId) in project.agents" 
               :key="agentId" 
               class="assigned-agent-tag"
               :title="`${getAgentName(agentId)} - ${agent.role}`">
            {{ getAgentName(agentId) }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Projects",
  data() {
    return {
      projects: [],
      editingProject: null,
      isEditing: false,
      availableAgents: [], // Will be populated from Agents store/API
      availableApprovers: [
        { id: 1, name: 'Project Manager' },
        { id: 2, name: 'Tech Lead' },
        { id: 3, name: 'Quality Assurance' }
      ]
    }
  },
  methods: {
    createProject() {
      this.editingProject = {
        name: '',
        description: '',
        repoUrl: '',
        type: 'documentation',
        deadline: '',
        agents: {},
        viewUrl: '',
        phases: [{
          name: 'Initial Phase',
          description: '',
          status: 'pending',
          requiresApproval: false,
          approverId: '',
          dependencies: [],
          completedAt: null,
          approvedAt: null,
          approverNotes: ''
        }]
      };
      this.isEditing = false;
    },
    editProject(project) {
      this.editingProject = { ...project };
      this.isEditing = true;
    },
    async saveProject() {
      try {
        const project = { ...this.editingProject };
        // Generate view URL based on project configuration
        project.viewUrl = `/projects/${project.id}/view`;
        
        // TODO: Implement API call to save project
        console.log('Saving project:', project);
        
        this.editingProject = null;
      } catch (error) {
        console.error('Error saving project:', error);
      }
    },
    cancelEdit() {
      this.editingProject = null;
      this.isEditing = false;
    },
    deleteProject(id) {
      if (confirm('Are you sure you want to delete this project?')) {
        // TODO: Implement API call to delete project
        this.projects = this.projects.filter(p => p.id !== id);
      }
    },
    isAgentAssigned(agentId) {
      return !!this.editingProject?.agents[agentId];
    },
    toggleAgent(agentId) {
      if (this.isAgentAssigned(agentId)) {
        delete this.editingProject.agents[agentId];
      } else {
        this.editingProject.agents[agentId] = { role: 'assistant' };
      }
    },
    getAgentName(agentId) {
      return this.availableAgents.find(a => a.id === agentId)?.name || 'Unknown Agent';
    },
    formatDate(date) {
      return new Date(date).toLocaleDateString();
    },
    addPhase() {
      this.editingProject.phases.push({
        name: '',
        description: '',
        status: 'pending',
        requiresApproval: false,
        approverId: '',
        dependencies: [],
        completedAt: null,
        approvedAt: null,
        approverNotes: ''
      });
    },
    removePhase(index) {
      // Remove phase and update dependencies
      this.editingProject.phases = this.editingProject.phases.filter((_, i) => i !== index)
        .map(phase => ({
          ...phase,
          dependencies: phase.dependencies
            .filter(dep => dep !== index)
            .map(dep => dep > index ? dep - 1 : dep)
        }));
    }
  },
  async mounted() {
    // TODO: Fetch projects and available agents from API
    this.availableAgents = [
      { id: 1, name: 'Documentation Bot', type: 'assistant' },
      { id: 2, name: 'Code Reviewer', type: 'expert' },
      { id: 3, name: 'Research Assistant', type: 'researcher' }
    ];
  }
}
</script>

<style scoped>
.projects-container {
  padding: 8px;
}

.projects-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 16px;
}

.project-card {
  background: white;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.project-header {
  display: flex;
  justify-content: space-between;
  align-items: start;
  margin-bottom: 8px;
}

.project-actions {
  display: flex;
  gap: 8px;
}

.project-actions button,
.project-actions a {
  background: none;
  border: none;
  color: var(--text-dark);
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
}

.view-button:hover { color: var(--primary-color); }
.edit-button:hover { color: var(--active-color); }
.delete-button:hover { color: #e74c3c; }

.project-meta {
  display: flex;
  gap: 12px;
  margin: 8px 0;
  font-size: 0.85rem;
}

.project-type {
  background: var(--primary-color);
  color: white;
  padding: 2px 8px;
  border-radius: 12px;
}

.assigned-agents-preview {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  margin-top: 8px;
}

.assigned-agent-tag {
  background: var(--background-dark);
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 0.85rem;
}

/* Form Styles */
.project-form {
  background: white;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.agents-section {
  margin-top: 16px;
}

.assigned-agents {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 8px;
  margin-top: 8px;
}

.agent-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
}

.agent-card.selected {
  background: var(--background-dark);
  border-color: var(--primary-color);
}

.form-actions {
  margin-top: 16px;
  display: flex;
  justify-content: flex-end;
  gap: 8px;
}

.save-button, .new-project-button {
  background: var(--primary-color);
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
}

.cancel-button {
  background: var(--background-dark);
  color: var(--text-dark);
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
}

.phases-container {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 12px;
}

.phase-item {
  background: var(--background-dark);
  padding: 12px;
  border-radius: 6px;
  border: 1px solid #ddd;
}

.phase-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.phase-header h4 {
  margin: 0;
  font-size: 0.9rem;
  color: var(--primary-color);
}

.remove-phase {
  background: none;
  border: none;
  color: #666;
  cursor: pointer;
  font-size: 1.2rem;
  padding: 0 4px;
}

.remove-phase:hover {
  color: #e74c3c;
}

.phase-requirements {
  margin-top: 8px;
  padding-top: 8px;
  border-top: 1px solid #ddd;
}

.approval-toggle {
  display: flex;
  align-items: center;
}

.approval-toggle input[type="checkbox"] {
  margin-left: 8px;
}

.add-phase-button {
  background: none;
  border: 2px dashed #ddd;
  padding: 8px;
  border-radius: 6px;
  color: var(--text-dark);
  cursor: pointer;
  width: 100%;
  font-size: 0.9rem;
}

.add-phase-button:hover {
  border-color: var(--primary-color);
  color: var(--primary-color);
}

select[multiple] {
  height: auto;
  min-height: 60px;
}
</style>