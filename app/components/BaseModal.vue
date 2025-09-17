<template>
  <!-- Overlay -->
  <Teleport to="body">
    <Transition
      name="modal-overlay"
      enter-active-class="transition-opacity duration-300 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-200 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="isOpen"
        class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity z-50"
        @click="handleOverlayClick"
      />
    </Transition>

    <!-- Modal -->
    <Transition
      name="modal-content"
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="opacity-0 scale-95 translate-y-4 sm:translate-y-0 sm:scale-95"
      enter-to-class="opacity-100 scale-100 translate-y-0 sm:scale-100"
      leave-active-class="transition-all duration-200 ease-in"
      leave-from-class="opacity-100 scale-100 translate-y-0 sm:scale-100"
      leave-to-class="opacity-0 scale-95 translate-y-4 sm:translate-y-0 sm:scale-95"
    >
      <div
        v-if="isOpen"
        class="fixed inset-0 z-50 overflow-y-auto"
        style="z-index: 9999;"
      >
        <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div 
            class="relative transform overflow-hidden rounded-lg bg-white px-6 pb-6 pt-6 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-8"
            :class="modalSizeClass"
          >
            <!-- Ícone do tipo de modal -->
            <div class="sm:flex sm:items-start">
              <div 
                class="mx-auto flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full sm:mx-0 sm:h-14 sm:w-14"
                :class="iconContainerClass"
              >
                <!-- Ícone de sucesso -->
                <svg 
                  v-if="type === 'success'" 
                  class="h-7 w-7 text-green-600" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                
                <!-- Ícone de erro -->
                <svg 
                  v-else-if="type === 'error'" 
                  class="h-7 w-7 text-red-600" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
                
                <!-- Ícone de aviso -->
                <svg 
                  v-else-if="type === 'warning'" 
                  class="h-7 w-7 text-yellow-600" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
                
                <!-- Ícone de informação -->
                <svg 
                  v-else 
                  class="h-7 w-7 text-blue-600" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>

              <!-- Conteúdo do modal -->
              <div class="mt-4 text-center sm:ml-4 sm:mt-0 sm:text-left flex-1">
                <!-- Título -->
                <h3 
                  v-if="title" 
                  class="text-xl font-semibold leading-7 text-gray-900 mb-4"
                >
                  {{ title }}
                </h3>
                
                <!-- Descrição -->
                <div class="mt-2">
                  <p class="text-base text-gray-600 leading-relaxed">
                    {{ description }}
                  </p>
                </div>

                <!-- Slot para conteúdo customizado -->
                <div v-if="$slots.default" class="mt-4">
                  <slot />
                </div>
              </div>
            </div>

            <!-- Botões de ação -->
            <div class="mt-6 sm:mt-5 sm:flex sm:flex-row-reverse">
              <!-- Botão primário -->
              <BaseButton
                v-if="showConfirmButton"
                :variant="confirmButtonVariant"
                size="md"
                class="w-full sm:ml-3 sm:w-auto min-w-[120px]"
                @click="handleConfirm"
              >
                {{ confirmButtonText }}
              </BaseButton>

              <!-- Botão secundário -->
              <BaseButton
                v-if="showCancelButton"
                variant="outline"
                size="md"
                class="mt-3 w-full sm:mt-0 sm:w-auto min-w-[120px]"
                @click="handleCancel"
              >
                {{ cancelButtonText }}
              </BaseButton>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
type ModalType = 'success' | 'error' | 'warning' | 'info'
type ModalSize = 'sm' | 'md' | 'lg' | 'xl'

interface Props {
  isOpen: boolean
  type?: ModalType
  size?: ModalSize
  title?: string
  description: string
  showConfirmButton?: boolean
  showCancelButton?: boolean
  confirmButtonText?: string
  cancelButtonText?: string
  closeOnOverlayClick?: boolean
}

interface Emits {
  (e: 'close'): void
  (e: 'confirm'): void
  (e: 'cancel'): void
}

// Props com valores padrão
const props = withDefaults(defineProps<Props>(), {
  type: 'info',
  size: 'md',
  showConfirmButton: true,
  showCancelButton: false,
  confirmButtonText: 'OK',
  cancelButtonText: 'Cancelar',
  closeOnOverlayClick: true
})

// Emits
const emit = defineEmits<Emits>()

// Classes computadas para o tamanho do modal
const modalSizeClass = computed(() => {
  const sizes = {
    sm: 'sm:max-w-sm',
    md: 'sm:max-w-xl',
    lg: 'sm:max-w-3xl',
    xl: 'sm:max-w-5xl'
  }
  return sizes[props.size]
})

// Classes computadas para o container do ícone
const iconContainerClass = computed(() => {
  const classes = {
    success: 'bg-green-100',
    error: 'bg-red-100',
    warning: 'bg-yellow-100',
    info: 'bg-blue-100'
  }
  return classes[props.type]
})

// Variante do botão de confirmação baseada no tipo
const confirmButtonVariant = computed(() => {
  const variants: { [key in ModalType]: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' } = {
    success: 'primary',
    error: 'danger',
    warning: 'primary',
    info: 'primary'
  }
  return variants[props.type]
})

// Handlers dos eventos
function handleOverlayClick() {
  if (props.closeOnOverlayClick) {
    emit('close')
  }
}

function handleConfirm() {
  emit('confirm')
}

function handleCancel() {
  emit('cancel')
  emit('close')
}

// Controle do scroll do body quando modal está aberto
watch(() => props.isOpen, (isOpen) => {
  if (process.client) {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  }
})

// Cleanup quando componente é desmontado
onUnmounted(() => {
  if (process.client) {
    document.body.style.overflow = ''
  }
})
</script>

<style scoped>
/* Estilos para as transições já estão definidos nas classes do Tailwind */
</style>