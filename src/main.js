import { createApp } from "vue";
import App from "./App.vue";
import router from "./router"; // This will now point to src/router.js
import '@vueuse/core'

// Import styles in correct order
import './styles/tailwind.css'       // Tailwind first
import './styles/variables.css'      // Then variables
import './styles/base.css'          // Then base styles
import './styles/components.css'    // Then components

const app = createApp(App);

// Simple tooltip directive
app.directive('tooltip', {
  mounted(el, binding) {
    el.setAttribute('title', binding.value);
    el.classList.add('tooltip-trigger');
  },
  updated(el, binding) {
    el.setAttribute('title', binding.value);
  }
})

// Add a dark class to html element
document.documentElement.classList.add('dark');

app.use(router);
app.mount("#app");