<script setup lang="ts">
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js"
import { computed, ref, watch } from "vue"
import { Bar } from "vue-chartjs"
import type { CurrentWeatherResponse, ForecastResponse } from "../interfaces"
import {
  calculateDailyAverages,
  generate24HourLabels,
  generate24HourTemperatureData,
} from "../utils/chartData"
import { getTemperature } from "../utils/formatters"
import ErrorAlert from "./UI/ErrorAlert.vue"
import Loading from "./UI/Loading.vue"

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip)

interface Props {
  activeView: "current" | "forecast"
  currentWeather: CurrentWeatherResponse | null
  forecastData: ForecastResponse | null
  loading: boolean
  error?: string | null
}

const props = defineProps<Props>()

// Create gradient function
const createGradient = (ctx: any) => {
  const gradient = ctx.createLinearGradient(0, 0, 0, 300)
  gradient.addColorStop(0, "#3b82f6") // Primary color on top
  gradient.addColorStop(1, "#93c5fd") // Lighter blue on bottom
  return gradient
}

const chartData = computed(() => {
  // Get canvas context for gradient creation
  const canvas = document.createElement("canvas")
  const ctx = canvas.getContext("2d")

  if (!ctx) {
    return {
      labels: [],
      datasets: [],
    }
  }

  if (props.activeView === "current" && props.currentWeather) {
    // Generate 24-hour mock data based on current temperature
    const currentTemp = getTemperature(props.currentWeather.main.temp)
    const hours = generate24HourLabels()
    const temperatures = generate24HourTemperatureData(currentTemp)

    return {
      labels: hours,
      datasets: [
        {
          label: "Temperature (°C)",
          data: temperatures,
          backgroundColor: createGradient(ctx),
          borderColor: "#3b82f6",
          borderWidth: 1,
        },
      ],
    }
  } else if (props.activeView === "forecast" && props.forecastData) {
    // Calculate average temperature for 5 days
    const { dailyAverages, dayLabels } = calculateDailyAverages(
      props.forecastData
    )

    return {
      labels: dayLabels,
      datasets: [
        {
          label: "Average Temperature (°C)",
          data: dailyAverages,
          backgroundColor: createGradient(ctx),
          borderColor: "#3b82f6",
          borderWidth: 1,
        },
      ],
    }
  }

  return {
    labels: [],
    datasets: [],
  }
})

const chartOptions = computed(
  () =>
    ({
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false,
        },
        title: {
          display: false,
        },
      } as const,
      scales: {
        y: {
          beginAtZero: false,
          title: {
            display: true,
            text: "Temperature (°C)",
          },
          // Add padding to prevent bars from touching edges
          grace: "10%", // Add 10% padding above and below data range
          ticks: {
            stepSize: 1, // Use integer steps (1°C intervals)
            callback: function (value: any) {
              return Math.round(value) // Ensure only round values are displayed
            },
          },
        },
        x: {
          title: {
            display: true,
            text: props.activeView === "current" ? "Hour" : "Day",
          },
        },
      },
    }) as const
)

const chartKey = ref(0)

// Watch for prop changes to update chart
watch(
  () => [props.activeView, props.currentWeather, props.forecastData],
  () => {
    // Force chart re-render by changing key
    chartKey.value += 1
  },
  { deep: true }
)
</script>

<template>
  <div class="chart-container">
    <Loading
      v-if="loading"
      message="Loading chart data..."
    />
    <ErrorAlert
      v-else-if="error"
      :message="error"
    />
    <Bar
      v-else-if="chartData.labels.length > 0"
      :key="chartKey"
      :data="chartData"
      :options="chartOptions"
    />
    <div
      v-else
      class="no-data"
    >
      <p>No weather data available for chart</p>
    </div>
  </div>
</template>

<style scoped>
.chart-container {
  position: relative;
  height: 300px;
  width: 100%;
  margin-top: 16px;
}

.no-data {
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-secondary);
  border: 1px solid var(--border);
  border-radius: 8px;
  background-color: var(--bg);
}
</style>
