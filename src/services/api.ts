import axios from "axios"
import type {
  GetCoordinatesResponse,
  GetCurrentWeatherResponse,
} from "../interfaces"

type LatLon = {
  lat: number
  lon: number
}

const client = axios.create({
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
    "http://api.openweathermap.org/geo/1.0/direct",
    {
      params: {
        query,
        limit: 5,
      },
    }
  )
  return response.data
}

export const getCurrentWeather = async ({ lat, lon }: LatLon) => {
  const response = await client.get<GetCurrentWeatherResponse>(
    "https://api.openweathermap.org/data/2.5/weather",
    {
      params: {
        lat,
        lon,
      },
    }
  )
  return response.data
}

export const getHourlyForecast = async ({ lat, lon }: LatLon) => {
  const response = await client.get<GetCurrentWeatherResponse>(
    "https://pro.openweathermap.org/data/2.5/forecast/hourly",
    {
      params: {
        lat,
        lon,
        cnt: 24,
      },
    }
  )
  return response.data
}
