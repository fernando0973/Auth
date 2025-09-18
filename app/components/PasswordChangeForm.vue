<template>
  <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
    <div class="mb-6">
      <h3 class="text-lg font-semibold text-gray-900 mb-2">Alterar Senha</h3>
      <p class="text-sm text-gray-600">
        Mantenha sua conta segura com uma senha forte
      </p>
    </div>

    <form @submit.prevent="handlePasswordChange" class="space-y-4">
      <!-- Senha Atual -->
      <div>
        <label for="currentPassword" class="block text-sm font-medium text-gray-700 mb-1">
          Senha Atual *
        </label>
        <InputPassword
          id="currentPassword"
          v-model="form.currentPassword"
          placeholder="Digite sua senha atual"
          :error="errors.currentPassword"
          required
        />
      </div>

      <!-- Nova Senha -->
      <div>
        <label for="newPassword" class="block text-sm font-medium text-gray-700 mb-1">
          Nova Senha *
        </label>
        <InputPassword
          id="newPassword"
          v-model="form.newPassword"
          placeholder="Digite sua nova senha"
          :error="errors.newPassword"
          required
        />
        
        <!-- Indicador de força da senha -->
        <div v-if="form.newPassword" class="mt-2">
          <div class="flex items-center space-x-2 text-xs">
            <span class="text-gray-600">Força:</span>
            <div class="flex space-x-1">
              <div 
                v-for="i in 4" 
                :key="i"
                class="w-6 h-1 rounded-full"
                :class="getStrengthBarColor(i)"
              ></div>
            </div>
            <span :class="getStrengthTextColor()">
              {{ passwordStrengthText }}
            </span>
          </div>
          
          <!-- Dicas de senha -->
          <div class="mt-2 space-y-1">
            <div 
              v-for="requirement in passwordRequirements" 
              :key="requirement.label"
              class="flex items-center text-xs"
              :class="requirement.met ? 'text-green-600' : 'text-gray-500'"
            >
              <svg 
                class="w-3 h-3 mr-1" 
                :class="requirement.met ? 'text-green-500' : 'text-gray-400'"
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  v-if="requirement.met"
                  stroke-linecap="round" 
                  stroke-linejoin="round" 
                  stroke-width="2" 
                  d="M5 13l4 4L19 7"
                ></path>
                <circle 
                  v-else
                  cx="12" 
                  cy="12" 
                  r="10" 
                  stroke-width="2"
                ></circle>
              </svg>
              {{ requirement.label }}
            </div>
          </div>
        </div>
      </div>

      <!-- Confirmação da Nova Senha -->
      <div>
        <label for="confirmPassword" class="block text-sm font-medium text-gray-700 mb-1">
          Confirmar Nova Senha *
        </label>
        <InputPassword
          id="confirmPassword"
          v-model="form.confirmPassword"
          placeholder="Confirme sua nova senha"
          :error="errors.confirmPassword"
          required
        />
      </div>

      <!-- Botões -->
      <div class="flex justify-end space-x-3 pt-4">
        <BaseButton
          type="button"
          variant="ghost"
          @click="resetForm"
          :disabled="isLoading"
        >
          Cancelar
        </BaseButton>
        
        <BaseButton
          type="submit"
          :loading="isLoading"
          :disabled="!isFormValid"
        >
          Alterar Senha
        </BaseButton>
      </div>
    </form>

    <!-- Modal de sucesso -->
    <BaseModal
      :is-open="showSuccessModal"
      type="success"
      title="Senha alterada!"
      description="Sua senha foi alterada com sucesso."
      confirm-button-text="Entendi"
      :show-cancel-button="false"
      @confirm="handleSuccessModalClose"
      @close="handleSuccessModalClose"
    />

    <!-- Modal de erro -->
    <BaseModal
      :is-open="showErrorModal"
      type="error"
      :title="errorModalTitle"
      :description="errorModalMessage"
      confirm-button-text="Entendi"
      :show-cancel-button="false"
      @confirm="handleErrorModalClose"
      @close="handleErrorModalClose"
    />
  </div>
</template>

<script setup lang="ts">
interface PasswordRequirement {
  label: string
  met: boolean
  test: (password: string) => boolean
}

// Estado do formulário
const form = reactive({
  currentPassword: '',
  newPassword: '',
  confirmPassword: ''
})

const errors = reactive({
  currentPassword: '',
  newPassword: '',
  confirmPassword: ''
})

const isLoading = ref(false)

// Estado dos modals
const showSuccessModal = ref(false)
const showErrorModal = ref(false)
const errorModalTitle = ref('')
const errorModalMessage = ref('')

// Funções dos modals
const handleSuccessModalClose = () => {
  showSuccessModal.value = false
}

const handleErrorModalClose = () => {
  showErrorModal.value = false
  errorModalTitle.value = ''
  errorModalMessage.value = ''
}

