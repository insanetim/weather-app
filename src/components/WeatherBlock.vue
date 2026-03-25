<script setup lang="ts">
import { Star, Trash2 } from "lucide-vue-next"
import { ref, watch } from "vue"
import type { GetCoordinatesResponse } from "../interfaces"
import { getCoordinatesByLocationName } from "../services/api"
import SearchCityInput from "./SearchCityInput.vue"
import Button from "./UI/Button.vue"

interface Props {
  removable?: boolean
}

withDefaults(defineProps<Props>(), {
  removable: true,
})

const emit = defineEmits<{
  remove: []
  addToFavorites: []
}>()

const query = ref("")
const location = ref("")
const dropdownItems = ref<GetCoordinatesResponse[]>([])

const handleSearchChange = (value: string) => {
  query.value = value
}

const handleCitySelected = (item: GetCoordinatesResponse) => {
  location.value = item.name
}

watch(query, async newQuery => {
  if (newQuery.trim()) {
    try {
      const cities = await getCoordinatesByLocationName(newQuery)
      dropdownItems.value = cities
    } catch (error) {
      console.error("Error fetching cities:", error)
      dropdownItems.value = []
    }
  } else {
    dropdownItems.value = []
  }
})
</script>

<template>
  <div class="weather-block">
    <div class="search-row">
      <SearchCityInput
        :dropdown-items="dropdownItems"
        :on-search-change="handleSearchChange"
        :on-city-selected="handleCitySelected"
      />
      <div class="action-buttons">
        <Button
          @click="emit('addToFavorites')"
          variant="outlined"
          color="primary"
          title="Add to favorites"
        >
          <Star class="action-icon" />
        </Button>
        <Button
          v-if="removable"
          @click="emit('remove')"
          variant="outlined"
          color="danger"
          title="Remove weather block"
        >
          <Trash2 class="action-icon" />
        </Button>
      </div>
    </div>
    <div class="weather-header">
      <h3>{{ location || "Weather Location" }}</h3>
      <div class="header-actions">
        <div class="temperature">25°C</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.search-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
}

.search-row .search-city-input {
  flex: 1;
}

.action-buttons {
  display: flex;
  gap: 8px;
}

.action-icon {
  width: 20px;
  height: 20px;
}

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
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 12px;
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
</style>
