<template>
  <div class="app">
    <nav class="navbar">
      <ul>
        <li><router-link to="/"><i class="fas fa-home"></i> Dashboard</router-link></li>
        <li><router-link to="/agents">Agents</router-link></li>
        <li><router-link to="/projects">Projects</router-link></li>
        <li><router-link to="/tasks">Tasks</router-link></li>
        <li><router-link to="/settings">Settings</router-link></li>
      </ul>
    </nav>
    <main class="content">
      <router-view />
    </main>
    <aside class="right-panel">
      <div class="panel-content">
        <h3>Activity Log</h3>
        <div class="activity-feed">
          <!-- Activity feed content will go here -->
          <p>Recent activities will appear here</p>
        </div>
      </div>
    </aside>
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style>
:root {
  --primary-color: #3498db;
  --primary-dark: #2980b9;
  --background-dark: #f8f9fa;
  --text-light: #ffffff;
  --text-dark: #2c3e50;
  --hover-color: #2573a7;
  --active-color: #1abc9c;
  font-size: 16px;
}

body {
  margin: 0;
  background-color: var(--background-dark);
  color: var(--text-dark);
  font-size: 0.875rem; /* 14px */
}

.app {
  display: flex;
  height: 100vh;
  background-color: var(--background-dark);
}

.navbar {
  width: 140px; /* Reduced from 160px */
  background-color: var(--primary-color);
  color: var(--text-light);
  padding: 4px;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
  font-size: 1rem; /* 16px */
}

.navbar ul {
  list-style: none;
  padding: 0;
  margin-top: 4px;
}

.navbar ul li {
  margin: 2px 0;
}

.navbar ul li a {
  color: var(--text-light);
  text-decoration: none;
  display: flex;
  align-items: center;
  padding: 8px 12px;
  border-radius: 5px;
  transition: all 0.3s ease;
  font-size: 1rem;
  font-weight: 500;
}

.navbar ul li a:hover {
  background-color: var(--hover-color);
}

.navbar ul li a.router-link-active {
  font-weight: bold;
  color: var(--text-light);
  background-color: var(--primary-dark);
}

.content {
  width: 60%; /* Set content width */
  min-width: 600px;
  max-width: 1000px;
  padding: 4px;
  overflow-y: auto;
  background-color: white;
  box-shadow: inset 2px 0 5px rgba(0, 0, 0, 0.05);
}

.right-panel {
  flex: 1;
  background-color: var(--background-dark);
  padding: 4px;
  border-left: 1px solid #ddd;
  min-width: 200px;
}

.panel-content {
  background: white;
  border-radius: 8px;
  padding: 8px;
  height: calc(100% - 16px);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.panel-content h3 {
  margin: 0 0 8px 0;
  font-size: 1rem;
  color: var(--text-dark);
}

.activity-feed {
  font-size: 0.85rem;
  color: var(--text-dark);
}
</style>