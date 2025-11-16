<template>
  <component :is="tag" :class="containerClasses" :style="containerStyle">
    <slot />
  </component>
</template>

<script setup lang="ts">
import { computed } from 'vue'

type PaddingSize = 'none' | 'sm' | 'md' | 'lg'

interface Props {
  tag?: string
  blur?: number
  bgOpacity?: number
  paddingSize?: PaddingSize
}

const props = withDefaults(defineProps<Props>(), {
  tag: 'div',
  blur: 16,
  bgOpacity: 0.15,
  paddingSize: 'md',
})

const containerClasses = computed(() => [
  'g-container',
  `g-container--padding-${props.paddingSize}`,
])

const containerStyle = computed(() => ({
  '--g-container-blur': `${props.blur}px`,
  '--g-container-bg': `rgba(255, 255, 255, ${props.bgOpacity})`,
}))
</script>

<style lang="scss" scoped>
@use '@/lib/styles/main' as *;

.g-container {
  --g-container-blur: 16px;
  --g-container-bg: rgba(255, 255, 255, 0.15);

  @include glassy(
    var(--g-container-blur),
    var(--g-container-bg),
    $border-color-light
  );
  @include glass-highlight;

  &--padding-none {
    padding: 0;
  }
  &--padding-sm {
    padding: 1rem;
  }
  &--padding-md {
    padding: 1.5rem;
  }
  &--padding-lg {
    padding: 2rem;
  }
}
</style>
