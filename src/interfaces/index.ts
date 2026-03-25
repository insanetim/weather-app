export type LatLon = {
  lat: number
  lon: number
}

export interface CoordinatesResponse {
  name: string
  local_names: Record<string, string>
  lat: number
  lon: number
  country: string
  state: string
}

type BaseResponse = {
  cod: string
  message: number
}

type MainType = {
  temp: number
  feels_like: number
  pressure: number
  humidity: number
  temp_min: number
  temp_max: number
  sea_level: number
  grnd_level: number
}

type WeatherType = {
  id: number
  main: string
  description: string
  icon: string
}

export type CurrentWeatherResponse = BaseResponse & {
  coord: {
    lon: number
    lat: number
  }
  weather: WeatherType
  base: string
  main: MainType
  visibility: number
  wind: {
    speed: number
    deg: number
    gust: number
  }
  clouds: {
    all: number
  }
  rain: {
    "1h": number
  }
  snow: {
    "1h": number
  }
  dt: number
  sys: {
    type: number
    id: number
    message: string
    country: string
    sunrise: number
    sunset: number
  }
  timezone: number
  id: number
  name: string
}

type ForecastItem = {
  dt: number
  main: MainType
  weather: WeatherType
  clouds: {
    all: number
  }
  wind: {
    speed: number
    deg: number
    gust: number
  }
  rain: {
    "1h": number
  }
  snow: {
    "1h": number
  }
  visibility: number
  pop: number
  sys: {
    pod: string
  }
  dt_txt: string
}

type CityDetails = {
  id: number
  name: string
  coord: {
    lat: number
    lon: number
  }
  country: string
  timezone: number
  sunrise: number
  sunset: number
}

export type ForecastResponse = BaseResponse & {
  cnt: number
  list: ForecastItem[]
  city: CityDetails
}
