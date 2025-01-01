<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-6 text-text-primary">Dashboard</h1>
    <div class="space-y-6">
      <!-- Stats Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div v-for="stat in stats" 
             :key="stat.title" 
             class="bg-elevation-2 hover:bg-elevation-2-hover rounded-lg p-4 border border-border-weak transition-all duration-200">
          <h3 class="text-text-secondary text-sm">{{ stat.title }}</h3>
          <div class="text-text-primary text-2xl font-semibold mt-2">{{ stat.value }}</div>
          <div :class="{
            'text-success-text': stat.trend === 'positive',
            'text-error-text': stat.trend === 'negative',
            'text-text-secondary': stat.trend === 'neutral'
          }" class="text-sm mt-1">
            {{ stat.change }}
          </div>
        </div>
      </div>

      <!-- Pending Approvals -->
      <div class="bg-elevation-2 rounded-lg p-6 border border-border-weak">
        <h2 class="text-xl font-semibold mb-4 text-text-primary">Pending Approvals</h2>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div v-for="task in pendingApprovals" 
               :key="task.id" 
               class="bg-elevation-3 hover:bg-elevation-3-hover rounded-lg p-4 border border-border-weak transition-colors duration-200">
            <div class="flex justify-between items-start mb-3">
              <span class="badge badge-primary">{{ task.projectName }}</span>
              <span class="badge badge-secondary">Phase {{ task.phaseNumber }}</span>
            </div>
            <h3 class="text-text-primary font-medium mb-2">{{ task.title }}</h3>
            <p class="text-text-secondary text-sm mb-4">{{ task.description }}</p>
            
            <div class="mb-4">
              <div class="h-2 bg-elevation-1 rounded-full overflow-hidden">
                <div class="h-full bg-accent-orange transition-all duration-300"
                     :style="{ width: task.progress + '%' }">
                </div>
              </div>
              <span class="text-text-secondary text-sm mt-2 block">
                {{ task.progress }}% Complete
              </span>
            </div>

            <div class="flex items-center justify-between">
              <div class="flex -space-x-2">
                <img v-for="agent in task.agents" 
                     :key="agent.id" 
                     :src="agent.avatar" 
                     :title="agent.name"
                     class="w-8 h-8 rounded-full border-2 border-elevation-3">
              </div>
              <button @click="showApprovalDialog(task)" 
                      class="bg-accent-orange hover:bg-accent-orange-dark text-black px-4 py-2 rounded-lg transition-colors font-medium">
                Review
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Active Projects Timeline -->
      <div class="bg-elevation-2 rounded-lg p-6 border border-border-weak">
        <h2 class="text-xl font-semibold mb-4 text-text-primary">Active Projects</h2>
        <div class="space-y-6">
          <div v-for="project in activeProjects" 
               :key="project.id" 
               class="bg-elevation-3 hover:bg-elevation-3-hover rounded-lg p-4 transition-colors duration-200">
            <div class="flex justify-between items-center mb-4">
              <h3 class="text-text-primary font-medium">{{ project.name }}</h3>
              <span class="badge" 
                    :class="{
                      'badge-primary': project.status === 'in_progress',
                      'badge-secondary': project.status === 'completed'
                    }">
                {{ project.status }}
              </span>
            </div>
            
            <div class="flex items-center gap-4 mt-6">
              <div v-for="phase in project.phases" 
                   :key="phase.id"
                   class="flex-1">
                <div class="relative flex items-center">
                  <div class="h-1.5 flex-1 rounded-full"
                       :class="{
                         'bg-accent-orange opacity-100': phase.status === 'completed',
                         'bg-elevation-1': phase.status !== 'completed'
                       }">
                  </div>
                  <div class="w-4 h-4 rounded-full border-2 absolute -ml-2 cursor-pointer hover:scale-110 transition-transform"
                       :class="{
                         'bg-accent-orange border-accent-orange': phase.status === 'completed',
                         'bg-elevation-1 border-border-medium': phase.status === 'pending',
                         'bg-error-text border-error-text': phase.status === 'blocked'
                       }"
                       @click="showPhaseDetails(phase)">
                  </div>
                </div>
                <span class="text-xs text-text-secondary mt-2 block">{{ phase.name }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- ...existing dialog code... -->
  </div>
</template>

<script>
export default {
  name: "Dashboard",
  data() {
    return {
      stats: [
        { title: 'Active Projects', value: 12, change: '+2 this week', trend: 'positive' },
        { title: 'Pending Reviews', value: 5, change: '-3 from yesterday', trend: 'negative' },
        { title: 'Active Agents', value: 8, change: 'No change', trend: 'neutral' },
        { title: 'Tasks Completed', value: 45, change: '+15 this week', trend: 'positive' }
      ],
      pendingApprovals: [], // Will be populated from API
      activeProjects: [], // Will be populated from API
      showDialog: false,
      selectedTask: null,
      reviewNotes: '',
      showRejectionOptions: false,
      selectedFeedback: [],
      rejectionOptions: [
        { id: 1, label: 'Incomplete task requirements' },
        { id: 2, label: 'Quality does not meet standards' },
        { id: 3, label: 'Needs additional research' },
        { id: 4, label: 'Incorrect approach used' },
        { id: 5, label: 'Missing documentation' }
      ]
    }
  },
  methods: {
    showApprovalDialog(task) {
      this.selectedTask = task;
      this.showDialog = true;
      this.reviewNotes = '';
      this.showRejectionOptions = false;
      this.selectedFeedback = [];
    },
    closeDialog() {
      this.showDialog = false;
      this.selectedTask = null;
    },
    rejectTask() {
      this.showRejectionOptions = true;
    },
    async approveTask() {
      try {
        await this.submitReview({
          taskId: this.selectedTask.id,
          approved: true,
          notes: this.reviewNotes
        });
        this.closeDialog();
      } catch (error) {
        console.error('Error approving task:', error);
      }
    },
    async submitReview(review) {
      console.log('Submitting review:', review);
    },
    showPhaseDetails(phase) {
      console.log('Phase details:', phase);
    }
  },
  async mounted() {
    this.pendingApprovals = [
      {
        id: 1,
        projectName: 'Documentation System',
        phaseNumber: 2,
        title: 'API Documentation Review',
        description: 'Review generated API documentation for completeness and accuracy',
        progress: 85,
        agents: [
          { id: 1, name: 'DocBot', avatar: '/avatars/docbot.png' },
          { id: 2, name: 'ReviewBot', avatar: '/avatars/reviewbot.png' }
        ]
      }
    ];

    this.activeProjects = [
      {
        id: 1,
        name: 'System Documentation',
        status: 'in_progress',
        phases: [
          { id: 1, name: 'Planning', status: 'completed' },
          { id: 2, name: 'Research', status: 'completed' },
          { id: 3, name: 'Documentation', status: 'in_progress' },
          { id: 4, name: 'Review', status: 'pending' },
          { id: 5, name: 'Publication', status: 'blocked' }
        ]
      }
    ];
  }
}
</script>

<style scoped>
/* Remove existing styles as they're now handled by Tailwind classes */
</style>