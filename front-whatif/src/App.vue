<template>
  <!-- корневой компонент приложения
   основной контетнт через router-view
   компоненты рендерятся внутри main -->
  <div class="app-bg">
    <main class="main-content">
      <router-view />
    </main>
  </div>
</template>

<script setup>
// возможно добавлю глобальные обработчики событий
</script>

<style>
.app-bg {
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  min-height: 100vh;
  width: 100%;
  position: relative;
}
</style>
