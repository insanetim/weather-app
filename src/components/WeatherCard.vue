<script setup lang="ts">
import ErrorAlert from "./UI/ErrorAlert.vue"
import Loading from "./UI/Loading.vue"

interface Props {
  cityName?: string
  state?: string
  country?: string
  temperature?: number
  feelsLike?: number
  weatherIcon?: string
  weatherDescription?: string
  loading?: boolean
  error?: string
}

const props = defineProps<Props>()

// Helper functions for weather data
const getTemperature = (temp: number) => Math.round(temp - 273.15)
</script>

<template>
  <div class="weather-card">
    <Loading
      v-if="loading"
      message="Loading weather data..."
    />
    <ErrorAlert
      v-else-if="error"
      :message="error"
    />
    <div
      v-else-if="!cityName"
      class="placeholder-text"
    >
      Select a city to view weather information
    </div>
    <div v-else>
      <div class="weather-header">
        <div class="location-info">
          <span
            v-if="country"
            :class="`fi fi-${country.toLowerCase()}`"
            :title="country"
            class="country-flag"
          ></span>
          <div
            v-else
            class="no-flag"
          >
            ?
          </div>
          <div class="location-details">
            <h3 class="city-name">{{ cityName }}</h3>
            <span
              v-if="state"
              class="state-name"
              >{{ state }}</span
            >
          </div>
        </div>
        <div class="temperature-display">
          <div
            v-if="temperature"
            class="temperature"
          >
            {{ getTemperature(temperature) }}°C
          </div>
          <div
            v-if="feelsLike"
            class="feels-like"
          >
            Feels like {{ getTemperature(feelsLike) }}°C
          </div>
        </div>
      </div>

      <div class="weather-main">
        <div class="weather-icon-container">
          <img
            v-if="weatherIcon"
            :src="`https://openweathermap.org/img/wn/${weatherIcon}@2x.png`"
            :alt="weatherDescription"
            class="weather-icon"
          />
          <div class="weather-description">{{ weatherDescription }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.weather-card {
  border-radius: 12px;
  background-color: var(--bg);
}

.placeholder-text {
  text-align: center;
  color: var(--text-secondary);
  font-size: 16px;
  padding: 60px 20px;
}

.weather-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 20px;
}

.location-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.country-flag {
  width: 32px;
  height: 24px;
  border-radius: 4px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.no-flag {
  width: 32px;
  height: 24px;
  border-radius: 4px;
  background: #e5e7eb;
  color: #6b7280;
  font-size: 12px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #d1d5db;
}

.location-details {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.city-name {
  font-size: 18px;
  font-weight: 600;
  color: var(--text-h);
  margin: 0;
}

.state-name {
  font-size: 14px;
  color: var(--text-secondary);
  font-weight: normal;
}

.temperature-display {
  text-align: right;
}

.temperature {
  font-size: 36px;
  font-weight: bold;
  color: var(--accent);
  line-height: 1;
}

.feels-like {
  font-size: 14px;
  color: var(--text-secondary);
  margin-top: 4px;
}

.weather-main {
  display: flex;
  justify-content: center;
}

.weather-icon-container {
  text-align: center;
}

.weather-icon {
  width: 80px;
  height: 80px;
}

.weather-description {
  font-size: 16px;
  color: var(--text);
  margin-top: 8px;
  text-transform: capitalize;
}

@media (max-width: 768px) {
  .weather-header {
    flex-direction: column;
    gap: 16px;
    align-items: center;
  }

  .temperature-display {
    text-align: center;
  }
}
</style>
