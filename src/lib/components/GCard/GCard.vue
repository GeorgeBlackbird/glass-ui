<template>
  <div :class="cardClasses" :style="cardStyle">
    <div v-if="$slots.image || imgSrc" class="g-card__image">
      <slot v-if="$slots.image" name="image" />
      <img v-else-if="imgSrc" :src="imgSrc" :alt="imgAlt" />
    </div>

    <div class="g-card__content">
      <div v-if="$slots.header" class="g-card__header">
        <slot name="header" />
      </div>

      <div v-if="$slots.default" class="g-card__body">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, withDefaults } from 'vue'

type TextStyle = 'white' | 'gradient'

interface Props {
  imgSrc?: string
  imgAlt?: string
  blur?: number
  bgOpacity?: number
  headerTextStyle?: TextStyle
  bodyTextStyle?: TextStyle
}

const props = withDefaults(defineProps<Props>(), {
  imgSrc: undefined,
  imgAlt: '',
  blur: 20,
  bgOpacity: 0.1,
  headerTextStyle: 'gradient',
  bodyTextStyle: 'white',
})

const cardClasses = computed(() => [
  'g-card',
  `g-card--header-${props.headerTextStyle}`,
  `g-card--body-${props.bodyTextStyle}`,
])

const cardStyle = computed(() => ({
  '--g-card-blur': `${props.blur}px`,
  '--g-card-bg': `rgba(255, 255, 255, ${props.bgOpacity})`,
}))
</script>

<style lang="scss" scoped>
@use '@/lib/styles/main' as *;

.g-card {
  --g-card-blur: 20px;
  --g-card-bg: rgba(255, 255, 255, 0.1);

  @include glassy(var(--g-card-blur), var(--g-card-bg), $border-color-light);

  @include glass-highlight;

  border-radius: $border-radius-base;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
  z-index: 0;

  &:hover {
    transform: translateY(-4px);
    box-shadow:
      0 12px 40px rgba(0, 0, 0, 0.15),
      inset 0 1px 0 rgba(255, 255, 255, 0.6),
      inset 0 -1px 0 rgba(255, 255, 255, 0.1),
      inset 0 0 2px 1px rgba(255, 255, 255, 0.1);
  }

  &__image {
    width: 100%;
    height: auto;

    img,
    :deep(img) {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  &__content {
    padding: 1.25rem;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  &__header {
    font-size: 1.5rem;
    font-weight: 600;

    :deep(h1, h2, h3, h4) {
      margin: 0;
      font-size: inherit;
      font-weight: inherit;
    }
  }

  &__body {
    font-size: $font-size-base;
    font-weight: 400;
    line-height: 1.6;

    :deep(p) {
      margin: 0;
    }
  }

  &--header-white {
    .g-card__header {
      @include glass-text('white');
    }
  }
  &--header-gradient {
    .g-card__header {
      @include glass-text('gradient');
    }
  }

  &--body-white {
    .g-card__body {
      @include glass-text('white');
    }
  }
  &--body-gradient {
    .g-card__body {
      @include glass-text('gradient');
    }
  }
}
</style>
