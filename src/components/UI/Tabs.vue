<script setup lang="ts">
import { ref } from "vue"

interface Tab {
  label: string
  value: string
}

interface Props {
  tabs: Tab[]
  defaultTab?: string
}

const props = withDefaults(defineProps<Props>(), {
  defaultTab: "",
})

const emit = defineEmits<{
  tabChange: [value: string]
}>()

const activeTab = ref(props.defaultTab || props.tabs[0]?.value || "")

const setActiveTab = (value: string) => {
  activeTab.value = value
  emit("tabChange", value)
}
</script>

<template>
  <div class="tabs">
    <div class="tab-list">
      <button
        v-for="tab in tabs"
        :key="tab.value"
        :class="['tab-button', { active: activeTab === tab.value }]"
        @click="setActiveTab(tab.value)"
      >
        {{ tab.label }}
      </button>
    </div>
    <div class="tab-content">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.tabs {
  width: 100%;
}

.tab-list {
  display: flex;
  border-bottom: 1px solid var(--border);
  margin-bottom: 20px;
}

.tab-button {
  background: none;
  border: none;
  padding: 12px 20px;
  cursor: pointer;
  font-size: 16px;
  color: var(--text);
  border-bottom: 2px solid transparent;
  transition: all 0.2s ease;
  position: relative;
}

.tab-button:hover {
  color: var(--text-h);
}

.tab-button.active {
  color: var(--accent);
  border-bottom-color: var(--accent);
}

.tab-content {
  width: 100%;
}
</style>
