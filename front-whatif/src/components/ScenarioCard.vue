<template>
  <div class="scenario-card">
    <h2>Результат</h2>
    <div>{{ scenario.text }}</div>
  </div>
</template>

<script setup>
defineProps({ scenario: Object });
</script>

<style>
.scenario-card {
  background: #fff;
  color: #222;
  border-radius: 8px;
  padding: 1.5em;
  margin: 1em 0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.07);
}
</style>
