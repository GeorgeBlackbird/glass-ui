<template>
  <div :class="wrapperClasses">
    <input
      v-model="model"
      class="g-input"
      :disabled="disabled"
      :required="required"
      :readonly="readonly"
      :placeholder="placeholder"
      @blur="handleBlur"
    />

    <span v-if="autoWidth" class="g-input__sizer" aria-hidden="true">
      {{ model || placeholder }}
    </span>

    <span v-if="showError || props.isInvalid" class="g-input__error">
      <span class="g-input__error-symbol">⚠</span> {{ errorMessage }}
    </span>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

interface Props {
  placeholder?: string
  disabled?: boolean
  autoWidth?: boolean
  required?: boolean
  readonly?: boolean
  isInvalid?: boolean
  errorMessage?: string
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: 'Введите текст...',
  disabled: false,
  autoWidth: false,
  required: false,
  readonly: false,
  isInvalid: false,
  errorMessage: 'Это поле обязательно для заполнения',
})

const model = defineModel<string>()
const showError = ref(false)

const wrapperClasses = computed(() => [
  'g-input-wrapper',
  {
    'g-input-wrapper--disabled': props.disabled,
    'g-input-wrapper--readonly': props.readonly,
    'g-input-wrapper--auto-width': props.autoWidth,
    'g-input-wrapper--error': showError.value || props.isInvalid,
  },
])

const handleBlur = () => {
  if (props.required && !model.value) {
    showError.value = true
  } else {
    showError.value = false
  }
}
</script>

<style scoped lang="scss">
@use '@/lib/styles/main' as *;

.g-input-wrapper {
  @include glassy(12px, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.3));

  display: inline-flex;
  flex-direction: column;
  align-items: flex-start;
  position: relative;
  transition:
    box-shadow 0.3s ease,
    border-color 0.3s ease;
  max-width: 100%;

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
    padding: 0.7rem 1rem;
    font-family: inherit;
    font-size: $font-size-base;
    color: #fff;
    width: 100%;
    min-width: 180px;
    max-width: 100%;
    box-sizing: border-box;

    &::placeholder {
      color: rgba(255, 255, 255, 0.6);
      opacity: 1;
    }
  }

  &--auto-width {
    width: auto;
    min-width: 0;
    display: inline-grid;
    grid-template-areas: 'input';
    max-width: 100%;

    .g-input,
    .g-input__sizer {
      min-width: 0;
      max-width: 100%;
      grid-area: input;
      padding: 0.7rem 1rem;
      box-sizing: border-box;
      overflow: hidden;
      text-overflow: clip;
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

  &--error {
    @include glassy(12px, rgba(255, 255, 255, 0.2), rgba(255, 100, 100, 0.5));
    box-shadow:
      0 8px 32px rgba(255, 100, 100, 0.2),
      inset 0 1px 0 rgba(255, 100, 100, 0.5),
      inset 0 -1px 0 rgba(255, 100, 100, 0.1),
      inset 0 0 2px 1px rgba(255, 100, 100, 0.1);
  }

  .g-input__error {
    color: rgba(255, 150, 150, 0.9);
    font-size: 12px;
    margin-top: 0.3rem;
    position: absolute;
    bottom: -1.5rem;
    left: 0;
    opacity: 0;
    transform: translateY(0.2rem);
    animation: errorAppear 0.3s ease forwards;

    @keyframes errorAppear {
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  }

  .g-input__error-symbol {
    display: inline-block;
    margin-right: 0.3rem;
    font-size: 12px;
    color: rgba(255, 150, 150, 0.9);
  }
}
</style>
