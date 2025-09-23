<template>
  <button
    :class="buttonClasses"
    :disabled="disabled || loading"
    @click="handleClick"
  >
    <span v-if="$slots.icon" class="g-button__icon">
      <slot name="icon" />
    </span>
    <span class="g-button__text">
      <slot />
    </span>
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'

type Theme = 'primary' | 'secondary'

interface Props {
  theme?: Theme
  disabled?: boolean
  loading?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  theme: 'primary',
  disabled: false,
  loading: false,
})

const emit = defineEmits<{
  (e: 'click', event: MouseEvent): void
}>()

const buttonClasses = computed(() => [
  'g-button',
  `g-button--${props.theme}`,
  {
    'g-button--disabled': props.disabled,
    'g-button--loading': props.loading,
  },
])

const handleClick = (event: MouseEvent) => {
  if (props.disabled || props.loading) {
    event.preventDefault()
    return
  }
  emit('click', event)
}
</script>

<style lang="scss">
@import '@/lib/styles/main.scss';

.g-button {
  @include glassy(16px, $light-glass-color, $border-color-light);
  @include glass-highlight;

  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-family: inherit;

  font-size: $font-size-base;
  font-weight: 500;
  padding: 0.6rem 1.2rem;
  cursor: pointer;
  position: relative;
  transition: all 0.2s ease;
  color: #fff;
  z-index: 0;

  &__text {
    position: relative;
    z-index: 1;
    background-image: $glare;
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    color: transparent;
  }

  &__icon {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.2em;
    position: relative;
    z-index: 1;
  }

  &:hover:not(.g-button--disabled):not(.g-button--loading) {
    background: rgba(255, 255, 255, 0.25);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
    transform: translateY(-1px);
  }

  &:active:not(.g-button--disabled):not(.g-button--loading) {
    transform: translateY(1px) scale(0.98);
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2) inset;
  }

  &--disabled {
    opacity: 0.5;
    cursor: not-allowed;
    box-shadow: none;
  }

  &--loading {
    pointer-events: none;
    opacity: 0.8;
  }

  &--primary {
    border-color: $glare;
  }

  &--secondary {
    border-color: rgba(255, 255, 255, 0.4);
    color: #fff;
  }
}
</style>
