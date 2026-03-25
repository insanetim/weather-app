<script setup lang="ts">
import { computed, useSlots } from "vue"

interface Props {
  variant?: "contained" | "outlined"
  color?: "primary" | "danger"
  disabled?: boolean
  type?: "button" | "submit" | "reset"
  size?: "small" | "medium" | "large"
}

const props = withDefaults(defineProps<Props>(), {
  variant: "contained",
  color: "primary",
  disabled: false,
  type: "button",
  size: "medium",
})

const slots = useSlots()

const buttonClasses = computed(() => [
  "button",
  `button--${props.variant}`,
  `button--${props.color}`,
  `button--${props.size}`,
  {
    "button--disabled": props.disabled,
    "button--icon-only": slots.default?.().length === 1,
  },
])
</script>

<template>
  <button
    :type="type"
    :class="buttonClasses"
    :disabled="disabled"
  >
    <slot />
  </button>
</template>

<style scoped>
.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  border: 1px solid transparent;
  text-decoration: none;
  font-family: inherit;
  min-height: 36px;
}

/* Size variants */
.button--small {
  padding: 4px;
  font-size: 12px;
  min-height: 28px;
  width: 28px;
}

.button--medium {
  padding: 8px;
  font-size: 14px;
  min-height: 36px;
  width: 36px;
}

.button--large {
  padding: 12px;
  font-size: 16px;
  min-height: 44px;
  width: 44px;
}

/* Icon-only variants */
.button--small.button--icon-only {
  padding: 4px;
  width: 28px;
  height: 28px;
}

.button--medium.button--icon-only {
  padding: 8px;
  width: 36px;
  height: 36px;
}

.button--large.button--icon-only {
  padding: 12px;
  width: 44px;
  height: 44px;
}

/* Contained variants */
.button--contained.button--primary {
  background-color: var(--accent);
  color: white;
  border-color: var(--accent);
}

.button--contained.button--primary:hover:not(.button--disabled) {
  background-color: var(--accent-border);
  border-color: var(--accent-border);
}

.button--contained.button--danger {
  background-color: #dc2626;
  color: white;
  border-color: #dc2626;
}

.button--contained.button--danger:hover:not(.button--disabled) {
  background-color: #b91c1c;
  border-color: #b91c1c;
}

/* Outlined variants */
.button--outlined.button--primary {
  background-color: transparent;
  color: var(--accent);
  border-color: var(--accent);
}

.button--outlined.button--primary:hover:not(.button--disabled) {
  background-color: var(--accent-bg);
}

.button--outlined.button--danger {
  background-color: transparent;
  color: #dc2626;
  border-color: #dc2626;
}

.button--outlined.button--danger:hover:not(.button--disabled) {
  background-color: rgba(220, 38, 38, 0.1);
}

/* Disabled state */
.button--disabled {
  opacity: 0.6;
  cursor: not-allowed;
  pointer-events: none;
}

/* Focus styles */
.button:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
}

.button--danger:focus-visible {
  outline-color: #dc2626;
}
</style>
