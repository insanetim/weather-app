<script setup lang="ts">
import { Star, Trash2 } from "lucide-vue-next"
import { computed, onMounted, ref, watch } from "vue"
import type {
  CoordinatesResponse,
  CurrentWeatherResponse,
  ForecastResponse,
} from "../interfaces"
import {
  getCoordinatesByLocationName,
  getCurrentWeather,
  getForecast,
} from "../services/api"
import { useFavoritesStore } from "../stores/favorites"
import SearchCityInput from "./SearchCityInput.vue"
import Button from "./UI/Button.vue"
import Modal from "./UI/Modal.vue"
import WeatherCard from "./WeatherCard.vue"
import WeatherChart from "./WeatherChart.vue"

interface Props {
  removable?: boolean
  withSearch?: boolean
  initialCity?: CoordinatesResponse
}

const props = withDefaults(defineProps<Props>(), {
  removable: true,
  withSearch: true,
  initialCity: undefined,
})

const emit = defineEmits<{
  remove: []
}>()

const query = ref("")
const city = ref<CoordinatesResponse | null>(null)
const dropdownItems = ref<CoordinatesResponse[]>([])

const favoritesStore = useFavoritesStore()
const showLimitModal = ref(false)

const handleSearchChange = (value: string) => {
  query.value = value
}

const handleCitySelected = (item: CoordinatesResponse) => {
  city.value = item
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
const currentWeather = ref<CurrentWeatherResponse | null>(null)
const forecastData = ref<ForecastResponse | null>(null)
const loading = ref(false)
const error = ref<string | null>(null)

const handleTabChange = (value: string) => {
  activeView.value = value
}

const loadCurrentWeather = async () => {
  if (!city.value) return

  loading.value = true
  error.value = null

  try {
    const data = await getCurrentWeather({
      lat: city.value.lat,
      lon: city.value.lon,
    })
    currentWeather.value = data
  } catch (err) {
    error.value = "Failed to load current weather"
    console.error(err)
  } finally {
    loading.value = false
  }
}

const loadForecast = async () => {
  if (!city.value) return

  loading.value = true
  error.value = null

  try {
    const data = await getForecast({
      lat: city.value.lat,
      lon: city.value.lon,
    })
    forecastData.value = data
  } catch (err) {
    error.value = "Failed to load weekly forecast"
    console.error(err)
  } finally {
    loading.value = false
  }
}

// Computed property for weather data
const weatherDataComputed = computed(() => {
  if (activeView.value === "current" && currentWeather.value) {
    return {
      temperature: currentWeather.value.main?.temp || 0,
      feelsLike: currentWeather.value.main?.feels_like || 0,
      weatherIcon: currentWeather.value.weather?.[0].icon || "01d",
      weatherDescription:
        currentWeather.value.weather?.[0].description || "Unknown",
    }
  } else if (activeView.value === "forecast" && forecastData.value) {
    // Calculate average values from forecast list
    const temps = forecastData.value.list.map(item => item.main.temp)
    const avgTemp =
      temps.length > 0
        ? Math.round(temps.reduce((sum, temp) => sum + temp, 0) / temps.length)
        : 0

    const feelsLikes = forecastData.value.list.map(item => item.main.feels_like)
    const avgFeelsLike =
      feelsLikes.length > 0
        ? Math.round(
            feelsLikes.reduce((sum, feel) => sum + feel, 0) / feelsLikes.length
          )
        : 0

    // Find most common weather condition
    const weatherConditions = forecastData.value.list.map(
      item => item.weather?.[0]?.description || ""
    )

    // Count frequency of each weather condition
    const weatherCounts: Record<string, number> = {}
    weatherConditions.forEach(condition => {
      if (condition) {
        weatherCounts[condition] = (weatherCounts[condition] || 0) + 1
      }
    })

    // Find the weather condition with highest count
    const mostCommonWeather =
      Object.keys(weatherCounts).length > 0
        ? Object.keys(weatherCounts).reduce((a, b) =>
            weatherCounts[a] > weatherCounts[b] ? a : b
          )
        : "Unknown"

    return {
      temperature: avgTemp,
      feelsLike: avgFeelsLike,
      weatherIcon: mostCommonWeather
        ? forecastData.value.list[0]?.weather?.[0]?.icon || "01d"
        : "01d",
      weatherDescription: mostCommonWeather,
    }
  }

  return null
})

watch(
  [() => city.value, () => activeView.value],
  async ([newCity, newView]) => {
    if (!newCity) return

    if (newView === "current") {
      await loadCurrentWeather()
    } else {
      await loadForecast()
    }
  },
  { immediate: true }
)

const handleToggleFavorite = () => {
  if (city.value) {
    // Check if adding would exceed limit
    if (
      !favoritesStore.isFavorite(city.value) &&
      favoritesStore.favorites.length >= favoritesStore.MAX_FAVORITES
    ) {
      showLimitModal.value = true
      return
    }

    favoritesStore.toggleFavorite(city.value)
  }
}

const closeLimitModal = () => {
  showLimitModal.value = false
}

onMounted(() => {
  // Initialize with favorite city if provided
  if (props.initialCity) {
    city.value = props.initialCity
  }
})

const isCurrentCityFavorite = computed(() => {
  return city.value ? favoritesStore.isFavorite(city.value) : false
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
          @click="handleToggleFavorite"
          variant="outlined"
          color="primary"
          :title="
            isCurrentCityFavorite ? 'Remove from favorites' : 'Add to favorites'
          "
        >
          <Star
            class="action-icon"
            :class="{ filled: isCurrentCityFavorite }"
          />
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
      <div class="view-buttons">
        <Button
          v-for="view in [
            { label: 'Today', value: 'current' },
            { label: '5 Day Forecast', value: 'forecast' },
          ]"
          :key="view.value"
          @click="handleTabChange(view.value)"
          :variant="activeView === view.value ? 'contained' : 'outlined'"
          size="small"
        >
          {{ view.label }}
        </Button>
      </div>
      <WeatherCard
        :city-name="city?.name"
        :state="city?.state"
        :country="city?.country"
        :temperature="weatherDataComputed?.temperature"
        :feels-like="weatherDataComputed?.feelsLike"
        :weather-icon="weatherDataComputed?.weatherIcon"
        :weather-description="weatherDataComputed?.weatherDescription"
        :loading="loading"
        :error="error || undefined"
      />
    </div>

    <WeatherChart />

    <!-- Favorites Limit Modal -->
    <Modal
      :open="showLimitModal"
      title="Favorites Limit Reached"
      :on-cancel="closeLimitModal"
      cancel-text="Close"
      @close="closeLimitModal"
    >
      <p>
        You have reached the maximum limit of
        {{ favoritesStore.MAX_FAVORITES }} favorite cities. Remove some existing
        favorites to add new ones.
      </p>
    </Modal>
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

.action-icon.filled {
  fill: currentColor;
}

.placeholder-text {
  text-align: center;
  color: var(--text-secondary);
  font-size: 16px;
  padding: 60px 20px;
}

.card-container {
  min-height: 267px;
  display: flex;
  flex-direction: column;
  justify-content: end;
  border: 1px solid var(--border);
  position: relative;
  border-radius: 8px;
  padding: 16px;
  padding-top: 48px;
  background-color: var(--bg);
}

.view-buttons {
  position: absolute;
  top: 8px;
  left: 8px;
  display: flex;
  gap: 4px;
  z-index: 1;
}

.view-buttons .button {
  font-size: 14px;
  padding: 6px 12px;
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
</style>
