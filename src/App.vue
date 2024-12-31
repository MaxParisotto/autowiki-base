<template>
  <div class="app">
    <nav class="navbar">
      <ul>
        <li><router-link to="/"><i class="fas fa-home"></i> Dashboard</router-link></li>
        <li><router-link to="/agents">Agents</router-link></li>
        <li><router-link to="/tools">Tools</router-link></li>
        <li><router-link to="/projects">Projects</router-link></li>
        <li><router-link to="/tasks">Tasks</router-link></li>
        <li><router-link to="/settings">Settings</router-link></li>
      </ul>
    </nav>
    <main class="content">
      <router-view />
    </main>
    <ActivityWidget />
  </div>
</template>

<script>
import ActivityWidget from './components/ActivityWidget.vue';

export default {
  name: "App",
  components: {
    ActivityWidget
  }
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
  flex: 1;
  padding: 4px;
  overflow-y: auto;
  background-color: white;
  box-shadow: inset 2px 0 5px rgba(0, 0, 0, 0.05);
}
</style>