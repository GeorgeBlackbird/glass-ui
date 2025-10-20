<template>
  <div :class="wrapperClasses">
    <textarea
      v-model="model"
      class="g-textarea"
      :disabled="disabled"
      :required="required"
      :readonly="readonly"
      :placeholder="placeholder"
      :rows="rows"
      @blur="handleBlur"
    />

    <span v-if="autoHeight" class="g-textarea__sizer" aria-hidden="true">
      {{ (model || placeholder) + '\n' }}
    </span>

    <span v-if="showError || props.isInvalid" class="g-textarea__error">
      <span class="g-textarea__error-symbol">⚠</span> {{ errorMessage }}
    </span>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

interface Props {
  placeholder?: string
  disabled?: boolean
  autoHeight?: boolean
  required?: boolean
  readonly?: boolean
  isInvalid?: boolean
  errorMessage?: string
  rows?: number
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: 'Введите текст...',
  disabled: false,
  autoHeight: false,
  required: false,
  readonly: false,
  isInvalid: false,
  errorMessage: 'Это поле обязательно для заполнения',
  rows: 3,
})

const model = defineModel<string>()
const showError = ref(false)

const wrapperClasses = computed(() => [
  'g-textarea-wrapper',
  {
    'g-textarea-wrapper--disabled': props.disabled,
    'g-textarea-wrapper--readonly': props.readonly,
    'g-textarea-wrapper--auto-height': props.autoHeight,
    'g-textarea-wrapper--error': showError.value || props.isInvalid,
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

.g-textarea-wrapper {
  @include glassy(12px, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.3));

  display: inline-flex;
  flex-direction: column;
  align-items: flex-start;
  position: relative;
  transition:
    box-shadow 0.3s ease,
    border-color 0.3s ease;

  width: 100%;
  max-width: 100%;
  min-width: 180px;

  &:focus-within {
    border-color: rgba(255, 255, 255, 0.7);
    box-shadow:
      0 8px 40px rgba(0, 0, 0, 0.2),
      inset 0 1px 0 rgba(255, 255, 255, 0.6),
      inset 0 -1px 0 rgba(255, 255, 255, 0.1),
      inset 0 0 2px 1px rgba(255, 255, 255, 0.1);
  }

  .g-textarea {
    background: transparent;
    border: none;
    outline: none;
    padding: 0.7rem 1rem;
    font-family: inherit;
    font-size: $font-size-base;
    color: #fff;
    width: 100%;
    max-width: 100%;
    box-sizing: border-box;
    resize: vertical;

    &::placeholder {
      color: rgba(255, 255, 255, 0.6);
      opacity: 1;
    }

    @include custom-scrollbar;

    &::-webkit-resizer {
      -webkit-appearance: none;
      appearance: none;

      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='10' viewBox='0 0 10 10'%3E%3Cpath d='M 3 10 L 10 3 M 6 10 L 10 6' stroke='rgba(255,255,255,0.5)' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E");
      background-repeat: no-repeat;
      background-position: bottom right;
      background-size: 10px 10px;

      width: 14px;
      height: 14px;

      border: none;
      background-color: transparent;
      outline: none;
      cursor: ns-resize;
    }
  }

  &--auto-height {
    display: grid;
    grid-template-areas: 'content';
    width: 100%;

    .g-textarea,
    .g-textarea__sizer {
      grid-area: content;
      padding: 0.7rem 1rem;
      box-sizing: border-box;
      overflow: hidden;
      height: 100%;
      line-height: 1.25;
    }

    .g-textarea {
      resize: none;
      white-space: pre-wrap;
      word-wrap: break-word;
    }

    .g-textarea__sizer {
      visibility: hidden;
      white-space: pre-wrap;
      word-wrap: break-word;
    }
  }

  &--disabled {
    opacity: 0.5;
    cursor: not-allowed;
    filter: grayscale(50%);

    .g-textarea {
      cursor: not-allowed;
    }
  }

  &--readonly {
    background: rgba(255, 255, 255, 0.1);

    .g-textarea {
      cursor: default;
    }
  }

  &-error {
    @include glassy(12px, rgba(255, 255, 255, 0.2), rgba(255, 100, 100, 0.5));
    box-shadow:
      0 8px 32px rgba(255, 100, 100, 0.2),
      inset 0 1px 0 rgba(255, 100, 100, 0.5),
      inset 0 -1px 0 rgba(255, 100, 100, 0.1),
      inset 0 0 2px 1px rgba(255, 100, 100, 0.1);
  }

  .g-textarea__error {
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

  .g-textarea__error-symbol {
    display: inline-block;
    margin-right: 0.3rem;
    font-size: 12px;
    color: rgba(255, 150, 150, 0.9);
  }
}
</style>
