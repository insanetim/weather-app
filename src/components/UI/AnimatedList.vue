<script setup lang="ts">
import { TransitionGroup } from "vue";

interface Props {
  name?: string
  tag?: string
}

const props = withDefaults(defineProps<Props>(), {
  name: "animated-list",
  tag: "div",
})
</script>

<template>
  <TransitionGroup :name="name" :tag="tag">
    <slot />
  </TransitionGroup>
</template>
