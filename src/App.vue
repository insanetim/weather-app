<script setup>
import { computed, ref } from "vue";
import CitySelect from "./components/CitySelect.vue";
import DayCard from "./components/DayCard.vue";
import Error from "./components/Error.vue";
import Stat from "./components/Stat.vue";

const errorMap = new Map([[1006, "Указанный город не найден"]]);

const data = ref();
const error = ref();

const dataModified = computed(() => {
  if (!data.value) {
    return [];
  }
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
    <Error :error="errorDisplay" />
    <DayCard :weather-code="1000" temp="20" :date="new Date()" />
    <Stat v-for="item in dataModified" :key="item.label" v-bind="item" />
    <CitySelect @select-city="getCity" />
  </main>
</template>

<style scoped>
.main {
  background: var(--color-bg-main);
  padding: 60px 50px;
  border-radius: 25px;
}
</style>
