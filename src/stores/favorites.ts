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

  const addFavorite = (city: Omit<FavoriteCity, "id">, id?: string) => {
    if (!id) {
      return
    }

    // Check if limit would be exceeded
    if (favorites.value.length >= MAX_FAVORITES) {
      return
    }

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

  const isFavorite = (id?: string) => {
    if (!id) return false
    return favorites.value.some(fav => fav.id === id)
  }

  const toggleFavorite = (city: Omit<FavoriteCity, "id">, id?: string) => {
    if (isFavorite(id)) {
      const existing = favorites.value.find(fav => fav.id === id)
      if (existing) {
        removeFavorite(existing.id)
      }
    } else {
      addFavorite(city, id)
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
