<template>
  <div class="app-bg">
    <div class="container"></div>
    <main class="main-content">
      <router-view />
    </main>
  </div>
</template>

<script setup></script>

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
