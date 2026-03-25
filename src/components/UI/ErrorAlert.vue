<script setup lang="ts">
interface Props {
  message: string
}

defineProps<Props>()
</script>

<template>
  <div class="error-alert">
    <div class="error-icon">⚠️</div>
    <div class="error-message">{{ message }}</div>
  </div>
</template>

<style scoped>
.error-alert {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  background-color: #fef2f2;
  border: 1px solid #fecaca;
  border-radius: 8px;
  color: #dc2626;
  font-size: 14px;
}

.error-icon {
  font-size: 16px;
}

.error-message {
  font-weight: 500;
}
</style>
