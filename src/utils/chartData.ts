import { getTemperature } from "./formatters"

/**
 * Generate realistic 24-hour temperature data based on current temperature
 * @param currentTemp Current temperature in Celsius
 * @returns Array of 24 hourly temperatures
 */
export const generate24HourTemperatureData = (
  currentTemp: number
): number[] => {
  return Array.from({ length: 24 }, (_, hour) => {
    // Create realistic temperature variation based on time of day
    // Night (0-6, 20-23): cooler, Day (7-19): warmer
    let baseVariation = 0

    if (hour >= 0 && hour <= 6) {
      // Early night to early morning: coolest
      baseVariation = -4 + hour * 0.5 // Gradually warming from midnight
    } else if (hour >= 7 && hour <= 12) {
      // Morning to noon: warming up
      baseVariation = -1 + (hour - 7) * 1.5
    } else if (hour >= 13 && hour <= 16) {
      // Afternoon: peak warmth
      baseVariation = 6.5 - (hour - 13) * 0.5
    } else {
      // Evening: cooling down
      baseVariation = 5 - (hour - 17) * 1.5
    }

    // Add small random variation (±1 degree)
    const randomVariation = (Math.random() - 0.5) * 2

    return Math.round(currentTemp + baseVariation + randomVariation)
  })
}

/**
 * Generate hour labels for 24-hour chart
 * @returns Array of hour labels (0:00, 1:00, ..., 23:00)
 */
export const generate24HourLabels = (): string[] => {
  return Array.from({ length: 24 }, (_, i) => `${i}:00`)
}

/**
 * Calculate daily average temperatures from forecast data
 * @param forecastData Forecast response data
 * @returns Object with daily averages and day labels
 */
export const calculateDailyAverages = (forecastData: any) => {
  const dailyAverages: number[] = []
  const dayLabels: string[] = []

  // Group forecast data by day (5 days)
  for (let day = 0; day < 5; day++) {
    const dayStartIndex = day * 8 // 8 forecasts per day (3-hour intervals)
    const dayForecasts = forecastData.list.slice(
      dayStartIndex,
      dayStartIndex + 8
    )

    if (dayForecasts.length > 0) {
      const avgTemp =
        dayForecasts.reduce(
          (sum: number, item: any) => sum + getTemperature(item.main.temp),
          0
        ) / dayForecasts.length
      dailyAverages.push(Math.round(avgTemp))

      // Get day name from first forecast of the day
      const date = new Date(dayForecasts[0].dt * 1000)
      dayLabels.push(date.toLocaleDateString("en-US", { weekday: "short" }))
    }
  }

  return { dailyAverages, dayLabels }
}
