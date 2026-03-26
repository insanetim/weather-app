import axios from "axios"
import type {
  CoordinatesResponse,
  CurrentWeatherResponse,
  ForecastResponse,
  LatLon,
} from "../interfaces"

const BASE_URL = "https://api.openweathermap.org/"

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
  const response = await client.get<CoordinatesResponse[]>("geo/1.0/direct", {
    params: { q: query, limit: 5 },
  })
  return response.data
}

export const getCurrentWeather = async ({ lat, lon }: LatLon) => {
  const response = await client.get<CurrentWeatherResponse>(
    "data/2.5/weather",
    {
      params: { lat, lon },
    }
  )
  return response.data
}

export const getForecast = async ({ lat, lon }: LatLon) => {
  const response = await client.get<ForecastResponse>("data/2.5/forecast", {
    params: { lat, lon },
  })
  return response.data
}
