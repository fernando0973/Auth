<template>
  <div class="min-h-screen bg-gray-50 flex items-center justify-center">
    <div class="max-w-md w-full bg-white rounded-lg shadow-md p-8">
      <!-- Logo simples -->
      <div class="text-center mb-8">
        <h1 class="text-2xl font-bold text-gray-900">Criar Conta</h1>
        <p class="text-gray-600 mt-2">Junte-se a nós hoje mesmo</p>
      </div>

      <!-- Formulário simples -->
      <ClientOnly>
        <RegisterForm />
        
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
            <div class="animate-pulse">
              <div class="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
              <div class="h-10 bg-gray-200 rounded"></div>
            </div>
            <div class="h-10 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </template>
      </ClientOnly>

      <!-- Links -->
      <div class="mt-6 text-center text-sm space-y-2">
        <div>
          <span class="text-gray-600">Já tem uma conta? </span>
          <NuxtLink to="/login" class="text-blue-600 hover:text-blue-500 font-medium">
            Faça login
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
  title: 'Criar Conta - Auth App',
  description: 'Crie sua conta para acessar todas as funcionalidades.',
})

// Aguarda hidratação para evitar mismatches
const hydrated = ref(false)

// Composable de autenticação
const { isAuthenticated } = useAuth()

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