<script setup lang="ts">
import { ref } from "vue"
import FavouritesContent from "./FavoritesContent.vue"
import MainContent from "./MainContent.vue"
import Tabs from "./UI/Tabs.vue"

const activeTab = ref("main")

const handleTabChange = (value: string) => {
  activeTab.value = value
}
</script>

<template>
  <div class="dashboard-wrapper">
    <Tabs
      :tabs="[
        { label: 'Main', value: 'main' },
        { label: 'Favourites', value: 'favourites' },
      ]"
      default-tab="main"
      @tab-change="handleTabChange"
    >
      <keep-alive>
        <MainContent v-if="activeTab === 'main'" />
        <FavouritesContent v-else-if="activeTab === 'favourites'" />
      </keep-alive>
    </Tabs>
  </div>
</template>

<style scoped>
.dashboard-wrapper {
  margin-top: 48px;
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 20px;
  background-color: var(--bg);
}
</style>
