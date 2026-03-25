<script setup lang="ts">
import { computed } from "vue"

interface Props {
  variant?: "contained" | "outlined" | "secondary"
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

const buttonClasses = computed(() => [
  "button",
  `button--${props.variant}`,
  `button--${props.color}`,
  `button--${props.size}`,
  { "button--disabled": props.disabled },
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
  min-width: 28px;
}

.button--medium {
  padding: 8px;
  font-size: 14px;
  min-height: 36px;
  min-width: 36px;
}

.button--large {
  padding: 12px;
  font-size: 16px;
  min-height: 44px;
  min-width: 44px;
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

/* Secondary variant */
.button--secondary {
  background-color: transparent;
  color: var(--text);
  border: none;
  opacity: 0.7;
}

.button--secondary:hover:not(.button--disabled) {
  opacity: 1;
  background-color: var(--code-bg);
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
