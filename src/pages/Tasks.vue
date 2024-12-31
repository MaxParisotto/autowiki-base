<template>
  <div class="tasks-container">
    <div class="tasks-header">
      <h1>Task Management</h1>
      <button class="new-task-button" @click="createNewTask">Create New Task</button>
    </div>

    <div class="tasks-grid">
      <!-- Task Creation/Edit Form -->
      <div v-if="editingTask" class="task-form">
        <div class="form-section">
          <h3>Task Definition</h3>
          <div class="form-group">
            <label>Title:</label>
            <input v-model="editingTask.title" type="text" required>
          </div>
          <div class="form-group">
            <label>Description:</label>
            <textarea v-model="editingTask.description" rows="3" required></textarea>
          </div>
          <div class="form-group">
            <label>Priority:</label>
            <select v-model="editingTask.priority">
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="urgent">Urgent</option>
            </select>
          </div>
        </div>

        <div class="form-section">
          <h3>Required Skills</h3>
          <div class="skills-selector">
            <div class="selected-skills">
              <div v-for="(skill, index) in editingTask.requiredSkills" 
                   :key="index" 
                   class="skill-tag">
                {{ skill }}
                <button @click="removeSkill(index)">×</button>
              </div>
            </div>
            <input 
              v-model="newSkill"
              @keyup.enter="addSkill"
              placeholder="Add required skill"
              type="text"
            >
          </div>
        </div>

        <div class="form-section">
          <h3>Knowledge Requirements</h3>
          <div class="knowledge-requirements">
            <div class="form-group">
              <label>Context Query:</label>
              <textarea 
                v-model="editingTask.knowledge.contextQuery" 
                placeholder="Define what knowledge to retrieve from Weaviate"
                rows="2"
              ></textarea>
            </div>
            <div class="form-group">
              <label>Relevant Documents:</label>
              <div class="document-list">
                <div v-for="(doc, index) in editingTask.knowledge.documents" 
                     :key="index"
                     class="document-item">
                  <span>{{ doc.title }}</span>
                  <button @click="removeDocument(index)">×</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="form-section">
          <h3>Required Tools</h3>
          <div class="tools-selector">
            <div v-for="tool in availableTools" 
                 :key="tool.id"
                 class="tool-item"
                 :class="{ selected: isToolSelected(tool.id) }"
                 @click="toggleTool(tool.id)">
              <span class="tool-name">{{ tool.name }}</span>
              <span class="tool-type">{{ tool.type }}</span>
            </div>
          </div>
        </div>

        <div class="form-section">
          <h3>Execution Parameters</h3>
          <div class="form-group">
            <label>Timeout (minutes):</label>
            <input v-model.number="editingTask.execution.timeout" type="number" min="1">
          </div>
          <div class="form-group">
            <label>Max Retries:</label>
            <input v-model.number="editingTask.execution.maxRetries" type="number" min="0">
          </div>
          <div class="form-group">
            <label>Error Handling:</label>
            <select v-model="editingTask.execution.errorHandling">
              <option value="stop">Stop on Error</option>
              <option value="continue">Continue on Error</option>
              <option value="retry">Retry on Error</option>
            </select>
          </div>
        </div>

        <div class="form-actions">
          <button @click="cancelEdit" class="cancel-button">Cancel</button>
          <button @click="saveTask" class="save-button">Save Task</button>
        </div>
      </div>

      <!-- Tasks List -->
      <div v-else class="tasks-list">
        <div v-for="task in tasks" :key="task.id" class="task-card">
          <div class="task-header">
            <h3>{{ task.title }}</h3>
            <span class="task-priority" :class="task.priority">
              {{ task.priority }}
            </span>
          </div>
          <p class="task-description">{{ task.description }}</p>
          <div class="task-meta">
            <div class="task-skills">
              <span v-for="skill in task.requiredSkills" 
                    :key="skill" 
                    class="skill-tag">
                {{ skill }}
              </span>
            </div>
            <div class="task-tools">
              <span v-for="toolId in task.requiredTools" 
                    :key="toolId" 
                    class="tool-tag">
                {{ getToolName(toolId) }}
              </span>
            </div>
          </div>
          <div class="task-actions">
            <button @click="editTask(task)">Edit</button>
            <button @click="deleteTask(task.id)">Delete</button>
            <button @click="assignTask(task)">Assign</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Tasks',
  data() {
    return {
      tasks: [],
      editingTask: null,
      newSkill: '',
      availableTools: [], // This would be populated from the Tools page
    }
  },
  methods: {
    createNewTask() {
      this.editingTask = {
        title: '',
        description: '',
        priority: 'medium',
        requiredSkills: [],
        knowledge: {
          contextQuery: '',
          documents: []
        },
        requiredTools: [],
        execution: {
          timeout: 30,
          maxRetries: 3,
          errorHandling: 'retry'
        }
      };
    },
    // ... implement other methods ...
  }
}
</script>

<style scoped>
.tasks-container {
  padding: 8px;
}

/* Add styling for tasks components */
</style>