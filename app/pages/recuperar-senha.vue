<template>
  <div class="min-h-screen bg-gray-50 flex items-center justify-center">
    <div class="max-w-md w-full bg-white rounded-lg shadow-md p-8">
      <!-- Logo simples -->
      <div class="text-center mb-8">
        <h1 class="text-2xl font-bold text-gray-900">Recuperar Senha</h1>
        <p class="text-gray-600 mt-2">Digite seu email para receber instruções</p>
      </div>

      <!-- Formulário simples -->
      <form class="space-y-6" @submit.prevent="handleSubmit">
        <!-- Mensagem de sucesso -->
        <div 
          v-if="showSuccessMessage" 
          class="rounded-md bg-green-50 p-4"
        >
          <div class="flex">
            <div class="flex-shrink-0">
              <svg class="h-5 w-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div class="ml-3">
              <p class="text-sm text-green-800">
                Instruções enviadas! Verifique seu email para redefinir sua senha.
              </p>
            </div>
          </div>
        </div>

        <!-- Mensagem de erro -->
        <div 
          v-if="showErrorMessage" 
          class="rounded-md bg-red-50 p-4"
        >
          <div class="flex">
            <div class="flex-shrink-0">
              <svg class="h-5 w-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <div class="ml-3">
              <p class="text-sm text-red-800">
                {{ errorMessage }}
              </p>
            </div>
          </div>
        </div>

        <!-- Email -->
        <div>
          <BaseInput
            v-model="email"
            type="email"
            label="Email"
            placeholder="Digite seu email"
            required
            :disabled="isLoading"
          />
        </div>

        <!-- Botão -->
        <BaseButton
          type="submit"
          variant="primary"
          full-width
          :loading="isLoading"
          :disabled="!email || showSuccessMessage"
        >
          {{ isLoading ? 'Enviando...' : 'Enviar instruções' }}
        </BaseButton>
      </form>

      <!-- Links -->
      <div class="mt-6 text-center text-sm">
        <NuxtLink to="/login" class="text-blue-600 hover:text-blue-500">
          Voltar ao login
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Meta tags para SEO
useSeoMeta({
  title: 'Recuperar Senha - Auth App',
  description: 'Recupere sua senha inserindo seu email.',
})

// Composable de autenticação
const { requestPasswordReset, authState, clearError } = useAuth()

// Estado do formulário
const email = ref('')
const showSuccessMessage = ref(false)
const showErrorMessage = ref(false)
const errorMessage = ref('')

// Estado de loading vem do composable
const isLoading = computed(() => authState.isLoading)

// Função de submit
async function handleSubmit() {
  if (!email.value) {
    return
  }

  clearError()
  showErrorMessage.value = false
  showSuccessMessage.value = false

  try {
    const success = await requestPasswordReset(email.value)
    
    if (success) {
      showSuccessMessage.value = true
      console.log('Email de recuperação enviado para:', email.value)
    } else {
      // Erro será mostrado pelo composable
      errorMessage.value = authState.error || 'Erro ao enviar email de recuperação'
      showErrorMessage.value = true
    }
  } catch (error: any) {
    console.error('Erro na recuperação de senha:', error)
    errorMessage.value = 'Erro inesperado. Tente novamente.'
    showErrorMessage.value = true
  }
}
</script>
