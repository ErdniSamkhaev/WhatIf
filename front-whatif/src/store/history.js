import { defineStore } from "pinia";
import { generateScenario } from "../api/history";

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
        const data = await generateScenario(query);
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
