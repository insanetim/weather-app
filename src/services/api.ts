import axios from "axios"
import type {
  GetCoordinatesResponse,
  GetCurrentWeatherResponse,
} from "../interfaces"

const BASE_URL = "http://api.openweathermap.org/"

const client = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
})

// Add request interceptor to append API key to all requests
client.interceptors.request.use(config => {
  const apiKey = import.meta.env.VITE_OPEN_WEATHER_API_KEY
  if (apiKey) {
    // Add appid parameter to existing params or create new params object
    config.params = {
      ...config.params,
      appid: apiKey,
    }
  }
  return config
})

export const getCoordinatesByLocationName = async (query: string) => {
  const response = await client.get<GetCoordinatesResponse[]>(
    `geo/1.0/direct?q=${query}&limit=5`
  )
  return response.data
}

export const getCurrentWeather = async ({
  lat,
  lon,
}: {
  lat: number
  lon: number
}) => {
  const response = await client.get<GetCurrentWeatherResponse>(
    `data/2.5/weather?lat=${lat}&lon=${lon}`
  )
  return response.data
}
