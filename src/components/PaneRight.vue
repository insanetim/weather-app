<script setup>
import { computed } from "vue";
import { errorMap } from "../constants.js";
import CitySelect from "./CitySelect.vue";
import DayCard from "./DayCard.vue";
import Error from "./Error.vue";
import Stat from "./Stat.vue";

const { error, data, activeIndex } = defineProps({
  error: Object,
  data: Object,
  activeIndex: Number,
});

const emit = defineEmits(["selectIndex"]);

const errorDisplay = computed(() => {
  if (!error) return null;

  return errorMap.get(error.error?.code) || error.error?.message;
});

const statData = computed(() => {
  if (!data) return [];

  return [
    {
      label: "Влажность",
      stat: data.current.humidity + " %",
    },
    {
      label: "Облачность",
      stat: data.current.cloud + " %",
    },
    {
      label: "Ветер",
      stat: data.current.wind_kph + " км/ч",
    },
  ];
});
</script>

<template>
  <div class="right">
    <Error :error="errorDisplay" />
    <div v-if="data" class="stat-data">
      <div class="stat-list">
        <Stat v-for="item in statData" :key="item.label" v-bind="item" />
      </div>
      <div class="day-card-list">
        <DayCard
          v-for="(item, index) in data.forecast.forecastday"
          :key="item.date"
          :condition-icon="item.day.condition.icon"
          :condition-text="item.day.condition.text"
          :temp="item.day.avgtemp_c"
          :date="new Date(item.date)"
          :is-active="activeIndex === index"
          @click="emit('selectIndex', index)"
        />
      </div>
    </div>
    <CitySelect />
  </div>
</template>

<style scoped>
.right {
  background: var(--color-bg-main);
  padding: 60px 50px;
  border-radius: 0 25px 25px 0;
}
.stat-data {
  display: flex;
  flex-direction: column;
  gap: 80px;
  margin-bottom: 70px;
}
.stat-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.day-card-list {
  display: flex;
  gap: 1px;
}
</style>
