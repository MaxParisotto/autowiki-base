<template>
  <DefaultLayout title="Projects">
    <div class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
      <div v-for="project in projects" 
           :key="project.id" 
           class="bg-elevation-2 hover:bg-elevation-2-hover rounded-lg p-4 border border-border-weak transition-all duration-200">
        <div class="flex justify-between items-start mb-3">
          <span class="badge" :class="getStatusBadgeClass(project.status)">
            {{ project.status }}
          </span>
          <button class="text-text-secondary hover:text-text-primary">
            <span class="sr-only">Options</span>
            <!-- Add your icon here -->
          </button>
        </div>

        <h3 class="text-text-primary font-medium text-lg mb-2">{{ project.name }}</h3>
        <p class="text-text-secondary text-sm mb-4">{{ project.description }}</p>

        <!-- Progress Section -->
        <div class="space-y-4">
          <div>
            <div class="h-2 bg-elevation-1 rounded-full overflow-hidden">
              <div class="h-full bg-accent-orange transition-all duration-300"
                   :style="{ width: project.progress + '%' }">
              </div>
            </div>
            <div class="flex justify-between mt-2">
              <span class="text-text-secondary text-sm">Progress</span>
              <span class="text-text-secondary text-sm">{{ project.progress }}%</span>
            </div>
          </div>

          <div class="flex items-center justify-between">
            <div class="flex -space-x-2">
              <img v-for="member in project.team" 
                   :key="member.id"
                   :src="member.avatar"
                   :alt="member.name"
                   class="w-8 h-8 rounded-full border-2 border-elevation-2">
            </div>
            <button class="text-accent-orange hover:text-accent-orange-dark font-medium transition-colors">
              View Details →
            </button>
          </div>
        </div>
      </div>
    </div>
  </DefaultLayout>
</template>

<script>
import DefaultLayout from '../layouts/DefaultLayout.vue'

export default {
  name: 'Projects',
  components: {
    DefaultLayout
  },
  data() {
    return {
      projects: [
        {
          id: 1,
          name: 'API Documentation',
          description: 'Comprehensive documentation for the new API endpoints',
          status: 'active',
          progress: 75,
          team: [
            { id: 1, name: 'AI Bot 1', avatar: '/avatars/bot1.png' },
            { id: 2, name: 'AI Bot 2', avatar: '/avatars/bot2.png' }
          ]
        }
        // Add more projects...
      ]
    }
  },
  methods: {
    getStatusBadgeClass(status) {
      return {
        'active': 'badge-primary',
        'completed': 'badge-secondary',
        'paused': 'badge bg-warning-text bg-opacity-20 text-warning-text'
      }[status] || 'badge-secondary'
    }
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