/**
 * Format temperature from Kelvin to Celsius
 * @param temp Temperature in Kelvin
 * @returns Temperature in Celsius (rounded)
 */
export const getTemperature = (temp: number): number =>
  Math.round(temp - 273.15)

/**
 * Format timestamp to time string
 * @param date Date object or null
 * @returns Formatted time string (HH:MM) or empty string
 */
export const formatTimestamp = (date: Date | null): string => {
  if (!date) return ""
  return date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  })
}
