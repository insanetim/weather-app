<script setup>
import { computed, inject } from "vue";
import { cityProvide } from "../constants";
import IconLocation from "../icons/IconLocation.vue";

const { dayData } = defineProps({
  dayData: Object,
});

const city = inject(cityProvide);

const day = computed(() => {
  return new Date(dayData.date).toLocaleDateString("ru-RU", {
    weekday: "long",
  });
});

const date = computed(() => {
  return new Date(dayData.date).toLocaleDateString("ru-RU", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
});
</script>

<template>
  <div v-if="dayData" class="pane-left">
    <div>
      <div class="day">
        {{ day }}
      </div>
      <div class="date">
        {{ date }}
      </div>
      <div class="city">
        <IconLocation :size="25" />
        <span>{{ city }}</span>
      </div>
    </div>
    <div>
      <img
        class="icon"
        :src="dayData.day.condition.icon"
        :alt="dayData.day.condition.text"
        :title="dayData.day.condition.text"
      />
      <div class="temperature">{{ dayData.day.avgtemp_c }} °C</div>
      <div class="condition">{{ dayData.day.condition.text }}</div>
    </div>
  </div>
</template>

<style scoped>
.pane-left {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  padding: 48px 32px 84px;
}
.day {
  margin-bottom: 16px;
  font-size: 37px;
  font-weight: 700;
  text-transform: capitalize;
}
.date {
  margin-bottom: 10px;
  font-size: 22px;
  font-weight: 500;
}
.city {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 20px;
  font-weight: 600;
}
.icon {
  display: block;
  width: 95px;
  height: auto;
  margin-bottom: 9px;
}
.temperature {
  margin-bottom: 13px;
  font-size: 50px;
  font-weight: 700;
}
.condition {
  font-size: 30px;
  font-weight: 700;
}
</style>
