<template>
  <div v-if="error" class="error-message">
    <p>{{ error }}</p>
  </div>
</template>

<script setup>
defineProps({ error: String });
</script>

<style>
.error-message {
  background: #ffeaea;
  color: #b00;
  border: 1px solid #fbb;
  border-radius: 8px;
  padding: 1em;
  margin: 1em 0;
}
</style>
