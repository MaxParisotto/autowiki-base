<template>
  <div class="min-h-screen bg-canvas">
    <div class="p-6">
      <h1 class="text-2xl font-bold mb-6 text-text-primary">{{ title }}</h1>
      <div class="space-y-6">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script></script>
export default {
  name: 'DefaultLayout',
  props: {
    title: {
      type: String,
      required: true
    }
  }
}
</script>
