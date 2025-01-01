<template>
  <div class="p-6">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold text-text-primary">Tasks</h1>
      <button class="bg-accent-orange hover:bg-accent-orange-dark text-black px-4 py-2 rounded-lg transition-colors font-medium">
        New Task
      </button>
    </div>

    <!-- Tasks Filter -->
    <div class="bg-elevation-2 rounded-lg p-4 mb-6 border border-border-weak">
      <div class="flex gap-4 items-center">
        <div class="flex-1">
          <input type="text"
                 placeholder="Search tasks..."
                 class="w-full bg-elevation-3 border border-border-weak rounded-lg px-4 py-2 text-text-primary placeholder-text-secondary">
        </div>
        <div class="flex gap-2">
          <select class="bg-elevation-3 border border-border-weak rounded-lg px-4 py-2 text-text-primary">
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
          <select class="bg-elevation-3 border border-border-weak rounded-lg px-4 py-2 text-text-primary">
            <option value="all">All Projects</option>
            <option value="docs">Documentation</option>
            <option value="api">API</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Tasks List -->
    <div class="bg-elevation-2 rounded-lg border border-border-weak">
      <div v-for="task in tasks" 
           :key="task.id" 
           class="border-b border-border-weak last:border-b-0">
        <div class="p-4 hover:bg-elevation-3 transition-colors">
          <div class="flex items-start justify-between">
            <div class="flex items-start space-x-4">
              <input type="checkbox" 
                     :checked="task.completed"
                     class="mt-1 bg-elevation-3 border-border-medium rounded">
              <div>
                <h3 class="text-text-primary font-medium mb-1">{{ task.title }}</h3>
                <p class="text-text-secondary text-sm">{{ task.description }}</p>
                <div class="flex items-center gap-2 mt-2">
                  <span class="badge" :class="getStatusBadgeClass(task.status)">
                    {{ task.status }}
                  </span>
                  <span class="text-text-secondary text-xs">{{ task.dueDate }}</span>
                </div>
              </div>
            </div>
            <div class="flex items-center gap-2">
              <div class="flex -space-x-2">
                <img v-for="assignee in task.assignees" 
                     :key="assignee.id"
                     :src="assignee.avatar"
                     :alt="assignee.name"
                     :title="assignee.name"
                     class="w-8 h-8 rounded-full border-2 border-elevation-2">
              </div>
              <button class="text-text-secondary hover:text-text-primary">
                <span class="sr-only">Options</span>
                <!-- Add your icon here -->
              </button>
            </div>
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
      tasks: [
        {
          id: 1,
          title: 'Review API Documentation',
          description: 'Review and update the API documentation for the new endpoints',
          status: 'in-progress',
          completed: false,
          dueDate: 'Tomorrow at 5:00 PM',
          assignees: [
            { id: 1, name: 'AI Bot 1', avatar: '/avatars/bot1.png' },
            { id: 2, name: 'AI Bot 2', avatar: '/avatars/bot2.png' }
          ]
        }
        // Add more tasks...
      ]
    }
  },
  methods: {
    getStatusBadgeClass(status) {
      return {
        'pending': 'badge-secondary',
        'in-progress': 'badge-primary',
        'completed': 'bg-success-text bg-opacity-20 text-success-text'
      }[status] || 'badge-secondary'
    }
  }
}
</script>

<style scoped>
.tasks-container {
  padding: 8px;
}

/* Add styling for tasks components */
</style>