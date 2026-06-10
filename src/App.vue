<script setup>
import { provide, ref, watch } from "vue";
import PaneRight from "./components/PaneRight.vue";
import { API_KEY, API_URL, cityProvide } from "./constants.js";

const data = ref();
const error = ref();
const activeIndex = ref(0);
const city = ref("Dnipro");

provide(cityProvide, city);

watch(
  city,
  () => {
    getCity(city.value);
  },
  {
    immediate: true,
  },
);

async function getCity(city) {
  const params = new URLSearchParams({
    q: city,
    lang: "ru",
    key: API_KEY,
    days: 3,
  });
  const res = await fetch(`${API_URL}/forecast.json?${params.toString()}`);
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
    <PaneRight
      :data
      :error
      :active-index="activeIndex"
      @select-index="(i) => (activeIndex = i)"
    />
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
</style>
