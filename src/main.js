import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
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
    el.setAttribute('data-tooltip', binding.value)
    el.classList.add('has-tooltip')
  },
  updated(el, binding) {
    el.setAttribute('data-tooltip', binding.value)
  }
})

// Add a dark class to html element
document.documentElement.classList.add('dark');

app.use(router);
app.mount("#app");