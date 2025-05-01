<template>
  <div>
    <div style="text-align: center; margin-bottom: 2em">
      <h1 style="font-size: 2.5em; font-weight: bold; color: #fff">
        WhatIf - Альтернативная история
      </h1>
      <p style="margin-top: 1em; font-size: 1.2em; color: #ccc">
        Исследуйте альтернативные сценарии развития истории России
      </p>
    </div>

    <div
      style="
        background: #fff;
        color: #222;
        border-radius: 12px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.07);
        padding: 2em;
        max-width: 600px;
        margin: 0 auto;
      "
    >
      <form @submit.prevent="submitQuery">
        <div style="margin-bottom: 1em">
          <label
            for="query"
            style="
              display: block;
              font-size: 1em;
              color: #333;
              margin-bottom: 0.5em;
            "
          >
            Ваш вопрос
          </label>
          <textarea
            id="query"
            v-model="query"
            rows="4"
            style="
              width: 100%;
              border-radius: 8px;
              border: 1px solid #ccc;
              padding: 0.5em;
              font-size: 1em;
            "
            placeholder="Например: Что было бы, если Александр II не отменил крепостное право?"
          ></textarea>
        </div>
        <div style="text-align: right">
          <button
            type="submit"
            :disabled="loading"
            style="
              padding: 0.6em 1.2em;
              border-radius: 8px;
              border: none;
              background: #4f46e5;
              color: #fff;
              font-weight: 500;
              font-size: 1em;
              cursor: pointer;
              opacity: 1;
            "
            :style="{
              opacity: loading ? 0.5 : 1,
              cursor: loading ? 'not-allowed' : 'pointer',
            }"
          >
            Сгенерировать сценарий
          </button>
        </div>
      </form>
    </div>

    <div v-if="loading" style="text-align: center; margin-top: 2em">
      <div
        style="
          margin: 0 auto;
          border: 4px solid #e0e0e0;
          border-top: 4px solid #4f46e5;
          border-radius: 50%;
          width: 48px;
          height: 48px;
          animation: spin 1s linear infinite;
        "
      ></div>
      <p style="margin-top: 1em; color: #ccc">Генерация сценария...</p>
    </div>

    <ErrorMessage :error="error" />

    <ScenarioCard v-if="currentScenario" :scenario="currentScenario" />
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useHistoryStore } from "../store/history";
import { storeToRefs } from "pinia";
import ErrorMessage from "../components/ErrorMessage.vue";
import ScenarioCard from "../components/ScenarioCard.vue";

const store = useHistoryStore();
const { loading, error, currentScenario } = storeToRefs(store);
const query = ref("");

const submitQuery = async () => {
  if (!query.value.trim()) return;
  await store.generateScenario(query.value);
};
</script>

<style>
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
