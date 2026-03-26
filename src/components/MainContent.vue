<script setup lang="ts">
import { Plus } from "lucide-vue-next"
import { nanoid } from "nanoid"
import { onMounted, ref } from "vue"
import { getLocationByIP } from "../services/geolocation"
import AnimatedList from "./UI/AnimatedList.vue"
import Button from "./UI/Button.vue"
import Modal from "./UI/Modal.vue"
import WeatherBlock from "./WeatherBlock.vue"

const weatherBlocks = ref([nanoid(5)])
const maxBlocks = 5
const showDeleteModal = ref(false)
const blockToDelete = ref<string | null>(null)
const userLocation = ref<any>(null)

const addWeatherBlock = () => {
  if (weatherBlocks.value.length < maxBlocks) {
    weatherBlocks.value.push(nanoid(5))
  }
}

const confirmDelete = (id: string) => {
  blockToDelete.value = id
  showDeleteModal.value = true
}

const removeWeatherBlock = () => {
  if (blockToDelete.value !== null) {
    const index = weatherBlocks.value.indexOf(blockToDelete.value)
    if (index > -1) {
      weatherBlocks.value.splice(index, 1)
    }
    closeDeleteModal()
  }
}

const closeDeleteModal = () => {
  showDeleteModal.value = false
  blockToDelete.value = null
}

const canAddMore = () => {
  return weatherBlocks.value.length < maxBlocks
}

// Initialize user location on component mount
onMounted(async () => {
  try {
    const location = await getLocationByIP()
    if (location) {
      userLocation.value = location
    }
  } catch (error) {
    console.error("Failed to get user location:", error)
  }
})
</script>

<template>
  <div>
    <div class="weather-blocks">
      <AnimatedList>
        <WeatherBlock
          v-for="(block, index) in weatherBlocks"
          :key="block"
          :removable="weatherBlocks.length > 1"
          :initial-city="index === 0 ? userLocation : undefined"
          @remove="confirmDelete(block)"
        />
      </AnimatedList>
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
        v-else
        class="limit-message"
      >
        Maximum of {{ maxBlocks }} weather blocks reached
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <Modal
      :open="showDeleteModal"
      title="Confirm Delete"
      :on-cancel="closeDeleteModal"
      :on-submit="removeWeatherBlock"
      cancel-text="Cancel"
      submit-text="Delete"
      @close="closeDeleteModal"
    >
      <p>Are you sure you want to remove this weather block?</p>
    </Modal>
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

.limit-message {
  text-align: center;
  color: var(--text);
  font-size: 14px;
  opacity: 0.7;
}
</style>
