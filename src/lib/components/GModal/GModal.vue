<template>
  <Teleport to="body">
    <Transition name="g-modal-fade">
      <div
        v-if="modelValue"
        class="g-modal-mask"
        role="dialog"
        aria-modal="true"
      >
        <div
          v-click-outside="handleOutsideClick"
          class="g-modal-card"
          :style="{ width: width }"
        >
          <button
            v-if="closeButton"
            class="g-modal-close-btn"
            aria-label="Close modal"
            @click="close"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>

          <div class="g-modal-content">
            <slot />
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, watch } from 'vue'

export interface Props {
  modelValue?: boolean
  clickOutside?: boolean
  closeOnEsc?: boolean
  closeButton?: boolean
  width?: string
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: false,
  clickOutside: true,
  closeOnEsc: true,
  closeButton: true,
  width: '500px',
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'close'): void
}>()

const close = () => {
  emit('update:modelValue', false)
  emit('close')
}

const handleOutsideClick = () => {
  if (props.clickOutside) {
    close()
  }
}

const onKeydown = (e: KeyboardEvent) => {
  if (props.closeOnEsc && e.key === 'Escape' && props.modelValue) {
    close()
  }
}

watch(
  () => props.modelValue,
  (isOpen) => {
    if (typeof document !== 'undefined') {
      document.body.style.overflow = isOpen ? 'hidden' : ''
    }
  }
)

onMounted(() => {
  document.addEventListener('keydown', onKeydown)
})

onUnmounted(() => {
  document.removeEventListener('keydown', onKeydown)
  if (typeof document !== 'undefined') {
    document.body.style.overflow = ''
  }
})

const vClickOutside: Directive = {
  mounted(el: HTMLElement, binding: DirectiveBinding<ClickOutsideHandler>) {
    el.clickOutsideEvent = (event: Event) => {
      const target = event.target as Node

      if (!(el === target || el.contains(target))) {
        binding.value(event)
      }
    }

    setTimeout(() => {
      document.addEventListener('click', el.clickOutsideEvent!)
    }, 0)
  },

  unmounted(el: HTMLElement) {
    if (el.clickOutsideEvent) {
      document.removeEventListener('click', el.clickOutsideEvent)
    }
  },
}
</script>

<script lang="ts">
import type { Directive, DirectiveBinding } from 'vue'

type ClickOutsideHandler = (event: Event) => void
declare global {
  interface HTMLElement {
    clickOutsideEvent?: (event: Event) => void
  }
}
</script>

<style lang="scss" scoped>
@use '@/lib/styles/main' as *;

.g-modal-mask {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 9999;

  background-color: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);

  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
}

.g-modal-card {
  @include glassy(24px, rgba(30, 30, 30, 0.6), rgba(255, 255, 255, 0.2));
  @include glass-highlight;

  position: relative;
  max-width: 100%;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);

  transform-origin: center center;
}

.g-modal-content {
  overflow-y: auto;
  @include custom-scrollbar;
  padding: 2rem;
}

.g-modal-close-btn {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: transparent;
  border: none;
  color: rgba(255, 255, 255, 0.6);
  cursor: pointer;
  padding: 4px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  z-index: 10;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    color: #fff;
    transform: rotate(90deg);
  }
}

.g-modal-fade-enter-active,
.g-modal-fade-leave-active {
  transition: opacity 0.3s ease;

  .g-modal-card {
    transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275); // Эффект пружины
  }
}

.g-modal-fade-enter-from,
.g-modal-fade-leave-to {
  opacity: 0;

  .g-modal-card {
    transform: scale(0.9) translateY(20px);
  }
}
</style>
