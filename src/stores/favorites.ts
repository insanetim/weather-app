import { defineStore } from "pinia"
import { ref } from "vue"
import type { FavoriteCity } from "../interfaces"
import { localStorageService } from "../services/localStorage"

export const useFavoritesStore = defineStore("useFavoritesStore", () => {
  const STORAGE_KEY = "weather-app-favorites"
  const MAX_FAVORITES = 5
  const favorites = ref<FavoriteCity[]>([])

  const loadFavorites = () => {
    const savedFavorites =
      localStorageService.getItem<FavoriteCity[]>(STORAGE_KEY) || []
    favorites.value = savedFavorites
  }

  const saveFavorites = () => {
    localStorageService.setItem(STORAGE_KEY, favorites.value)
  }

  const generateCityId = (city: Omit<FavoriteCity, "id">) => {
    return `${city.name}-${city.lat}-${city.lon}`
      .toLowerCase()
      .replace(/\s+/g, "-")
  }

  const addFavorite = (city: Omit<FavoriteCity, "id">) => {
    // Check if limit would be exceeded
    if (favorites.value.length >= MAX_FAVORITES) {
      return
    }

    const id = generateCityId(city)

    // Check if favorite with this id already exists
    const existingIndex = favorites.value.findIndex(fav => fav.id === id)

    if (existingIndex > -1) {
      return
    }

    const favoriteCity: FavoriteCity = {
      ...city,
      id,
    }

    favorites.value.unshift(favoriteCity)
    saveFavorites()
  }

  const removeFavorite = (id: string) => {
    const index = favorites.value.findIndex(fav => fav.id === id)
    if (index > -1) {
      favorites.value.splice(index, 1)
      saveFavorites()
    }
  }

  const isFavorite = (city: Omit<FavoriteCity, "id">) => {
    const id = generateCityId(city)
    return favorites.value.some(fav => fav.id === id)
  }

  const toggleFavorite = (city: Omit<FavoriteCity, "id">) => {
    if (isFavorite(city)) {
      const id = generateCityId(city)
      removeFavorite(id)
    } else {
      addFavorite(city)
    }
  }

  loadFavorites()

  return {
    favorites,
    addFavorite,
    removeFavorite,
    isFavorite,
    toggleFavorite,
    MAX_FAVORITES,
  }
})
