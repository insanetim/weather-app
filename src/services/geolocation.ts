import type { CoordinatesResponse } from "../interfaces"

/**
 * Get user's approximate location based on IP address
 * @returns Promise<CoordinatesResponse | null>
 */
export const getLocationByIP =
  async (): Promise<CoordinatesResponse | null> => {
    try {
      // Using a free IP geolocation service
      const response = await fetch("https://ipapi.co/json/")

      if (!response.ok) {
        throw new Error("Failed to fetch location data")
      }

      const data = await response.json()

      if (data.error) {
        throw new Error(data.reason || "Location lookup failed")
      }

      // Transform the response to match our CoordinatesResponse interface
      const location: CoordinatesResponse = {
        name: data.city || "Unknown",
        local_names: {},
        lat: data.latitude || 0,
        lon: data.longitude || 0,
        country: data.country_code || "Unknown",
        state: data.region || "",
      }

      return location
    } catch (error) {
      console.error("Error getting location by IP:", error)
      return null
    }
  }
