<template>
  <div class="min-h-screen bg-gray-50 flex items-center justify-center">
    <div class="max-w-md w-full bg-white rounded-lg shadow-md p-8">
      <div class="text-center">
        <!-- Loading State -->
        <div v-if="!user && !error && !confirmed" class="space-y-4">
          <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <h2 class="text-xl font-semibold text-gray-900">Confirmando email...</h2>
          <p class="text-gray-600">Aguarde enquanto processamos sua confirmação.</p>
        </div>

        <!-- Success State - User logged in -->
        <div v-else-if="user && confirmed" class="space-y-4">
          <div class="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto">
            <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          <h2 class="text-xl font-semibold text-gray-900">Email confirmado!</h2>
          <p class="text-gray-600">Redirecionando para o dashboard...</p>
        </div>

        <!-- Success State - Email confirmed but needs login -->
        <div v-else-if="confirmed && !user" class="space-y-4">
          <div class="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto">
            <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          <h2 class="text-xl font-semibold text-gray-900">Email confirmado com sucesso!</h2>
          <p class="text-gray-600">Sua conta foi ativada. Redirecionando para a página de login...</p>
        </div>

        <!-- Error State -->
        <div v-else-if="error" class="space-y-4">
          <div class="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto">
            <svg class="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </div>
          <h2 class="text-xl font-semibold text-gray-900">Erro na confirmação</h2>
          <p class="text-gray-600">{{ error }}</p>
          <NuxtLink 
            to="/"
            class="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
          >
            Voltar ao início
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Meta tags para SEO
useSeoMeta({
  title: 'Confirmando Login - Auth App',
  description: 'Página de confirmação de login via email.',
  robots: 'noindex, nofollow' // Não indexar esta página
})

// Estados da aplicação
const user = useSupabaseUser()
const supabase = useSupabaseClient()
const error = ref<string | null>(null)
const confirmed = ref(false)
const route = useRoute()

// Observa mudanças no usuário
watch(user, (newUser) => {
  if (newUser && confirmed.value) {
    // Usuário autenticado com sucesso após confirmação
    setTimeout(() => {
      navigateTo('/dashboard')
    }, 2000) // Aguarda 2 segundos antes de redirecionar
  }
}, { immediate: true })

// Verifica confirmação de email
onMounted(async () => {
  // Verifica se há parâmetros de erro na URL
  if (route.query.error) {
    error.value = route.query.error_description as string || 'Erro desconhecido na autenticação'
    return
  }

  // Verifica se há tokens de confirmação na URL
  const { data, error: sessionError } = await supabase.auth.getSession()
  
  if (sessionError) {
    console.error('Erro ao obter sessão:', sessionError)
    error.value = 'Erro ao processar confirmação. Tente fazer login novamente.'
    return
  }

  if (data.session) {
    // Há uma sessão ativa, confirmação bem-sucedida
    confirmed.value = true
    
    // Se já há usuário, redireciona
    if (user.value) {
      setTimeout(() => {
        navigateTo('/dashboard')
      }, 2000)
    }
  } else {
    // Não há sessão, mas pode ser confirmação de email sem login automático
    // Verifica se há indicação de confirmação bem-sucedida
    if (route.query.type === 'signup' || route.hash.includes('access_token')) {
      // Email confirmado com sucesso, mas precisa fazer login
      confirmed.value = true
      setTimeout(() => {
        navigateTo('/login?message=Email confirmado com sucesso! Faça seu login.')
      }, 3000)
    } else {
      // Se não há usuário nem confirmação após 8 segundos, mostra erro
      setTimeout(() => {
        if (!user.value && !confirmed.value && !error.value) {
          error.value = 'Link de confirmação inválido ou expirado. Tente fazer login novamente.'
        }
      }, 8000)
    }
  }
})
</script>
