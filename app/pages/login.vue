<template>
  <div class="min-h-screen bg-gray-50 flex items-center justify-center">
    <div class="max-w-md w-full bg-white rounded-lg shadow-md p-8">
      <!-- Logo simples -->
      <div class="text-center mb-8">
        <h1 class="text-2xl font-bold text-gray-900">Login</h1>
        <p class="text-gray-600 mt-2">Entre na sua conta</p>
      </div>

      <!-- Mensagem de sucesso da confirmação -->
      <div 
        v-if="successMessage" 
        class="mb-6 rounded-md bg-green-50 p-4 border border-green-200"
      >
        <div class="flex">
          <div class="flex-shrink-0">
            <svg class="h-5 w-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div class="ml-3">
            <p class="text-sm text-green-800">
              {{ successMessage }}
            </p>
          </div>
        </div>
      </div>

      <!-- Formulário simples -->
      <ClientOnly>
        <form class="space-y-6" @submit.prevent="handleSubmit">
          <!-- Email -->
          <div>
            <BaseInput
              v-model="email"
              type="email"
              label="Email"
              placeholder="Digite seu email"
              required
            />
          </div>

          <!-- Senha -->
          <div>
            <InputPassword
              v-model="password"
              label="Senha"
              placeholder="Digite sua senha"
              required
            />
          </div>

          <!-- Botão -->
          <BaseButton
            type="submit"
            variant="primary"
            full-width
            :loading="authState.isLoading"
            :disabled="!email || !password"
          >
            {{ authState.isLoading ? 'Entrando...' : 'Entrar' }}
          </BaseButton>

          <!-- Mensagem de erro -->
          <div 
            v-if="authState.error" 
            class="rounded-md bg-red-50 p-4 border border-red-200"
          >
            <div class="flex">
              <div class="flex-shrink-0">
                <svg class="h-5 w-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <div class="ml-3">
                <p class="text-sm text-red-800">
                  {{ authState.error }}
                </p>
              </div>
            </div>
          </div>
        </form>
        
        <template #fallback>
          <div class="space-y-6">
            <div class="animate-pulse">
              <div class="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
              <div class="h-10 bg-gray-200 rounded"></div>
            </div>
            <div class="animate-pulse">
              <div class="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
              <div class="h-10 bg-gray-200 rounded"></div>
            </div>
            <div class="h-10 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </template>
      </ClientOnly>

      <!-- Links -->
      <div class="mt-6 text-center text-sm space-y-2">
        <div>
          <NuxtLink to="/recuperar-senha" class="text-blue-600 hover:text-blue-500">
            Esqueceu sua senha?
          </NuxtLink>
        </div>
        <div>
          <NuxtLink to="/criar-conta" class="text-blue-600 hover:text-blue-500">
            Não tem uma conta? Criar conta
          </NuxtLink>
        </div>
        <div>
          <NuxtLink to="/" class="text-gray-500 hover:text-gray-700">
            Voltar à página inicial
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Meta tags para SEO
useSeoMeta({
  title: 'Login - Auth App',
  description: 'Faça login na sua conta.',
})

// Aguarda hidratação para evitar mismatches
const hydrated = ref(false)

// Composable de autenticação
const { login, authState, isAuthenticated, clearError } = useAuth()

// Estados do formulário
const email = ref('')
const password = ref('')

// Mensagem de sucesso (vinda da confirmação de email)
const successMessage = ref('')

// Captura mensagem de sucesso da query string
const route = useRoute()
if (route.query.message) {
  successMessage.value = route.query.message as string
}

// Função de submit
async function handleSubmit() {
  if (!email.value || !password.value) {
    return
  }

  const success = await login({
    email: email.value,
    password: password.value
  })

  if (success) {
    // Login bem-sucedido, redireciona para a página inicial
    await navigateTo('/')
  }
}

// Limpa erros quando o usuário começa a digitar
watch([email, password], () => {
  if (authState.error) {
    clearError()
  }
})

// Verifica se usuário já está logado e redireciona
watch(isAuthenticated, (authenticated) => {
  if (authenticated && hydrated.value) {
    // Se já estiver logado, redireciona para a página inicial
    navigateTo('/')
  }
})

// Marca como hidratado após mounted e verifica autenticação
onMounted(() => {
  hydrated.value = true
  
  // Verifica se usuário já está autenticado após hidratação
  if (isAuthenticated.value) {
    console.log('Usuário já autenticado, redirecionando para /')
    navigateTo('/')
  }
})
</script>
