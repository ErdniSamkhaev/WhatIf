<template>
  <div class="space-y-8">
    <div class="text-center">
      <h1 class="text-4xl font-bold text-white">
        WhatIf - Альтернативная история
      </h1>
      <p class="mt-4 text-xl text-gray-200">
        Исследуйте альтернативные сценарии развития истории России
      </p>
    </div>

    <div class="bg-white/90 backdrop-blur-sm shadow rounded-lg p-6">
      <form @submit.prevent="submitQuery" class="space-y-6">
        <div>
          <label for="query" class="block text-sm font-medium text-gray-700">
            Ваш вопрос
          </label>
          <div class="mt-1">
            <textarea
              id="query"
              v-model="query"
              rows="4"
              class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md text-gray-900 placeholder-gray-500"
              placeholder="Например: Что было бы, если Александр II не отменил крепостное право?"
            ></textarea>
          </div>
        </div>

        <div class="flex items-center justify-end">
          <button
            class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
            type="submit"
            :disabled="loading"
          >
            Сгенерировать сценарий
          </button>
        </div>
      </form>
    </div>

    <div v-if="loading" class="text-center">
      <div
        class="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"
      ></div>
      <p class="mt-4 text-white">Генерация сценария...</p>
    </div>

    <div v-if="error" class="bg-red-50 border border-red-200 rounded-lg p-4">
      <p class="text-red-700">{{ error }}</p>
    </div>

    <div
      v-if="currentScenario"
      class="bg-white/90 backdrop-blur-sm shadow rounded-lg p-6"
    >
      <h2 class="text-2xl font-bold text-gray-900 mb-4">Результат</h2>
      <div class="prose max-w-none text-gray-900">
        {{ currentScenario.text }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useHistoryStore } from "../store/history";
import { storeToRefs } from "pinia";

const store = useHistoryStore();
const { loading, error, currentScenario } = storeToRefs(store);
const query = ref("");

const submitQuery = async () => {
  if (!query.value.trim()) return;
  await store.generateScenario(query.value);
};
</script>

<style scoped>
/* Добавим стили для текстового поля */
textarea {
  @apply bg-white text-gray-900;
}

/* Стили для placeholder */
textarea::placeholder {
  @apply text-gray-500;
}

/* Стили для текста в карточках */
.bg-white {
  @apply text-gray-900;
}
</style>
