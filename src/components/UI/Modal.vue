<script setup lang="ts">
import { X } from "lucide-vue-next"
import { computed, watch } from "vue"
import Button from "./Button.vue"

interface Props {
  open?: boolean
  title?: string
  size?: "small" | "medium" | "large"
  closable?: boolean
  onCancel?: () => void
  onSubmit?: () => void
  cancelText?: string
  submitText?: string
}

const props = withDefaults(defineProps<Props>(), {
  open: false,
  title: "",
  size: "medium",
  closable: true,
  cancelText: "Cancel",
  submitText: "Submit",
})

const emit = defineEmits<{
  close: []
}>()

const modalClasses = computed(() => [
  "modal",
  `modal--${props.size}`,
  {
    "modal--open": props.open,
  },
])

// Prevent body scroll when modal is open
watch(
  () => props.open,
  isOpen => {
    if (isOpen) {
      const scrollBarWidth =
        window.innerWidth - document.documentElement.clientWidth
      document.body.style.overflow = "hidden"
      document.body.style.paddingRight = `${scrollBarWidth}px`
    } else {
      document.body.style.overflow = ""
      document.body.style.paddingRight = ""
    }
  }
)

const handleBackdropClick = (event: MouseEvent) => {
  if (event.target === event.currentTarget) {
    emit("close")
  }
}

const handleEscape = (event: KeyboardEvent) => {
  if (event.key === "Escape") {
    emit("close")
  }
}
</script>

<template>
  <Teleport to="body">
    <Transition name="modal">
      <div
        v-if="open"
        class="modal-overlay"
        @click="handleBackdropClick"
      >
        <div
          :class="modalClasses"
          class="modal-dialog"
          @keydown="handleEscape"
        >
          <div class="modal-header">
            <h3 v-if="title">{{ title }}</h3>
            <Button
              v-if="closable"
              @click="emit('close')"
              variant="secondary"
              size="small"
              class="modal-close"
            >
              <X class="close-icon" />
            </Button>
          </div>
          <div class="modal-content">
            <slot />
          </div>
          <div
            v-if="onCancel || onSubmit"
            class="modal-actions"
          >
            <Button
              v-if="onCancel"
              @click="onCancel"
              variant="outlined"
              color="primary"
            >
              {{ cancelText }}
            </Button>
            <Button
              v-if="onSubmit"
              @click="onSubmit"
              variant="contained"
              color="danger"
            >
              {{ submitText }}
            </Button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-dialog {
  background-color: var(--bg);
  border-radius: 8px;
  box-shadow: var(--shadow);
  max-width: 90vw;
  max-height: 90vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.modal--small .modal-dialog {
  width: 300px;
}

.modal--medium .modal-dialog {
  width: 500px;
}

.modal--large .modal-dialog {
  width: 800px;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  border-bottom: 1px solid var(--border);
}

.modal-header h3 {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: var(--text-h);
}

.modal-close {
  flex-shrink: 0;
}

.close-icon {
  width: 16px;
  height: 16px;
}

.modal-content {
  padding: 20px;
  overflow-y: auto;
  flex: 1;
}

.modal-actions {
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  padding: 16px 20px;
  border-top: 1px solid var(--border);
}

/* Modal transitions */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from {
  opacity: 0;
}

.modal-leave-to {
  opacity: 0;
}

.modal-enter-active .modal-dialog,
.modal-leave-active .modal-dialog {
  transition: opacity 0.3s ease;
}

.modal-enter-from .modal-dialog,
.modal-leave-to .modal-dialog {
  opacity: 0;
}
</style>
