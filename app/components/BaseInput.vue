<template>
  <div class="space-y-1">
    <label 
      v-if="label" 
      :for="inputId" 
      class="block text-sm font-medium text-gray-700"
    >
      {{ label }}
    </label>
    <input
      :id="inputId"
      :value="modelValue"
      :type="type"
      :placeholder="placeholder"
      :disabled="disabled"
      :required="required"
      :class="inputClasses"
      @blur="$emit('blur')"
      @focus="$emit('focus')"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    />
    <p 
      v-if="error" 
      class="text-sm text-red-600"
    >
      {{ error }}
    </p>
    <p 
      v-else-if="hint" 
      class="text-sm text-gray-500"
    >
      {{ hint }}
    </p>
  </div>
</template>

<script setup lang="ts">
interface Props {
  modelValue?: string
  type?: string
  placeholder?: string
  label?: string
  error?: string
  hint?: string
  disabled?: boolean
  required?: boolean
  size?: 'sm' | 'md' | 'lg'
  variant?: 'default' | 'error'
}

interface Emits {
  'update:modelValue': [value: string]
  blur: []
  focus: []
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  type: 'text',
  placeholder: '',
  size: 'md',
  variant: 'default',
  disabled: false,
  required: false
})

defineEmits<Emits>()

// Gera ID único para o input (fixo para SSR)
const inputId = computed(() => {
  if (props.label) {
    // Use o label como base para ID consistente
    return `input-${props.label.toLowerCase().replace(/\s+/g, '-')}`
  }
  return `input-${props.type}`
})

// Classes dinâmicas baseadas nas props
const inputClasses = computed(() => {
  const baseClasses = [
    'block w-full rounded-lg border transition-colors duration-200',
    'focus:outline-none focus:ring-2 focus:ring-offset-0'
  ]

  // Tamanhos
  const sizeClasses = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-3 text-base',
    lg: 'px-5 py-4 text-lg'
  }

  // Variantes de cor
  const variantClasses = {
    default: [
      'border-gray-300 bg-white text-gray-900',
      'placeholder:text-gray-500',
      'focus:border-blue-500 focus:ring-blue-500',
      'hover:border-gray-400'
    ],
    error: [
      'border-red-300 bg-red-50 text-red-900',
      'placeholder:text-red-400',
      'focus:border-red-500 focus:ring-red-500'
    ]
  }

  // Estado disabled
  const disabledClasses = props.disabled ? [
    'opacity-50 cursor-not-allowed bg-gray-50'
  ] : []

  const variant = props.error ? 'error' : props.variant

  return [
    ...baseClasses,
    sizeClasses[props.size],
    ...variantClasses[variant],
    ...disabledClasses
  ].join(' ')
})
</script>
