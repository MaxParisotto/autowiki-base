<template>
  <div class="dashboard-container">
    <!-- Overview Stats -->
    <div class="stats-grid">
      <div class="stat-card" v-for="stat in stats" :key="stat.title">
        <h3>{{ stat.title }}</h3>
        <div class="stat-value">{{ stat.value }}</div>
        <div class="stat-change" :class="stat.trend">
          {{ stat.change }}
        </div>
      </div>
    </div>

    <!-- Tasks Requiring Attention -->
    <div class="dashboard-section">
      <h2>Pending Approvals</h2>
      <div class="approval-cards">
        <div v-for="task in pendingApprovals" :key="task.id" class="approval-card">
          <div class="approval-header">
            <span class="project-tag">{{ task.projectName }}</span>
            <span class="phase-tag">Phase {{ task.phaseNumber }}</span>
          </div>
          <h3>{{ task.title }}</h3>
          <p>{{ task.description }}</p>
          <div class="completion-info">
            <div class="progress-bar">
              <div class="progress" :style="{ width: task.progress + '%' }"></div>
            </div>
            <span>{{ task.progress }}% Complete</span>
          </div>
          <div class="assigned-agents">
            <img v-for="agent in task.agents" 
                 :key="agent.id" 
                 :src="agent.avatar" 
                 :title="agent.name"
                 class="agent-avatar">
          </div>
          <div class="approval-actions">
            <button @click="showApprovalDialog(task)" class="review-button">
              Review
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Active Projects Timeline -->
    <div class="dashboard-section">
      <h2>Active Projects</h2>
      <div class="timeline-container">
        <div v-for="project in activeProjects" :key="project.id" class="timeline-item">
          <div class="timeline-header">
            <h3>{{ project.name }}</h3>
            <span class="project-status" :class="project.status">
              {{ project.status }}
            </span>
          </div>
          <div class="phase-timeline">
            <div v-for="phase in project.phases" 
                 :key="phase.id" 
                 class="phase-node"
                 :class="phase.status"
                 @click="showPhaseDetails(phase)">
              <div class="phase-dot"></div>
              <div class="phase-label">{{ phase.name }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Approval Dialog -->
    <div v-if="showDialog" class="approval-dialog">
      <div class="dialog-content">
        <h2>Review Task</h2>
        <div class="task-details">
          <h3>{{ selectedTask.title }}</h3>
          <p>{{ selectedTask.description }}</p>
          
          <div class="completion-evidence">
            <h4>Completion Evidence</h4>
            <div class="evidence-items">
              <div v-for="item in selectedTask.evidence" 
                   :key="item.id" 
                   class="evidence-item">
                <i :class="item.icon"></i>
                <a :href="item.link" target="_blank">{{ item.name }}</a>
              </div>
            </div>
          </div>

          <div class="review-form">
            <label>Review Notes:</label>
            <textarea v-model="reviewNotes" 
                      rows="4" 
                      placeholder="Provide feedback or reasons for approval/rejection">
            </textarea>

            <div class="feedback-options" v-if="showRejectionOptions">
              <h4>Rejection Feedback</h4>
              <div v-for="option in rejectionOptions" 
                   :key="option.id" 
                   class="feedback-option">
                <input type="checkbox" 
                       v-model="selectedFeedback" 
                       :value="option.id">
                <label>{{ option.label }}</label>
              </div>
            </div>
          </div>

          <div class="dialog-actions">
            <button @click="closeDialog" class="cancel-button">
              Cancel
            </button>
            <button @click="rejectTask" class="reject-button">
              Reject
            </button>
            <button @click="approveTask" class="approve-button">
              Approve
            </button>
          </div>
        </div>
      </div>
    </div>
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
        // TODO: Implement API call to approve task
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
      // TODO: Implement API call
      console.log('Submitting review:', review);
    },
    showPhaseDetails(phase) {
      // TODO: Implement phase details view
      console.log('Phase details:', phase);
    }
  },
  async mounted() {
    // TODO: Fetch dashboard data from API
    // This is placeholder data
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
      // ... more tasks
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
      // ... more projects
    ];
  }
}
</script>

<style scoped>
.dashboard-container {
  padding: 16px;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
  margin-bottom: 24px;
}

.stat-card {
  background: white;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.approval-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 16px;
}

.approval-card {
  background: white;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.timeline-container {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.phase-timeline {
  display: flex;
  align-items: center;
  margin-top: 8px;
}

.phase-node {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  position: relative;
  cursor: pointer;
}

.phase-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: var(--primary-color);
}

.phase-node.completed .phase-dot {
  background: var(--active-color);
}

.phase-node.blocked .phase-dot {
  background: #e74c3c;
}

.approval-dialog {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.dialog-content {
  background: white;
  padding: 24px;
  border-radius: 8px;
  width: 90%;
  max-width: 600px;
  max-height: 80vh;
  overflow-y: auto;
}

.agent-avatar {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  margin-right: 4px;
}

.progress-bar {
  height: 4px;
  background: #eee;
  border-radius: 2px;
  overflow: hidden;
}

.progress {
  height: 100%;
  background: var(--active-color);
  transition: width 0.3s ease;
}

/* Add more styles as needed */
</style>