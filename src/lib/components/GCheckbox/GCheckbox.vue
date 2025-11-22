<template>
  <label :class="checkboxClasses">
    <input
      type="checkbox"
      class="g-checkbox__input"
      :checked="isChecked"
      :disabled="disabled"
      :value="value"
      @change="handleChange"
    />

    <span class="g-checkbox__box">
      <svg
        class="g-checkbox__icon"
        viewBox="0 0 12 10"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <polyline
          points="2 6 4.5 9 10.5 1"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </span>

    <span v-if="$slots.default" class="g-checkbox__label-text">
      <slot />
    </span>
  </label>
</template>

<script setup lang="ts">
import { computed } from 'vue'

type ModelValue = boolean | string[] | number[]

export interface Props {
  modelValue?: ModelValue
  value?: string | number | boolean
  disabled?: boolean
  isInvalid?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: false,
  disabled: false,
  isInvalid: false,
  value: true,
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: ModelValue): void
  (e: 'change', value: ModelValue): void
}>()

const isChecked = computed(() => {
  if (Array.isArray(props.modelValue)) {
    return props.modelValue.includes(props.value as never)
  }
  return props.modelValue === true
})

const handleChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  const checked = target.checked

  let newValue: ModelValue

  if (Array.isArray(props.modelValue)) {
    const newArray = [...props.modelValue]
    if (checked) {
      newArray.push(props.value as never)
    } else {
      const index = newArray.indexOf(props.value as never)
      if (index !== -1) newArray.splice(index, 1)
    }
    newValue = newArray as ModelValue
  } else {
    newValue = checked
  }

  emit('update:modelValue', newValue)
  emit('change', newValue)
}

const checkboxClasses = computed(() => [
  'g-checkbox',
  {
    'g-checkbox--checked': isChecked.value,
    'g-checkbox--disabled': props.disabled,
    'g-checkbox--invalid': props.isInvalid,
  },
])
</script>

<style lang="scss" scoped>
@use '@/lib/styles/main' as *;

.g-checkbox {
  display: inline-flex;
  align-items: center;
  position: relative;
  cursor: pointer;
  user-select: none;
  gap: 0.75rem;
  min-height: 24px;

  &__input {
    position: absolute;
    opacity: 0;
    width: 0;
    height: 0;
    margin: 0;

    &:focus-visible + .g-checkbox__box {
      box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.5);
    }
  }

  &__box {
    width: 20px;
    height: 20px;
    flex-shrink: 0;

    @include glassy(4px, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.3));
    border-radius: 6px;

    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
    color: #fff;
  }

  &__icon {
    width: 12px;
    height: 12px;

    polyline {
      stroke-dasharray: 14;
      stroke-dashoffset: 14;
      transition: stroke-dashoffset 0.3s ease 0.1s;
    }
  }

  &__label-text {
    color: rgba(255, 255, 255, 0.8);
    font-size: 1rem;
    transition: color 0.2s;
    line-height: 1.4;
  }

  &:hover:not(.g-checkbox--disabled) {
    .g-checkbox__box {
      border-color: rgba(255, 255, 255, 0.6);
      background: rgba(255, 255, 255, 0.15);
    }
    .g-checkbox__label-text {
      color: #fff;
    }
  }

  &--checked {
    .g-checkbox__box {
      background: $glare;
      border-color: rgba(255, 255, 255, 0.6);
      box-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
    }

    .g-checkbox__icon polyline {
      stroke-dashoffset: 0;
    }

    .g-checkbox__label-text {
      color: #fff;
      text-shadow: 0 0 8px rgba(255, 255, 255, 0.3);
    }
  }

  &--invalid {
    .g-checkbox__box {
      border-color: $error;
      box-shadow: 0 0 8px rgba($error, 0.4);
    }
  }

  &--disabled {
    opacity: 0.5;
    cursor: not-allowed;

    .g-checkbox__box {
      background: rgba(0, 0, 0, 0.1);
    }
  }
}
</style>
