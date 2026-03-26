<script setup lang="ts">
import { MapPin } from "lucide-vue-next"
import { computed } from "vue"
import { useFavoritesStore } from "../stores/favorites"
import AnimatedList from "./UI/AnimatedList.vue"
import WeatherBlock from "./WeatherBlock.vue"

const favoritesStore = useFavoritesStore()

const hasFavorites = computed(() => favoritesStore.favorites.length > 0)
</script>

<template>
  <div class="favorites-content">
    <div
      v-if="!hasFavorites"
      class="empty-state"
    >
      <MapPin class="empty-icon" />
      <p>No favorite locations yet</p>
      <p class="empty-subtitle">
        Add cities to your favorites to see them here
      </p>
    </div>

    <div
      v-else
      class="weather-blocks"
    >
      <AnimatedList>
        <WeatherBlock
          v-for="favorite in favoritesStore.favorites"
          :key="favorite.id"
          :initial-city="favorite"
          :removable="false"
          :with-search="false"
        />
      </AnimatedList>
    </div>

    <div
      v-if="hasFavorites"
      class="favorites-footer"
    >
      <p class="footer-text">
        You can add up to {{ favoritesStore.MAX_FAVORITES }} favorite locations
        across all weather blocks.
      </p>
    </div>
  </div>
</template>

<style scoped>
.favorites-content {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.favorites-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 16px;
  border-bottom: 1px solid var(--border);
}

.favorites-header h2 {
  margin: 0;
  color: var(--text);
}

.favorites-count {
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--text-secondary);
  font-size: 14px;
}

.star-icon {
  width: 16px;
  height: 16px;
  color: var(--primary);
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  text-align: center;
  color: var(--text-secondary);
}

.empty-icon {
  width: 48px;
  height: 48px;
  margin-bottom: 16px;
  opacity: 0.5;
}

.empty-state p {
  margin: 4px 0;
}

.empty-subtitle {
  font-size: 14px;
  opacity: 0.8;
}

.weather-blocks {
  display: flex;
  flex-direction: column;
}

.weather-blocks > div {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.favorites-footer {
  padding-top: 16px;
  border-top: 1px solid var(--border);
}

.footer-text {
  margin: 0;
  font-size: 14px;
  color: var(--text-secondary);
  text-align: center;
}

@media (max-width: 768px) {
  .favorites-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
}
</style>
