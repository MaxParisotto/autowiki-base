<template>
  <div class="dashboard-container">
    <h1>Weaviate Monitoring</h1>
    
    <!-- Performance Overview Cards -->
    <div class="metrics-grid">
      <div class="metric-card">
        <h3>Total Objects</h3>
        <p class="metric-value">{{ metrics.totalObjects }}</p>
      </div>
      <div class="metric-card">
        <h3>Average Query Time</h3>
        <p class="metric-value">{{ metrics.avgQueryTime }}ms</p>
      </div>
      <div class="metric-card">
        <h3>Storage Used</h3>
        <p class="metric-value">{{ formatStorage(metrics.storageUsed) }}</p>
      </div>
      <div class="metric-card">
        <h3>Uptime</h3>
        <p class="metric-value">{{ formatUptime(metrics.uptime) }}</p>
      </div>
    </div>

    <!-- Query Performance Chart -->
    <div class="chart-section">
      <h2>Query Latency Over Time</h2>
      <div class="chart-container">
        <!-- Add your preferred charting library component here -->
        <p class="placeholder">Query Latency Chart</p>
      </div>
    </div>

    <!-- Vector Store Analytics -->
    <div class="analytics-grid">
      <div class="analytics-card">
        <h2>Class Distribution</h2>
        <table class="analytics-table">
          <thead>
            <tr>
              <th>Class Name</th>
              <th>Object Count</th>
              <th>Size</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="cls in metrics.classes" :key="cls.name">
              <td>{{ cls.name }}</td>
              <td>{{ cls.count }}</td>
              <td>{{ formatStorage(cls.size) }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="analytics-card">
        <h2>Performance Stats</h2>
        <div class="stats-grid">
          <div class="stat-item">
            <span class="stat-label">Cache Hit Rate</span>
            <span class="stat-value">{{ metrics.cacheHitRate }}%</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">Avg Vector Dim</span>
            <span class="stat-value">{{ metrics.avgVectorDim }}</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">Index Size</span>
            <span class="stat-value">{{ formatStorage(metrics.indexSize) }}</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">Memory Usage</span>
            <span class="stat-value">{{ formatStorage(metrics.memoryUsage) }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

// Mock metrics data structure
const metrics = ref({
  totalObjects: 0,
  avgQueryTime: 0,
  storageUsed: 0,
  uptime: 0,
  cacheHitRate: 0,
  avgVectorDim: 0,
  indexSize: 0,
  memoryUsage: 0,
  classes: [] as Array<{ name: string; count: number; size: number }>
})

// Utility functions
const formatStorage = (bytes: number): string => {
  const sizes = ['B', 'KB', 'MB', 'GB']
  if (bytes === 0) return '0 B'
  const i = Math.floor(Math.log(bytes) / Math.log(1024))
  return `${(bytes / Math.pow(1024, i)).toFixed(2)} ${sizes[i]}`
}

const formatUptime = (seconds: number): string => {
  const days = Math.floor(seconds / 86400)
  const hours = Math.floor((seconds % 86400) / 3600)
  return `${days}d ${hours}h`
}

// Fetch metrics data
const fetchMetrics = async () => {
  try {
    // TODO: Implement actual API call to Weaviate
    // This is mock data
    metrics.value = {
      totalObjects: 150000,
      avgQueryTime: 45,
      storageUsed: 2.5 * 1024 * 1024 * 1024, // 2.5GB
      uptime: 432000, // 5 days
      cacheHitRate: 85,
      avgVectorDim: 768,
      indexSize: 1.8 * 1024 * 1024 * 1024,
      memoryUsage: 4.2 * 1024 * 1024 * 1024,
      classes: [
        { name: 'Article', count: 50000, size: 800 * 1024 * 1024 },
        { name: 'Document', count: 75000, size: 1.2 * 1024 * 1024 * 1024 },
        { name: 'Image', count: 25000, size: 500 * 1024 * 1024 }
      ]
    }
  } catch (error) {
    console.error('Error fetching metrics:', error)
  }
}

onMounted(() => {
  fetchMetrics()
  // Set up polling for real-time updates
  setInterval(fetchMetrics, 30000) // Update every 30 seconds
})
</script>

<style scoped>
.dashboard-container {
  padding: 1rem;
  max-width: 1200px;
  margin: 0 auto;
}

.metrics-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin: 1rem 0;
}

.metric-card {
  background: var(--color-background-soft);
  padding: 1rem;
  border-radius: 4px;
  box-shadow: 0 1px 3px var(--color-border);
  border: 1px solid var(--color-border);
}

.metric-value {
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0.5rem 0;
  color: var(--color-heading);
}

.chart-section {
  background: var(--color-background-soft);
  padding: 1rem;
  border-radius: 4px;
  box-shadow: 0 1px 3px var(--color-border);
  border: 1px solid var(--color-border);
}

.analytics-card {
  background: var(--color-background-soft);
  padding: 1rem;
  border-radius: 4px;
  box-shadow: 0 1px 3px var(--color-border);
  border: 1px solid var(--color-border);
}

.analytics-table th,
.analytics-table td {
  padding: 0.5rem;
  text-align: left;
  border-bottom: 1px solid var(--color-border);
  color: var(--color-text);
}

.analytics-table th {
  color: var(--color-heading);
}

.stat-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem;
  background: var(--color-background-mute);
  border-radius: 4px;
  border: 1px solid var(--color-border);
}

.stat-label {
  font-size: 0.9rem;
  color: var(--color-text);
}

.stat-value {
  font-weight: 600;
  color: var(--color-heading);
}

h1 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: var(--color-heading);
}

h2 {
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  color: var(--color-heading);
}

h3 {
  font-size: 1rem;
  color: var(--color-text);
  margin: 0;
}

.placeholder {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-background-mute);
  border-radius: 4px;
  color: var(--color-text);
  border: 1px solid var(--color-border);
}
</style>
