<template>
  <button
    :class="buttonClasses"
    :disabled="disabled || loading"
    @click="handleClick"
  >
    <span ref="ripple" class="g-button__ripple"></span>
    <span v-if="$slots.icon" class="g-button__icon">
      <slot name="icon" />
    </span>
    <span class="g-button__text">
      <slot />
    </span>
  </button>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

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

const ripple = ref<HTMLElement | null>(null)

const handleClick = (event: MouseEvent) => {
  if (props.disabled || props.loading) {
    event.preventDefault()
    return
  }

  if (ripple.value) {
    const rect = ripple.value.parentElement!.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top

    ripple.value.style.left = `${x}px`
    ripple.value.style.top = `${y}px`

    ripple.value.classList.remove('g-button__ripple--active')
    void ripple.value.offsetWidth
    ripple.value.classList.add('g-button__ripple--active')
  }

  emit('click', event)
}
</script>

<style lang="scss">
@use '@/lib/styles/main';

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
  overflow: hidden;
  color: #fff;
  z-index: 0;

  transition:
    transform 0.15s ease,
    box-shadow 0.2s ease;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 75%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.4),
      transparent
    );
    transform: skewX(-25deg);
    transition: left 0.5s cubic-bezier(0.23, 1, 0.32, 1);
  }

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
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);

    &::before {
      left: 120%;
    }
  }

  &__ripple {
    position: absolute;
    border-radius: 50%;
    background-color: rgba(255, 255, 255, 0.1);
    width: 100px;
    height: 100px;
    transform: scale(0);
    margin-left: -50px;
    margin-top: -50px;

    &--active {
      animation: ripple-effect 0.6s linear;
    }
  }

  &:active:not(.g-button--disabled):not(.g-button--loading) {
    transform: scale(0.98);
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

@keyframes ripple-effect {
  to {
    transform: scale(4);
    opacity: 0;
  }
}
</style>
