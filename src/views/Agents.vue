<template>
  <div class="agents-view">
    <!-- ...existing code... -->
    
    <!-- Wrap password input in form -->
    <form @submit.prevent class="auth-form">
      <input 
        type="password"
        v-model="password"
        required
        class="password-input"
      />
    </form>

    <!-- Import and use vue-tags-input -->
    <VueTagsInput
      v-model="tag"
      :tags="tags"
      @tags-changed="newTags => tags = newTags"
    />
    
    <!-- ...existing code... -->
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { VueTagsInput } from '@vojtechportes/vue-tags-input'

const tag = ref('')
const tags = ref([])
const password = ref('')

// ...existing code...
</script>
