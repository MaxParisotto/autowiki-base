<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-6 text-text-primary">Tools</h1>
    <div class="space-y-6">
      <!-- Tools Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div v-for="tool in tools" 
             :key="tool.id" 
             class="bg-elevation-2 hover:bg-elevation-2-hover rounded-lg p-4 border border-border-weak transition-all duration-200">
          <div class="flex justify-between items-start mb-3">
            <span class="badge badge-primary">{{ tool.category }}</span>
            <span class="badge" :class="getStatusBadgeClass(tool.status)">
              {{ tool.status }}
            </span>
          </div>
          
          <h3 class="text-text-primary font-medium mb-2">{{ tool.name }}</h3>
          <p class="text-text-secondary text-sm mb-4">{{ tool.description }}</p>
          
          <div class="flex items-center justify-between mt-4">
            <div class="flex items-center space-x-2">
              <span class="text-text-secondary text-sm">{{ tool.usageCount }} uses</span>
              <span class="text-text-secondary">•</span>
              <span class="text-text-secondary text-sm">{{ tool.lastUsed }}</span>
            </div>
            <button @click="launchTool(tool)" 
                    class="bg-accent-orange hover:bg-accent-orange-dark text-black px-4 py-2 rounded-lg transition-colors font-medium">
              Launch
            </button>
          </div>
        </div>
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
          id: 1,
          name: 'API Documentation Generator',
          description: 'Automatically generate API documentation from code',
          category: 'Documentation',
          status: 'active',
          usageCount: 245,
          lastUsed: '2 hours ago'
        }
        // Add more tools...
      ]
    }
  },
  methods: {
    getStatusBadgeClass(status) {
      return {
        'active': 'badge-secondary',
        'maintenance': 'badge bg-warning-text bg-opacity-20 text-warning-text',
        'deprecated': 'badge bg-error-text bg-opacity-20 text-error-text'
      }[status] || 'badge-secondary'
    },
    launchTool(tool) {
      // Implement tool launch logic
      console.log('Launching tool:', tool.name)
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
