<script setup lang="ts">
import { Plus } from "lucide-vue-next"
import { ref } from "vue"
import Button from "./UI/Button.vue"
import WeatherBlock from "./WeatherBlock.vue"

const weatherBlocks = ref([1])
const maxBlocks = 5

const addWeatherBlock = () => {
  if (weatherBlocks.value.length < maxBlocks) {
    weatherBlocks.value.push(Date.now())
  }
}

const removeWeatherBlock = (id: number) => {
  if (weatherBlocks.value.length > 1) {
    const index = weatherBlocks.value.indexOf(id)
    if (index > -1) {
      weatherBlocks.value.splice(index, 1)
    }
  }
}

const canAddMore = () => {
  return weatherBlocks.value.length < maxBlocks
}
</script>

<template>
  <div>
    <div class="weather-blocks">
      <TransitionGroup
        name="weather-block"
        tag="div"
      >
        <WeatherBlock
          v-for="block in weatherBlocks"
          :key="block"
          :removable="weatherBlocks.length > 1"
          @remove="removeWeatherBlock(block)"
        />
      </TransitionGroup>
    </div>

    <div class="button-section">
      <Button
        v-if="canAddMore()"
        @click="addWeatherBlock"
        variant="contained"
        color="primary"
        title="Add weather block"
      >
        <Plus class="button-icon" />
      </Button>

      <div
        v-if="!canAddMore()"
        class="limit-message"
      >
        Maximum of {{ maxBlocks }} weather blocks reached
      </div>
    </div>
  </div>
</template>

<style scoped>
.button-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  margin-top: 20px;
}

.button-icon {
  width: 20px;
  height: 20px;
}

.weather-blocks {
  display: flex;
  flex-direction: column;
}

.weather-blocks > div {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

/* Transition animations */
.weather-block-enter-active,
.weather-block-leave-active {
  transition: all 0.3s ease;
}

.weather-block-enter-from {
  opacity: 0;
  transform: translateY(-20px);
}

.weather-block-leave-to {
  opacity: 0;
  transform: translateX(20px);
}

.weather-block-move {
  transition: transform 0.3s ease;
}

.limit-message {
  text-align: center;
  color: var(--text);
  font-size: 14px;
  opacity: 0.7;
}
</style>
