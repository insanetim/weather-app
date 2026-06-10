<script setup>
import { computed, ref } from "vue";
import CitySelect from "./components/CitySelect.vue";
import DayCard from "./components/DayCard.vue";
import Error from "./components/Error.vue";
import Stat from "./components/Stat.vue";

const errorMap = new Map([[1006, "Указанный город не найден"]]);

const data = ref();
const error = ref();
const activeIndex = ref(0);

const dataModified = computed(() => {
  return [
    {
      label: "Влажность",
      stat: data.value.current.humidity + " %",
    },
    {
      label: "Облачность",
      stat: data.value.current.cloud + " %",
    },
    {
      label: "Ветер",
      stat: data.value.current.wind_kph + " км/ч",
    },
  ];
});
const errorDisplay = computed(() => {
  return errorMap.get(error.value?.error?.code);
});

async function getCity(city) {
  const params = new URLSearchParams({
    q: city,
    lang: "ru",
    key: import.meta.env.VITE_API_KEY,
    days: 3,
  });
  const res = await fetch(
    `${import.meta.env.VITE_API_URL}/forecast.json?${params.toString()}`,
  );
  if (res.status !== 200) {
    error.value = await res.json();
    data.value = null;
    return;
  }
  error.value = null;
  data.value = await res.json();
}
</script>

<template>
  <main class="main">
    <div class="left"></div>
    <div class="right">
      <Error :error="errorDisplay" />
      <div v-if="data" class="stat-data">
        <div class="stat-list">
          <Stat v-for="item in dataModified" :key="item.label" v-bind="item" />
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
            @click="activeIndex = index"
          />
        </div>
      </div>
      <CitySelect @select-city="getCity" />
    </div>
  </main>
</template>

<style scoped>
.main {
  display: flex;
  align-items: center;
  justify-content: center;
}
.left {
  width: 500px;
  height: 680px;
  border-radius: 30px;
  background-image: url("./assets/bg.png");
  background-repeat: no-repeat;
  background-size: cover;
}
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
