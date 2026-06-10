<script setup>
import IconCloud from "../icons/weather/IconCloud.vue";
import IconRain from "../icons/weather/IconRain.vue";
import IconSun from "../icons/weather/IconSun.vue";

const { weatherCode, temp, date } = defineProps({
  weatherCode: Number,
  temp: Number,
  date: Date,
});
</script>

<template>
  <button class="day-card">
    <IconSun v-if="weatherCode === 1000" />
    <IconCloud v-if="weatherCode === 1003" />
    <IconRain v-if="weatherCode === 1009" />
    <div class="day-card__day">
      {{ date.toLocaleDateString("ru-RU", { weekday: "short" }) }}
    </div>
    <div class="day-card__temp">{{ temp }} °C</div>
  </button>
</template>

<style scoped>
.day-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 15px;
  padding: 15px 24px 20px;
  color: var(--color-primary);
  background-color: var(--color-bg-card);
  border: none;
  border-radius: 10px;
  box-shadow: 1px 2px 4px 0px var(--color-bg-main);
  cursor: pointer;
}
.day-card:hover {
  background-color: #3a434f;
}
.day-card__day {
  font-size: 20px;
  text-transform: capitalize;
}
.day-card__temp {
  font-size: 20px;
  font-weight: 700;
}
</style>
