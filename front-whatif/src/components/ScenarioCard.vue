<template>
  <div class="scenario-card" :class="{ 'is-new': isNew }">
    <div class="scenario-header">
      <h2>Альтернативный сценарий</h2>
      <span class="scenario-date">{{ formattedDate }}</span>
    </div>
    <div class="scenario-content">
      {{ scenario.text }}
    </div>
    <div v-if="scenario.sources && scenario.sources.length" class="sources-block">
      <h3>Источники информации:</h3>
      <ul>
        <li v-for="(source, idx) in scenario.sources" :key="idx">
          <span v-if="source.title">{{ source.title }}</span>
          <span v-if="source.url">
            <a :href="source.url" target="_blank" rel="noopener noreferrer">
              {{ source.url }}
            </a>
          </span>
          <span v-if="source.reliability !== undefined">
            (Надежность: {{ Math.round(source.reliability * 100) }}%)
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
// ScenarioCard.vue — карточка для вывода одного сценария.
//
// Пропсы:
//   - scenario (Object, required): объект сценария с текстом.
//
// Локальное состояние:
//   - isNew: флаг для анимации/выделения только что появившейся карточки (снимается через 2 секунды)
//   - formattedDate: текущая дата в формате "день месяц год" (ru-RU)
//
// Жизненный цикл:
//   - onMounted: через 2 секунды убирает выделение "is-new"
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
  background: #23272f;
  color: #fff;
  border-radius: 12px;
  padding: 1.5rem;
  margin: 1rem 0;
  transition: all var(--transition-duration);
  max-width: 600px;
  margin: 1rem auto;
}

.scenario-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.scenario-date {
  font-size: 0.9rem;
  color: #fff;
}

.scenario-content {
  line-height: 1.6;
  color: #fff;
}

.is-new {
  border-left: 4px solid var(--primary-color);
}
.sources-block {
  margin-top: 1.5em;
  background: #222a35;
  border-radius: 8px;
  padding: 1em;
}
.sources-block h3 {
  margin: 0 0 0.5em 0;
  color: #aabbee;
  font-size: 1.1em;
}
.sources-block ul {
  list-style: none;
  padding: 0;
  margin: 0;
}
.sources-block li {
  margin-bottom: 0.5em;
  color: #fff;
  font-size: 0.98em;
}
.sources-block a {
  color: #4f8cff;
  text-decoration: underline;
  word-break: break-all;
}
.sources-block a:hover {
  color: #82b1ff;
}
</style>
