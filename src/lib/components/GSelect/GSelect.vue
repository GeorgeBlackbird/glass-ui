<template>
  <div ref="selectWrapper" :class="wrapperClasses" @click="toggleDropdown">
    <GInput
      v-model="displayValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :auto-width="autoWidth"
      :required="required"
      :readonly="true"
      :is-invalid="showError || isInvalid"
      :error-message="errorMessage"
      @blur="handleBlur"
    />

    <span :class="['g-select__arrow', { 'g-select__arrow--open': isOpen }]">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        width="20"
        height="20"
      >
        <path d="M12 15l-6-6h12z" />
      </svg>
    </span>

    <Teleport v-show="isOpen" to="body">
      <div
        ref="dropdown"
        :class="[
          'g-select__dropdown',
          { 'g-select__dropdown--visible': isOpen },
        ]"
        :style="dropdownStyle"
      >
        <ul class="g-select__list" @keydown="handleKeydown">
          <li
            v-for="(option, index) in filteredOptions"
            :key="option.value"
            :ref="
              (el) => {
                if (index === highlightedIndex)
                  highlightedRef = el as HTMLElement | null
              }
            "
            :class="[
              'g-select__option',
              { 'g-select__option--selected': isSelected(option.value) },
            ]"
            tabindex="0"
            :aria-selected="isSelected(option.value)"
            @click="selectOption(option.value)"
          >
            {{ option.label }}
          </li>
        </ul>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import {
  computed,
  ref,
  onMounted,
  onUnmounted,
  nextTick,
  type StyleValue,
} from 'vue'
import GInput from '../GInput/GInput.vue'

interface Option {
  value: string | number
  label: string
}

interface Props {
  options: Option[]
  placeholder?: string
  disabled?: boolean
  autoWidth?: boolean
  required?: boolean
  readonly?: boolean
  isInvalid?: boolean
  errorMessage?: string
  multiple?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: 'Выберите опцию...',
  disabled: false,
  autoWidth: false,
  required: false,
  readonly: false,
  isInvalid: false,
  errorMessage: 'Это поле обязательно для заполнения',
  multiple: false,
})

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const model = defineModel<any>()
const isOpen = ref(false)
const showError = ref(false)
const selectWrapper = ref<HTMLElement | null>(null)
const dropdown = ref<HTMLElement | null>(null)
const highlightedIndex = ref(-1)
const highlightedRef = ref<HTMLElement | null>(null)

const displayValue = computed({
  get: () => {
    if (props.multiple && Array.isArray(model.value)) {
      return model.value
        .map((v) => props.options.find((o) => o.value === v)?.label)
        .join(', ')
    }
    return props.options.find((o) => o.value === model.value)?.label || ''
  },
  set: () => {},
})

const filteredOptions = computed(() => props.options)

const isSelected = (value: string | number) => {
  if (props.multiple && Array.isArray(model.value))
    return model.value.includes(value)
  return model.value === value
}

const wrapperClasses = computed(() => [
  'g-select-wrapper',
  {
    'g-select-wrapper--disabled': props.disabled || props.readonly,
    'g-select-wrapper-error': showError.value || props.isInvalid,
    'g-select-wrapper--open': isOpen.value,
    'g-select-wrapper--auto-width': props.autoWidth,
  },
])

const selectWrapperWidth = ref(0)

const updateDropdownPositionAndSize = () => {
  if (!selectWrapper.value) return {}

  const rect = selectWrapper.value.getBoundingClientRect()

  selectWrapperWidth.value = rect.width

  return {
    position: 'absolute',
    top: `${rect.bottom + window.scrollY + 4}px`,
    left: `${rect.left + window.scrollX}px`,
    width: `${rect.width}px`,
    zIndex: 1000,
  } as const
}

const dropdownStyle = computed((): StyleValue => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const _ = selectWrapperWidth.value
  return updateDropdownPositionAndSize()
})

const toggleDropdown = () => {
  if (props.disabled || props.readonly) return
  isOpen.value = !isOpen.value
  if (isOpen.value) {
    updateDropdownPositionAndSize()
    highlightedIndex.value = props.options.findIndex((o) => isSelected(o.value))
    nextTick(() => highlightedRef.value?.focus())
  }
}

const selectOption = (value: string | number) => {
  if (props.multiple) {
    if (!Array.isArray(model.value)) model.value = []
    const index = model.value.indexOf(value)
    if (index > -1) model.value.splice(index, 1)
    else model.value.push(value)
  } else {
    model.value = value
    isOpen.value = false
  }
  showError.value = false
}

const handleBlur = () => {
  if (
    props.required &&
    (model.value === undefined || (props.multiple && model.value.length === 0))
  ) {
    showError.value = true
  } else {
    showError.value = false
  }
  isOpen.value = false
}

const handleClickOutside = (event: MouseEvent) => {
  if (
    !selectWrapper.value?.contains(event.target as Node) &&
    !dropdown.value?.contains(event.target as Node)
  ) {
    isOpen.value = false
    handleBlur()
  }
}

const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === 'ArrowDown') {
    highlightedIndex.value = (highlightedIndex.value + 1) % props.options.length
    nextTick(() => highlightedRef.value?.focus())
  } else if (event.key === 'ArrowUp') {
    highlightedIndex.value =
      (highlightedIndex.value - 1 + props.options.length) % props.options.length
    nextTick(() => highlightedRef.value?.focus())
  } else if (event.key === 'Enter') {
    if (highlightedIndex.value !== 1)
      selectOption(props.options[highlightedIndex.value].value)
  } else if (event.key === 'Escape') {
    isOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
  window.addEventListener('resize', updateDropdownPositionAndSize)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
  window.removeEventListener('resize', updateDropdownPositionAndSize)
})
</script>

<style scoped lang="scss">
@use '@/lib/styles/main' as *;

.g-select-wrapper {
  position: relative;
  cursor: pointer;
  width: 180px;

  &--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &--auto-width {
    width: auto;
    display: inline-block;
  }

  .g-select__arrow {
    position: absolute;
    top: 50%;
    right: 12px;

    transform: translateY(-50%);
    pointer-events: none;
    color: white;

    svg {
      display: block;
      width: 20px;
      height: 20px;

      transform-box: fill-box;
      transform-origin: 50% 50%;
      transition: transform 0.28s cubic-bezier(0.4, 0, 0.2, 1);
      transform: rotate(0deg);
    }

    &--open {
      svg {
        transform: rotate(180deg);
      }
    }
  }
}

.g-select__dropdown {
  @include glassy(16px, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0.3));
  @include glass-highlight;
  max-height: 200px;
  overflow-y: auto;
  @include custom-scrollbar;
  border-radius: $border-radius-base;
  box-sizing: border-box;
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
}

.g-select__dropdown--visible {
  opacity: 1;
}

.g-select__list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.g-select__option {
  padding: 0.7rem 1rem;
  cursor: pointer;
  color: white;
  transition: background 0.2s ease;

  &:hover,
  &:focus {
    background: rgba(255, 255, 255, 0.1);
  }

  &--selected {
    background: rgba(255, 255, 255, 0.2);
    font-weight: bold;
  }
}
</style>
