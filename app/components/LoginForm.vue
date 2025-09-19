<template>
  <form 
    class="space-y-6"
    @submit.prevent="handleSubmit"
  >
    <!-- Título do formulário -->
    <div class="text-center">
      <h2 class="text-3xl font-bold text-gray-900">
        Entre na sua conta
      </h2>
      <p class="mt-2 text-sm text-gray-600">
        Ou 
        <NuxtLink 
          to="/criar-conta" 
          class="font-medium text-blue-600 hover:text-blue-500 transition-colors"
        >
          crie uma nova conta
        </NuxtLink>
      </p>
    </div>

    <!-- Campo de email -->
    <BaseInput
      v-model="formData.email"
      type="email"
      label="Email"
      placeholder="Digite seu email"
      required
      :error="errors.email"
    />

    <!-- Campo de senha -->
    <InputPassword
      v-model="formData.password"
      label="Senha"
      placeholder="Digite sua senha"
      required
      :error="errors.password"
    />

    <!-- Link de esqueci minha senha -->
    <div class="flex items-center justify-between">
      <div class="flex items-center">
        <input
          id="remember-me"
          v-model="formData.rememberMe"
          name="remember-me"
          type="checkbox"
          class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
        />
        <label for="remember-me" class="ml-2 block text-sm text-gray-900">
          Lembrar de mim
        </label>
      </div>

      <div class="text-sm">
        <NuxtLink 
          to="/forgot-password" 
          class="font-medium text-blue-600 hover:text-blue-500 transition-colors"
        >
          Esqueceu sua senha?
        </NuxtLink>
      </div>
    </div>

    <!-- Mensagem de erro geral -->
    <div 
      v-if="errors.general" 
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
            {{ errors.general }}
          </p>
        </div>
      </div>
    </div>

    <!-- Botão de submit -->
    <BaseButton
      type="submit"
      variant="primary"
      size="lg"
      full-width
      :loading="isLoading"
      :disabled="!isFormValid"
    >
      {{ isLoading ? 'Entrando...' : 'Entrar' }}
    </BaseButton>

    <!-- Divider -->
    <div class="relative">
      <div class="absolute inset-0 flex items-center">
        <div class="w-full border-t border-gray-300" />
      </div>
      <div class="relative flex justify-center text-sm">
        <span class="px-2 bg-white text-gray-500">Ou continue com</span>
      </div>
    </div>

    <!-- Botões de login social (placeholder) -->
    <div class="grid grid-cols-2 gap-3">
      <BaseButton
        type="button"
        variant="outline"
        size="md"
        full-width
        @click="handleGoogleLogin"
      >
        <template #icon-left>
          <svg class="w-5 h-5 mr-2" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
        </template>
        Google
      </BaseButton>

      <BaseButton
        type="button"
        variant="outline"
        size="md"
        full-width
        @click="handleGithubLogin"
      >
        <template #icon-left>
          <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
          </svg>
        </template>
        GitHub
      </BaseButton>
    </div>
  </form>
</template>

<script setup lang="ts">
// Interface para os dados do formulário
interface LoginFormData {
  email: string
  password: string
  rememberMe: boolean
}

// Interface para os erros
interface LoginErrors {
  email?: string
  password?: string
  general?: string
}

// Composable de autenticação
const { login, authState, clearError } = useAuth()

// Estado do formulário
const formData = reactive<LoginFormData>({
  email: '',
  password: '',
  rememberMe: false
})

// Estado dos erros
const errors = reactive<LoginErrors>({})

// Estado de loading vem do composable
const isLoading = computed(() => authState.isLoading)

// Validação do formulário
const isFormValid = computed(() => {
  return formData.email.length > 0 && 
         formData.password.length > 0 && 
         isValidEmail(formData.email)
})

// Função auxiliar para validar email
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Função para limpar erros
function clearErrors() {
  Object.keys(errors).forEach(key => {
    delete errors[key as keyof LoginErrors]
  })
  clearError() // Limpa erros do composable também
}

// Função para validar campos
function validateForm(): boolean {
  clearErrors()
  let isValid = true

  if (!formData.email) {
    errors.email = 'Email é obrigatório'
    isValid = false
  } else if (!isValidEmail(formData.email)) {
    errors.email = 'Email inválido'
    isValid = false
  }

  if (!formData.password) {
    errors.password = 'Senha é obrigatória'
    isValid = false
  } else if (formData.password.length < 6) {
    errors.password = 'Senha deve ter pelo menos 6 caracteres'
    isValid = false
  }

  return isValid
}

// Handler do submit do formulário
async function handleSubmit() {
  if (!validateForm()) {
    return
  }

  clearErrors()

  try {
    const success = await login({
      email: formData.email,
      password: formData.password
    })

    if (success) {
      console.log('Login realizado com sucesso')
      await navigateTo('/dashboard')
    } else {
      // Erro será mostrado pelo composable em authState.error
      errors.general = authState.error || 'Erro desconhecido no login'
    }
    
  } catch (error) {
    console.error('Erro no login:', error)
    errors.general = 'Erro inesperado. Tente novamente.'
  }
}

// Handler para login com Google
function handleGoogleLogin() {
  console.log('Login com Google')
  // TODO: Implementar login com Google via Supabase
}

// Handler para login com GitHub
function handleGithubLogin() {
  console.log('Login com GitHub')
  // TODO: Implementar login com GitHub via Supabase
}
</script>
