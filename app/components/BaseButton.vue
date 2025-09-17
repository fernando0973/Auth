<template>
  <button
    :type="type"
    :disabled="disabled || loading"
    :class="buttonClasses"
    @click="$emit('click')"
  >
    <!-- Loading spinner -->
    <svg
      v-if="loading"
      class="animate-spin -ml-1 mr-2 h-4 w-4"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        class="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        stroke-width="4"
      />
      <path
        class="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
    
    <!-- Icon slot (antes do texto) -->
    <slot name="icon-left" />
    
    <!-- Texto do botão -->
    <span>
      <slot>{{ text }}</slot>
    </span>
    
    <!-- Icon slot (depois do texto) -->
    <slot name="icon-right" />
  </button>
</template>

<script setup lang="ts">
interface Props {
  text?: string
  type?: 'button' | 'submit' | 'reset'
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  loading?: boolean
  fullWidth?: boolean
}

interface Emits {
  click: []
}

const props = withDefaults(defineProps<Props>(), {
  text: '',
  type: 'button',
  variant: 'primary',
  size: 'md',
  disabled: false,
  loading: false,
  fullWidth: false
})

defineEmits<Emits>()

// Classes dinâmicas baseadas nas props
const buttonClasses = computed(() => {
  const baseClasses = [
    'inline-flex items-center justify-center',
    'font-medium rounded-lg transition-all duration-200',
    'focus:outline-none focus:ring-2 focus:ring-offset-2',
    'disabled:opacity-50 disabled:cursor-not-allowed'
  ]

  // Tamanhos
  const sizeClasses = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-3 text-base',
    lg: 'px-6 py-4 text-lg'
  }

  // Variantes de cor
  const variantClasses = {
    primary: [
      'bg-blue-600 text-white border border-blue-600',
      'hover:bg-blue-700 hover:border-blue-700',
      'focus:ring-blue-500',
      'disabled:hover:bg-blue-600'
    ],
    secondary: [
      'bg-gray-600 text-white border border-gray-600',
      'hover:bg-gray-700 hover:border-gray-700',
      'focus:ring-gray-500',
      'disabled:hover:bg-gray-600'
    ],
    outline: [
      'bg-transparent text-blue-600 border border-blue-600',
      'hover:bg-blue-50',
      'focus:ring-blue-500',
      'disabled:hover:bg-transparent'
    ],
    ghost: [
      'bg-transparent text-gray-600 border border-transparent',
      'hover:bg-gray-100 hover:text-gray-900',
      'focus:ring-gray-500',
      'disabled:hover:bg-transparent'
    ],
    danger: [
      'bg-red-600 text-white border border-red-600',
      'hover:bg-red-700 hover:border-red-700',
      'focus:ring-red-500',
      'disabled:hover:bg-red-600'
    ]
  }

  // Largura total
  const widthClasses = props.fullWidth ? ['w-full'] : []

  return [
    ...baseClasses,
    sizeClasses[props.size],
    ...variantClasses[props.variant],
    ...widthClasses
  ].join(' ')
})
</script>
