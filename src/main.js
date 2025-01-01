import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from 'pinia';
import '@vueuse/core';
import VTooltip from 'v-tooltip';

// Import styles in correct order
import './styles/tailwind.css'
import './styles/variables.css'
import './styles/base.css'
import './styles/components.css'

// Create app instance
const app = createApp(App);
app.use(VTooltip);

// Initialize Pinia
const pinia = createPinia();
app.use(pinia);

// Add router
app.use(router);

// Mount app
app.mount("#app");

// Log initialization
console.log('App initialized');