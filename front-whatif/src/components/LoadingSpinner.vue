<template>
  <div class="loading-spinner">
    <div class="spinner"></div>
    <p class="loading-text">{{ text }}</p>
  </div>
</template>

<script setup>
defineProps({
  text: {
    type: String,
    default: "Загрузка...",
  },
});
</script>

<style scoped>
.loading-spinner {
  text-align: center;
  padding: 2rem;
}

.spinner {
  margin: 0 auto;
  border: 4px solid #f3f3f3;
  border-top: 4px solid var(--primary-color);
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
}

.loading-text {
  margin-top: 1rem;
  color: var(--text-color);
}
</style>
