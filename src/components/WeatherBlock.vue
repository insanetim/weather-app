<script setup lang="ts">
import { Trash2 } from "lucide-vue-next"
import Button from "./UI/Button.vue"

interface Props {
  removable?: boolean
}

withDefaults(defineProps<Props>(), {
  removable: true,
})

const emit = defineEmits<{
  remove: []
}>()
</script>

<template>
  <div class="weather-block">
    <div class="weather-header">
      <h3>Weather Location</h3>
      <div class="header-actions">
        <div class="temperature">25°C</div>
        <Button
          v-if="removable"
          @click="emit('remove')"
          variant="outlined"
          color="danger"
          title="Remove weather block"
        >
          <Trash2 class="remove-icon" />
        </Button>
      </div>
    </div>
    <div class="weather-details">
      <div class="weather-condition">Sunny</div>
      <div class="weather-info">
        <span>Humidity: 65%</span>
        <span>Wind: 10 km/h</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.weather-block {
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 16px;
  background-color: var(--bg);
  transition: box-shadow 0.2s ease;
}

.weather-block:hover {
  box-shadow: var(--shadow);
}

.weather-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 12px;
}

.remove-icon {
  width: 20px;
  height: 20px;
}

.weather-header h3 {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: var(--text-h);
}

.temperature {
  font-size: 24px;
  font-weight: bold;
  color: var(--accent);
}

.weather-details {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.weather-condition {
  font-size: 16px;
  color: var(--text);
}

.weather-info {
  display: flex;
  gap: 16px;
  font-size: 14px;
  color: var(--text);
}
</style>
