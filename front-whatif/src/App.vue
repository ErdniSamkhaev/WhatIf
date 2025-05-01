<template>
  <div class="min-h-screen bg-image relative">
    <div class="fixed inset-0 bg-black/50 -z-10"></div>
    <nav class="bg-white/80 backdrop-blur-sm shadow-sm relative z-10">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex">
            <div class="flex-shrink-0 flex items-center">
              <h1 class="text-xl font-bold text-gray-900">WhatIf</h1>
            </div>
          </div>
        </div>
      </div>
    </nav>

    <main class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 relative z-10">
      <router-view />
    </main>
  </div>
</template>

<script setup>

</script>

<style>
.bg-image {
  /* background-image: url("./assets/photo.jpg"); */
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  min-height: 100vh;
  width: 100%;
  position: relative;
}

/* Обновим стили для карточек */
.bg-white {
  @apply bg-opacity-90 backdrop-blur-sm;
}

/* Добавим стили для текста на темном фоне */
.text-gray-600 {
  @apply text-gray-300;
}

.text-gray-900 {
  @apply text-white;
}
</style>
