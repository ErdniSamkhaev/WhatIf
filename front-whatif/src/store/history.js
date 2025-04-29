import { defineStore } from "pinia";

export const useHistoryStore = defineStore("history", {
  state: () => ({
    scenarios: [],
    currentScenario: null,
    loading: false,
    error: null,
  }),

  actions: {
    async generateScenario(query) {
      this.loading = true;
      this.error = null;
      try {
        // Здесь будет логика отправки запроса на бэкенд
        const response = await fetch('http://localhost:3000/api/generate', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ query })
          });

        if (!response.ok) {
          throw new Error("Ошибка при генерации сценария");
        }

        const data = await response.json();
        this.currentScenario = data;
        this.scenarios.unshift(data);
      } catch (error) {
        this.error = error.message;
      } finally {
        this.loading = false;
      }
    },
  },
});
