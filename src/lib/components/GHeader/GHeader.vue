<template>
  <header :class="headerClasses">
    <div class="g-header__brand">
      <slot name="brand" />
    </div>

    <div v-if="$slots.nav" class="g-header__nav">
      <slot name="nav" />
    </div>

    <div class="g-header__actions">
      <slot name="actions" />
    </div>
  </header>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  sticky?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  sticky: false,
})

const headerClasses = computed(() => [
  'g-header',
  {
    'g-header--sticky': props.sticky,
  },
])
</script>

<style lang="scss" scoped>
@use '@/lib/styles/main' as *;

.g-header {
  @include glassy(12px, $light-glass-color, $border-color-light);
  @include glass-highlight;

  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.8rem 1.5rem;
  width: 100%;
  height: 80px;
  box-sizing: border-box;
  border-radius: 50px;

  position: relative;
  z-index: 100;
  transition:
    transform 0.3s ease,
    background-color 0.3s ease;

  &__brand {
    display: flex;
    align-items: center;
    font-weight: 700;
    font-size: 1.25rem;
    color: #fff;
    flex-shrink: 0;
  }

  &__nav {
    display: flex;
    align-items: center;
    gap: 2rem;
    margin: 0 2rem;

    @media (max-width: 768px) {
      display: none;
    }
  }

  &__actions {
    display: flex;
    align-items: center;
    gap: 1rem;
    flex-shrink: 0;
    margin-left: auto;
  }

  &--sticky {
    position: sticky;
    top: 0.5rem;
  }
}
</style>
