<template>
  <div class="relative">
    <BaseInput
      :model-value="modelValue"
      :type="inputType"
      :placeholder="placeholder"
      :label="label"
      :error="error"
      :hint="hint"
      :disabled="disabled"
      :required="required"
      :size="size"
      :variant="variant"
      @blur="$emit('blur')"
      @focus="$emit('focus')"
      @update:model-value="$emit('update:modelValue', $event)"
    />
    
    <!-- Botão de toggle da senha -->
    <button
      type="button"
      :disabled="disabled"
      class="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600 transition-colors"
      :class="{ 'mt-6': label }"
      @click="togglePasswordVisibility"
    >
      <!-- Ícone de olho aberto (mostrar senha) -->
      <svg
        v-if="!showPassword"
        class="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
        />
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
        />
      </svg>
      
      <!-- Ícone de olho fechado (ocultar senha) -->
      <svg
        v-else
        class="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
        />
      </svg>
      
      <!-- Screen reader text -->
      <span class="sr-only">
        {{ showPassword ? 'Ocultar senha' : 'Mostrar senha' }}
      </span>
    </button>
  </div>
</template>

<script setup lang="ts">
interface Props {
  modelValue?: string
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
  placeholder: 'Digite sua senha',
  size: 'md',
  variant: 'default',
  disabled: false,
  required: false
})

defineEmits<Emits>()

// Estado para controlar visibilidade da senha
const showPassword = ref(false)

// Tipo do input baseado na visibilidade
const inputType = computed(() => {
  return showPassword.value ? 'text' : 'password'
})

// Função para alternar visibilidade da senha
const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value
}
</script>
