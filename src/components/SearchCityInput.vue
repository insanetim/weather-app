<script setup lang="ts">
import { Search } from "lucide-vue-next"
import { ref } from "vue"
import type { CoordinatesResponse } from "../interfaces"
import { debounce } from "../utils/debounce"

interface Props {
  dropdownItems: CoordinatesResponse[]
  onSearchChange: (value: string) => void
  onCitySelected: (item: CoordinatesResponse) => void
}

const props = defineProps<Props>()

const searchValue = ref("")
const isOpen = ref(false)

const debouncedSearchChange = debounce((value: string) => {
  props.onSearchChange(value)
}, 500)

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  searchValue.value = target.value
  debouncedSearchChange(target.value)
  isOpen.value = true
}

const selectItem = (item: CoordinatesResponse) => {
  searchValue.value = item.name
  isOpen.value = false
  props.onCitySelected(item)
}

const handleBlur = () => {
  setTimeout(() => {
    isOpen.value = false
  }, 200)
}

const handleFocus = () => {
  if (props.dropdownItems.length > 0) {
    isOpen.value = true
  }
}
</script>

<template>
  <div class="search-city-input">
    <div class="input-wrapper">
      <Search
        class="search-icon"
        :size="20"
      />
      <input
        v-model="searchValue"
        type="text"
        placeholder="Search City"
        class="search-input"
        @input="handleInput"
        @focus="handleFocus"
        @blur="handleBlur"
      />
    </div>

    <div
      v-if="isOpen && dropdownItems.length > 0"
      class="dropdown"
    >
      <div
        v-for="item in dropdownItems"
        :key="item.name"
        class="dropdown-item"
        @mousedown="selectItem(item)"
      >
        <div class="city-info">
          <span
            v-if="item.country"
            :class="`fi fi-${item.country.toLowerCase()}`"
            :title="item.country"
            class="country-flag"
          ></span>
          <div
            v-else
            class="no-flag"
          >
            ?
          </div>
          <div class="city-details">
            <div class="city-title">
              <span class="city-name">{{ item.name }}</span
              ><span
                v-if="item.state"
                class="state-name"
                >, {{ item.state }}</span
              >
            </div>
            <div class="coordinates">
              {{ item.lat.toFixed(4) }}, {{ item.lon.toFixed(4) }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.search-city-input {
  position: relative;
  width: 100%;
  max-width: 400px;
}

.input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.search-icon {
  position: absolute;
  left: 12px;
  color: var(--text-secondary, #6b7280);
  pointer-events: none;
  z-index: 1;
}

.search-input {
  width: 100%;
  padding: 12px 16px 12px 44px;
  border: 1px solid var(--border, #e5e7eb);
  border-radius: 8px;
  font-size: 16px;
  background-color: var(--bg-primary, #ffffff);
  color: var(--text, #111827);
  transition: all 0.2s ease;
  outline: none;
}

.search-input:focus {
  border-color: var(--accent, #3b82f6);
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.search-input::placeholder {
  color: var(--text-secondary, #9ca3af);
}

.dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background-color: var(--bg-primary, #ffffff);
  border: 1px solid var(--border, #e5e7eb);
  border-radius: 8px;
  margin-top: 4px;
  max-height: 330px;
  overflow-y: auto;
  z-index: 1000;
  box-shadow:
    0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.dropdown-item {
  padding: 8px 12px;
  cursor: pointer;
  transition: background-color 0.2s ease;
  border-bottom: 1px solid var(--border-light, #f3f4f6);
  color: var(--text, #111827);
  height: 65.5px;
  display: flex;
  align-items: center;
}

.city-info {
  display: flex;
  align-items: center;
  gap: 16px;
  width: 100%;
}

.city-details {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.city-title {
  display: flex;
  align-items: center;
  gap: 4px;
}

.state-name {
  font-size: 12px;
  color: var(--text-secondary, #6b7280);
  font-weight: normal;
  opacity: 0.8;
}

.coordinates {
  font-size: 11px;
  color: var(--text-secondary, #6b7280);
  font-family: var(--mono, ui-monospace, Consolas, monospace);
}

.country-flag {
  width: 28px;
  height: 21px;
  border-radius: 3px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.no-flag {
  width: 28px;
  height: 21px;
  border-radius: 3px;
  background: #e5e7eb;
  color: #6b7280;
  font-size: 10px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #d1d5db;
}

.city-name {
  font-weight: 500;
  color: var(--text, #111827);
}

.country-name {
  font-size: 12px;
  color: var(--text-secondary, #6b7280);
  margin-left: auto;
}

.dropdown-item:last-child {
  border-bottom: none;
}

.dropdown-item:hover {
  background-color: var(--accent-bg, #eff6ff);
}

.dropdown-item:first-child:hover {
  border-radius: 8px 8px 0 0;
}

.dropdown-item:last-child:hover {
  border-radius: 0 0 8px 8px;
}

.dropdown-item:only-child:hover {
  border-radius: 8px;
}
</style>
