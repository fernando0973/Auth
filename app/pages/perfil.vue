<template>
  <div class="min-h-screen bg-gray-50 py-8">
    <div class="max-w-md mx-auto px-4">
      <!-- Header -->
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold text-gray-900 mb-2">
          Perfil
        </h1>
        <p class="text-gray-600">
          Gerencie sua conta e configurações
        </p>
      </div>

      <!-- Informações do usuário -->
      <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <div class="flex items-center space-x-4 mb-4">
          <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
            <svg class="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
            </svg>
          </div>
          <div>
            <h2 class="text-lg font-semibold text-gray-900">
              {{ userProfile?.email }}
            </h2>
            <p class="text-sm text-gray-500">
              Membro desde {{ formatDate(userProfile?.createdAt) }}
            </p>
          </div>
        </div>
        
        <div class="flex items-center space-x-2">
          <div class="flex items-center">
            <div class="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
            <span class="text-sm text-gray-600">Email confirmado</span>
          </div>
        </div>
      </div>

      <!-- Formulário de troca de senha -->
      <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">
          Alterar Senha
        </h3>
        
        <form @submit.prevent="handlePasswordChange" class="space-y-4">
          <!-- Nova Senha -->
          <InputPassword
            id="newPassword"
            v-model="passwordForm.newPassword"
            label="Nova Senha"
            placeholder="Digite sua nova senha"
            :error="passwordErrors.newPassword"
            required
          />

          <!-- Confirmar Nova Senha -->
          <InputPassword
            id="confirmPassword"
            v-model="passwordForm.confirmPassword"
            label="Confirmar Nova Senha"
            placeholder="Confirme sua nova senha"
            :error="passwordErrors.confirmPassword"
            required
          />

          <!-- Botão de Submit -->
          <div class="pt-2">
            <BaseButton
              type="submit"
              variant="primary"
              size="lg"
              class="w-full"
              :loading="isLoading"
            >
              Alterar Senha
            </BaseButton>
          </div>
        </form>
      </div>

      <!-- Botão Voltar -->
      <div class="mt-6 text-center">
        <button
          @click="$router.back()"
          class="text-blue-600 hover:text-blue-700 font-medium text-sm"
        >
          ← Voltar
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Meta tags
definePageMeta({
  title: 'Perfil'
})

// Composables
const { getUserProfile } = useAuth()

// Estado do usuário
const userProfile = computed(() => getUserProfile())

// Estado do formulário
const passwordForm = reactive({
  newPassword: '',
  confirmPassword: ''
})

// Erros de validação
const passwordErrors = reactive({
  newPassword: '',
  confirmPassword: ''
})

// Estado de loading
const isLoading = ref(false)

// Função para formatar data
const formatDate = (dateString: string | null | undefined) => {
  if (!dateString) return 'N/A'
  
  try {
    const date = new Date(dateString)
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    })
  } catch {
    return 'N/A'
  }
}

// Validação do formulário
const validateForm = (): boolean => {
  // Limpa erros anteriores
  passwordErrors.newPassword = ''
  passwordErrors.confirmPassword = ''
  
  let isValid = true

  // Validar nova senha
  if (!passwordForm.newPassword) {
    passwordErrors.newPassword = 'Nova senha é obrigatória'
    isValid = false
  } else if (passwordForm.newPassword.length < 6) {
    passwordErrors.newPassword = 'A senha deve ter pelo menos 6 caracteres'
    isValid = false
  }

  // Validar confirmação
  if (!passwordForm.confirmPassword) {
    passwordErrors.confirmPassword = 'Confirmação de senha é obrigatória'
    isValid = false
  } else if (passwordForm.newPassword !== passwordForm.confirmPassword) {
    passwordErrors.confirmPassword = 'As senhas não coincidem'
    isValid = false
  }

  return isValid
}

// Handler do formulário (ainda sem ação)
const handlePasswordChange = async () => {
  // Valida o formulário
  if (!validateForm()) {
    return
  }

  // TODO: Implementar lógica de troca de senha
  console.log('Formulário válido! Nova senha:', passwordForm.newPassword)
  
  // Simula loading por enquanto
  isLoading.value = true
  setTimeout(() => {
    isLoading.value = false
    console.log('Troca de senha seria executada aqui')
  }, 1000)
}

// Limpa erros quando o usuário digita
watch(() => passwordForm.newPassword, () => {
  if (passwordErrors.newPassword) {
    passwordErrors.newPassword = ''
  }
})

watch(() => passwordForm.confirmPassword, () => {
  if (passwordErrors.confirmPassword) {
    passwordErrors.confirmPassword = ''
  }
})
</script>