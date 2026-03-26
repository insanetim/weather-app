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

type ClaudsType = {
  all: number
}

type MainType = {
  feels_like: number
  grnd_level: number
  humidity: number
  pressure: number
  sea_level: number
  temp: number
  temp_max: number
  temp_min: number
}

type SysType = {
  country: string
  sunrise: number
  sunset: number
}

type WeatherType = {
  description: string
  icon: string
  id: number
  main: string
}

type WindType = {
  deg: number
  gust: number
  speed: number
}

export type CurrentWeatherResponse = {
  base: string
  clouds: ClaudsType
  cod: number
  coord: LatLon
  dt: number
  id: number
  main: MainType
  name: string
  sys: SysType
  timezone: number
  visibility: number
  weather: WeatherType[]
  wind: WindType
}

type ForecastItem = {
  clouds: ClaudsType
  dt: number
  dt_txt: string
  main: MainType
  pop: number
  rain: {
    "3h": number
  }
  snow: {
    "3h": number
  }
  sys: {
    pod: string
  }
  visibility: number
  weather: WeatherType[]
  wind: WindType
}

type CityDetails = {
  coord: LatLon
  country: string
  id: number
  name: string
  population: number
  sunrise: number
  sunset: number
  timezone: number
}

export type ForecastResponse = {
  cod: string
  cnt: number
  list: ForecastItem[]
  city: CityDetails
}

export type FavoriteCity = CoordinatesResponse & {
  id: string
}
