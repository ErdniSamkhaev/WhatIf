/**
 * Основной файл инициализации Vue приложения.
 * Подключает основные плагины и монтирует приложение.
 *
 * Используемые плагины:
 * - Pinia для управления состоянием
 * - Vue Router для маршрутизации
 */
import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import "./style.css";

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount("#app");
