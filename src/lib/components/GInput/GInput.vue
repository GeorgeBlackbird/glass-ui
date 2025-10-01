<template>
  <div :class="wrapperClasses">
    <span v-if="$slots.icon" class="g-input__icon">
      <slot name="icon" />
    </span>

    <input
      v-model="model"
      class="g-input"
      :disabled="disabled"
      :required="required"
      :readonly="readonly"
      :placeholder="placeholder"
    />

    <span v-if="autoWidth" class="g-input__sizer" aria-hidden="true">
      {{ model || placeholder }}
    </span>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  placeholder?: string
  disabled?: boolean
  autoWidth?: boolean
  required?: boolean
  readonly?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: 'Enter text...',
  disabled: false,
  loading: false,
  autoWidth: false,
  required: false,
  readonly: false,
})

const model = defineModel<string>()

const wrapperClasses = computed(() => [
  'g-input-wrapper',
  {
    'g-input-wrapper--disabled': props.disabled,
    'g-input-wrapper--readonly': props.readonly,
    'g-input-wrapper--auto-width': props.autoWidth,
  },
])
</script>

<style scoped lang="scss">
@use '@/lib/styles/main' as *;

.g-input-wrapper {
  @include glassy(12px, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.4));

  display: inline-flex;
  align-items: center;
  position: relative;
  transition:
    box-shadow 0.3s ease,
    border-color 0.3s ease;

  &:focus-within {
    border-color: rgba(255, 255, 255, 0.7);
    box-shadow:
      0 8px 40px rgba(0, 0, 0, 0.2),
      inset 0 1px 0 rgba(255, 255, 255, 0.6),
      inset 0 -1px 0 rgba(255, 255, 255, 0.1),
      inset 0 0 2px 1px rgba(255, 255, 255, 0.1);
  }

  .g-input {
    background: transparent;
    border: none;
    outline: none;
    padding: 0.7rem 1 rem;
    font-family: inherit;
    font-size: $font-size-base;
    color: #fff;
    width: 100%;
    min-width: 180px;

    &::placeholder {
      color: rgba(255, 255, 255, 0.6);
      opacity: 1;
    }
  }

  &--auto-width {
    width: fit-content;
    min-width: 0;
    display: inline-grid;
    grid-template-areas: 'input';

    .g-input,
    .g-input__sizer {
      grid-area: input;
      padding: 0.7rem 1rem;
    }

    .g-input {
      min-width: 50px;
    }

    .g-input__sizer {
      visibility: hidden;
      white-space: pre;
    }
  }

  &--disabled {
    opacity: 0.5;
    cursor: not-allowed;
    filter: grayscale(50%);

    .g-input {
      cursor: not-allowed;
    }
  }

  &--readonly {
    background: rgba(255, 255, 255, 0.1);

    .g-input {
      cursor: default;
    }
  }
}
</style>
