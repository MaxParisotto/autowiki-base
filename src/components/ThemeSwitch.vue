<template>
  <div id="app">
    <ThemeSwitch />
    <router-view/>
  </div>
</template>

<script>
import ThemeSwitch from './components/ThemeSwitch.vue';

export default {
  name: 'App',
  components: {
    ThemeSwitch
  }
}
</script>

<style>
body.theme-futuristic {
  --primary-color: #00f2fe;
  --secondary-color: #4facfe;
  --background-color: #1a1a1a;
  --text-light: #ffffff;
  --text-dark: #000000;
  --border-color: rgba(255, 255, 255, 0.2);
  --box-shadow-color: rgba(79, 172, 254, 0.3);
}
</style>
