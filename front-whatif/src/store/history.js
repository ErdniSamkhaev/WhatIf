/**
 * Store для управления историческими сценариями.
 * Отвечает за:
 * - Хранение текущего и предыдущих сценариев
 * - Управление состоянием загрузки
 * - Обработку ошибок
 * - Генерацию новых сценариев
 */
import { defineStore } from "pinia";
import { generateScenario } from "../api/history";

const CACHE_KEY = "whatif-scenarios";
const CACHE_EXPIRY = 24 * 60 * 60 * 1000; // 24 часа

export const useHistoryStore = defineStore("history", {
  state: () => ({
    scenarios: [],
    currentScenario: null,
    loading: false,
    error: null,
  }),

  actions: {
    loadFromCache() {
      const cached = localStorage.getItem(CACHE_KEY);
      if (cached) {
        const { data, timestamp } = JSON.parse(cached);
        if (Date.now() - timestamp < CACHE_EXPIRY) {
          this.scenarios = data;
        }
      }
    },

    saveToCache() {
      localStorage.setItem(
        CACHE_KEY,
        JSON.stringify({
          data: this.scenarios,
          timestamp: Date.now(),
        })
      );
    },

    async generateScenario(query) {
      this.loading = true;
      this.error = null;
      try {
        const data = await generateScenario(query);
        this.currentScenario = data;
        this.scenarios.unshift(data);
        this.saveToCache();
      } catch (error) {
        this.error = error.message;
      } finally {
        this.loading = false;
      }
    },
  },

  onMounted() {
    this.loadFromCache();
  },
});
