<script setup>
const { conditionIcon, conditionText, temp, date } = defineProps({
  conditionIcon: String,
  conditionText: String,
  temp: Number,
  date: Date,
  isActive: Boolean,
});
</script>

<template>
  <button class="day-card" :class="{ active: isActive }">
    <img
      class="day-card__icon"
      :src="conditionIcon"
      :alt="conditionText"
      :title="conditionText"
    />
    <div class="day-card__day">
      {{ date.toLocaleDateString("ru-RU", { weekday: "short" }) }}
    </div>
    <div class="day-card__temp">{{ temp }} °C</div>
  </button>
</template>

<style scoped>
.day-card {
  width: 100%;
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
.day-card.active {
  color: var(--color-primary-inverted);
  background-color: var(--color-primary);
}
.day-card__icon {
  width: 55px;
  height: auto;
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
