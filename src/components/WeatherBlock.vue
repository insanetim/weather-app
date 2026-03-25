<script setup lang="ts">
import { Star, Trash2 } from "lucide-vue-next"
import { ref, watch } from "vue"
import type { CoordinatesResponse, LatLon } from "../interfaces"
import { getCoordinatesByLocationName, getCurrentWeather, getDailyForecast } from "../services/api"
import CurrentWeather from "./CurrentWeather.vue"
import SearchCityInput from "./SearchCityInput.vue"
import Button from "./UI/Button.vue"
import WeatherChart from "./WeatherChart.vue"
import WeekForecast from "./WeekForecast.vue"

interface Props {
  removable?: boolean
  withSearch?: boolean
}

withDefaults(defineProps<Props>(), {
  removable: true,
  withSearch: true,
})

const emit = defineEmits<{
  remove: []
  addToFavorites: []
}>()

const query = ref("")
const coordinates = ref<LatLon>({ lat: 0, lon: 0 })
const dropdownItems = ref<CoordinatesResponse[]>([])

const handleSearchChange = (value: string) => {
  query.value = value
}

const handleCitySelected = (item: CoordinatesResponse) => {
  coordinates.value = { lat: item.lat, lon: item.lon }
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

const activeView = ref("current")

const handleTabChange = (value: string) => {
  activeView.value = value
}

// Fetch weather data based on active view
watch(activeView, async (newView) => {
  if (coordinates.value.lat !== 0 && coordinates.value.lon !== 0) {
    try {
      if (newView === 'current') {
        await getCurrentWeather(coordinates.value)
      } else if (newView === 'week') {
        await getDailyForecast(coordinates.value)
      }
    } catch (error) {
      console.error("Error fetching weather data:", error)
    }
  }
})
</script>

<template>
  <div class="weather-block">
    <div class="search-row">
      <SearchCityInput
        v-if="withSearch"
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

    <div class="card-container">
      <div class="tab-buttons">
        <Button
          v-for="tab in [
            { label: 'Today', value: 'current' },
            { label: 'Week', value: 'week' },
          ]"
          :key="tab.value"
          @click="handleTabChange(tab.value)"
          :variant="activeView === tab.value ? 'contained' : 'outlined'"
          size="small"
        >
          {{ tab.label }}
        </Button>
      </div>
      <div class="tab-content">
        <keep-alive>
          <CurrentWeather v-if="activeView === 'current'" />
          <WeekForecast v-else-if="activeView === 'week'" />
        </keep-alive>
      </div>
    </div>

    <WeatherChart />
  </div>
</template>

<style scoped>
.search-row {
  display: flex;
  align-items: center;
  gap: 12px;
}

.search-row .search-city-input {
  flex: 1;
}

.action-buttons {
  display: flex;
  gap: 8px;
  margin-left: auto;
}

.action-icon {
  width: 20px;
  height: 20px;
}

.card-container {
  border: 1px solid var(--border);
  position: relative;
  border-radius: 8px;
  padding: 16px;
  background-color: var(--bg);
}

.tab-buttons {
  position: absolute;
  top: 8px;
  left: 8px;
  display: flex;
  gap: 4px;
  z-index: 1;
}

.tab-buttons .button {
  font-size: 14px;
  padding: 6px 12px;
}

.tab-content {
  margin-top: 56px;
}

.weather-block {
  display: flex;
  flex-direction: column;
  gap: 16px;
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
