<script setup></script>

<template>
  <button class="button">
    <slot>Button</slot>
  </button>
</template>

<style scoped>
.button {
  width: 100%;
  height: 53px;
  border: none;
  border-radius: 10px;
  background: var(--gradient);
  padding: 14px;
  font-family: var(--font);
  font-size: 20px;
  font-weight: 600;
  color: var(--color-primary);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 9px;
}
.button:hover {
  background: var(--gradient-inverted);
}
</style>
