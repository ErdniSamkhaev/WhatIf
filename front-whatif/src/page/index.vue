<template>
  <div class="main-container">
    <div class="program-window">
      <div class="empty"></div>
      <div class="flex-column-b">
        <span class="your-question">Ваш вопрос:</span>
        <div class="rectangle"></div>
		<div class="trans_input">
        <span class="write-here"><input type="text" id="text" placeholder="Напишите здесь..." size=120></span>
		</div>
        <div class="rectangle-1"></div>
        <div class="rectangle-2"><textarea name="comment" cols="55" rows="42"></textarea></div>
      </div>
      <div class="flex-column">
        <div class="polygon"></div>
        <div class="nv-plans"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style src="./index.css"></style>