// Validação de força da senha
const passwordRequirements = computed((): PasswordRequirement[] => [
  {
    label: 'Mínimo 8 caracteres',
    met: form.newPassword.length >= 8,
    test: (password: string) => password.length >= 8
  },
  {
    label: 'Pelo menos 1 letra maiúscula',
    met: /[A-Z]/.test(form.newPassword),
    test: (password: string) => /[A-Z]/.test(password)
  },
  {
    label: 'Pelo menos 1 letra minúscula',
    met: /[a-z]/.test(form.newPassword),
    test: (password: string) => /[a-z]/.test(password)
  },
  {
    label: 'Pelo menos 1 número',
    met: /\d/.test(form.newPassword),
    test: (password: string) => /\d/.test(password)
  },
  {
    label: 'Pelo menos 1 caractere especial',
    met: /[!@#$%^&*(),.?":{}|<>]/.test(form.newPassword),
    test: (password: string) => /[!@#$%^&*(),.?":{}|<>]/.test(password)
  }
])

const passwordStrength = computed(() => {
  if (!form.newPassword) return 0
  
  return passwordRequirements.value.filter(req => req.met).length
})

const passwordStrengthText = computed(() => {
  const strength = passwordStrength.value
  if (strength <= 1) return 'Muito fraca'
  if (strength <= 2) return 'Fraca'
  if (strength <= 3) return 'Média'
  if (strength <= 4) return 'Forte'
  return 'Muito forte'
})

const getStrengthBarColor = (index: number) => {
  const strength = passwordStrength.value
  if (index <= strength) {
    if (strength <= 1) return 'bg-red-500'
    if (strength <= 2) return 'bg-orange-500'
    if (strength <= 3) return 'bg-yellow-500'
    if (strength <= 4) return 'bg-blue-500'
    return 'bg-green-500'
  }
  return 'bg-gray-200'
}

const getStrengthTextColor = () => {
  const strength = passwordStrength.value
  if (strength <= 1) return 'text-red-600'
  if (strength <= 2) return 'text-orange-600'
  if (strength <= 3) return 'text-yellow-600'
  if (strength <= 4) return 'text-blue-600'
  return 'text-green-600'
}

// Validação do formulário
const isFormValid = computed(() => {
  return (
    form.currentPassword.length > 0 &&
    form.newPassword.length >= 8 &&
    form.confirmPassword.length > 0 &&
    form.newPassword === form.confirmPassword &&
    passwordStrength.value >= 3 // Mínimo "média"
  )
})

// Função de validação da confirmação de senha
const validateConfirmPassword = () => {
  errors.confirmPassword = ''
  
  if (form.confirmPassword && form.newPassword !== form.confirmPassword) {
    errors.confirmPassword = 'As senhas não coincidem'
  }
}

// Validações em tempo real
watch(() => form.newPassword, () => {
  errors.newPassword = ''
  
  if (form.newPassword && form.newPassword.length < 8) {
    errors.newPassword = 'A senha deve ter pelo menos 8 caracteres'
  }
  
  // Revalida confirmação quando nova senha muda
  if (form.confirmPassword) {
    validateConfirmPassword()
  }
})

watch(() => form.confirmPassword, validateConfirmPassword)

// Reset do formulário
const resetForm = () => {
  form.currentPassword = ''
  form.newPassword = ''
  form.confirmPassword = ''
  
  errors.currentPassword = ''
  errors.newPassword = ''
  errors.confirmPassword = ''
}

// Função principal de troca de senha
const handlePasswordChange = async () => {
  if (!isFormValid.value) return
  
  try {
    isLoading.value = true
    
    // Limpa erros anteriores
    errors.currentPassword = ''
    errors.newPassword = ''
    errors.confirmPassword = ''
    
    const supabase = useSupabaseClient()
    
    // Primeira tentativa: validar senha atual fazendo login
    const user = useSupabaseUser()
    if (!user.value?.email) {
      throw new Error('Usuário não encontrado')
    }
    
    // Tenta fazer signIn para validar senha atual
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: user.value.email,
      password: form.currentPassword
    })
    
    if (signInError) {
      errors.currentPassword = 'Senha atual incorreta'
      return
    }
    
    // Se chegou até aqui, a senha atual está correta
    // Agora atualiza a senha
    const { error: updateError } = await supabase.auth.updateUser({
      password: form.newPassword
    })
    
    if (updateError) {
      throw updateError
    }
    
    // Sucesso!
    showSuccessModal.value = true
    
    // Reset do formulário
    resetForm()
    
  } catch (error: any) {
    console.error('Erro ao alterar senha:', error)
    
    errorModalTitle.value = 'Erro ao alterar senha'
    errorModalMessage.value = error.message || 'Ocorreu um erro inesperado. Tente novamente.'
    showErrorModal.value = true
  } finally {
    isLoading.value = false
  }
}
</script>