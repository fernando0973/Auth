<template>
  <div class="min-h-screen bg-gray-50 flex items-center justify-center">
    <div class="max-w-md w-full bg-white rounded-lg shadow-md p-8">
      <div class="text-center">
        <!-- Loading State -->
        <div v-if="status === 'loading'" class="space-y-4">
          <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <h2 class="text-xl font-semibold text-gray-900">Confirmando email...</h2>
          <p class="text-gray-600">Aguarde enquanto processamos sua confirmação.</p>
        </div>

        <!-- Success State -->
        <div v-else-if="status === 'success'" class="space-y-4">
          <div class="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto">
            <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          <h2 class="text-xl font-semibold text-gray-900">Email confirmado!</h2>
          <p class="text-gray-600">{{ successMessage }}</p>
        </div>

        <!-- Error State -->
        <div v-else-if="status === 'error'" class="space-y-4">
          <div class="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto">
            <svg class="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </div>
          <h2 class="text-xl font-semibold text-gray-900">Erro na confirmação</h2>
          <p class="text-gray-600">{{ errorMessage }}</p>
          <NuxtLink 
            to="/login"
            class="block bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
          >
            Ir para Login
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Meta tags
useSeoMeta({
  title: 'Confirmando Email - Auth App',
  description: 'Página de confirmação de email.',
  robots: 'noindex, nofollow'
})

// Refs e estado
const user = useSupabaseUser()
const supabase = useSupabaseClient()
const route = useRoute()

const status = ref<'loading' | 'success' | 'error'>('loading')
const successMessage = ref('')
const errorMessage = ref('')

// Função principal de verificação
const checkConfirmation = async () => {
  try {
    console.log('🔍 Iniciando verificação de confirmação')

    // Verifica se há erro explícito na URL
    if (route.query.error) {
      console.log('❌ Erro encontrado na URL:', route.query.error)
      status.value = 'error'
      errorMessage.value = route.query.error_description as string || 'Erro na autenticação'
      return
    }

    // Aguarda um momento para o Supabase processar
    await new Promise(resolve => setTimeout(resolve, 1500))

    // Verifica sessão atual
    const { data: sessionData, error: sessionError } = await supabase.auth.getSession()
    
    console.log('📋 Dados da sessão:', {
      session: sessionData.session?.user?.email || null,
      error: sessionError?.message || null
    })

    if (sessionData.session) {
      console.log('✅ Sessão encontrada, confirmação bem-sucedida')
      status.value = 'success'
      successMessage.value = 'Redirecionando para o dashboard...'
      
      setTimeout(() => {
        navigateTo('/dashboard')
      }, 2000)
      return
    }

    // Se não há sessão, verifica se é uma confirmação válida pelos parâmetros
    const hasCode = route.query.code // Parâmetro code do Supabase
    const isSignupConfirmation = 
      route.query.type === 'signup' ||
      route.hash.includes('type=signup') ||
      route.hash.includes('access_token') ||
      route.query.token_hash ||
      hasCode // Código de confirmação

    console.log('🔍 Indicadores de confirmação:', {
      type: route.query.type,
      hasAccessToken: route.hash.includes('access_token'),
      hasTokenHash: !!route.query.token_hash,
      hasCode: !!hasCode,
      isConfirmation: isSignupConfirmation
    })

    if (isSignupConfirmation) {
      console.log('✅ Confirmação detectada pelos parâmetros da URL')
      
      // Se há um code, aguarda um pouco mais para o Supabase processar
      if (hasCode) {
        await new Promise(resolve => setTimeout(resolve, 3000))
        
        // Verifica sessão novamente após processamento do code
        const { data: codeData } = await supabase.auth.getSession()
        if (codeData.session) {
          console.log('✅ Sessão criada após processamento do code')
          status.value = 'success'
          successMessage.value = 'Redirecionando para o dashboard...'
          
          setTimeout(() => {
            navigateTo('/dashboard')
          }, 2000)
          return
        }
      }
      
      // Se não criou sessão automática, redireciona para login
      console.log('✅ Confirmação bem-sucedida, redirecionando para login')
      status.value = 'success'
      successMessage.value = 'Redirecionando para login...'
      
      setTimeout(() => {
        navigateTo('/login?message=Email confirmado com sucesso! Faça seu login.')
      }, 2000)
      return
    }

    // Aguarda mais um pouco para ver se a sessão aparece
    await new Promise(resolve => setTimeout(resolve, 3000))

    // Verifica sessão novamente
    const { data: finalData } = await supabase.auth.getSession()
    
    if (finalData.session) {
      console.log('✅ Sessão encontrada na segunda verificação')
      status.value = 'success'
      successMessage.value = 'Redirecionando para o dashboard...'
      
      setTimeout(() => {
        navigateTo('/dashboard')
      }, 2000)
      return
    }

    // Se chegou até aqui, é erro
    console.log('❌ Nenhuma confirmação válida detectada')
    status.value = 'error'
    errorMessage.value = 'Link de confirmação inválido ou expirado. Tente fazer login novamente.'

  } catch (error) {
    console.error('💥 Erro durante verificação:', error)
    status.value = 'error'
    errorMessage.value = 'Erro inesperado durante a confirmação.'
  }
}

// Observa mudanças no usuário
watch(user, (newUser) => {
  if (newUser && status.value === 'loading') {
    console.log('👤 Usuário detectado pelo watcher:', newUser.email)
    status.value = 'success'
    successMessage.value = 'Redirecionando para o dashboard...'
    
    setTimeout(() => {
      navigateTo('/dashboard')
    }, 1500)
  }
}, { immediate: true })

// Inicia verificação quando a página carrega
onMounted(() => {
  setTimeout(checkConfirmation, 500)
})
</script>
