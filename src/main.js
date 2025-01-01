import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from 'pinia';
import '@vueuse/core';

// Import styles in correct order
import './styles/tailwind.css'
import './styles/variables.css'
import './styles/base.css'
import './styles/components.css'

const app = createApp(App);
const pinia = createPinia();

// Global tooltip directive
app.directive('tooltip', {
  mounted(el, binding) {
    el.setAttribute('title', binding.value);
    el.classList.add('tooltip-trigger');
  },
  updated(el, binding) {
    el.setAttribute('title', binding.value);
  }
});

// Theme configuration
document.documentElement.classList.add('dark');

app.use(router);
app.use(pinia);
app.mount("#app");