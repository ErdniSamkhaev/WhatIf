<template>
  <div class="scenario-card" :class="{ 'is-new': isNew }">
    <div class="scenario-header">
      <h2>Альтернативный сценарий</h2>
      <span class="scenario-date">{{ formattedDate }}</span>
    </div>
    <div class="scenario-content">
      {{ scenario.text }}
    </div>
  </div>
</template>

<script setup>
import { computed, ref, onMounted } from "vue";

const props = defineProps({
  scenario: {
    type: Object,
    required: true,
  },
});

const isNew = ref(true);
const formattedDate = computed(() => {
  return new Date().toLocaleDateString("ru-RU", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
});

onMounted(() => {
  setTimeout(() => {
    isNew.value = false;
  }, 2000);
});
</script>

<style scoped>
.scenario-card {
  animation: fadeIn 0.5s ease-out;
  background: var(--card-background);
  border-radius: 12px;
  padding: 1.5rem;
  margin: 1rem 0;
  transition: all var(--transition-duration);
}

.scenario-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.scenario-date {
  font-size: 0.9rem;
  color: #666;
}

.scenario-content {
  line-height: 1.6;
  color: #333;
}

.is-new {
  border-left: 4px solid var(--primary-color);
}
</style>
