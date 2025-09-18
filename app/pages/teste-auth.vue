<template>
  <div class="min-h-screen bg-gray-50 p-8">
    <div class="max-w-4xl mx-auto">
      <h1 class="text-3xl font-bold mb-8">🧪 Teste de Confirmação de Email</h1>
      
      <!-- Status -->
      <div class="bg-white rounded-lg shadow p-6 mb-6">
        <h2 class="text-xl font-semibold mb-4">Status Atual</h2>
        <div class="grid grid-cols-2 gap-4">
          <div>
            <strong>Usuário:</strong> {{ user?.email || 'Não logado' }}
          </div>
          <div>
            <strong>Sessão:</strong> 
            <span :class="hasSession ? 'text-green-600' : 'text-red-600'">
              {{ hasSession ? 'Ativa' : 'Inativa' }}
            </span>
          </div>
        </div>
      </div>

      <!-- URL Info -->
      <div class="bg-white rounded-lg shadow p-6 mb-6">
        <h2 class="text-xl font-semibold mb-4">Informações da URL</h2>
        <div class="space-y-2 text-sm font-mono">
          <div><strong>Path:</strong> {{ $route.path }}</div>
          <div><strong>Query:</strong> {{ JSON.stringify($route.query, null, 2) }}</div>
          <div><strong>Hash:</strong> {{ $route.hash || '(vazio)' }}</div>
        </div>
      </div>

      <!-- Session Details -->
      <div class="bg-white rounded-lg shadow p-6 mb-6">
        <h2 class="text-xl font-semibold mb-4">Detalhes da Sessão</h2>
        <button 
          @click="checkSession" 
          class="bg-blue-600 text-white px-4 py-2 rounded mb-4 hover:bg-blue-700"
        >
          Verificar Sessão
        </button>
        <pre class="bg-gray-100 p-4 rounded text-sm overflow-auto">{{ sessionInfo }}</pre>
      </div>

      <!-- Auth State -->
      <div class="bg-white rounded-lg shadow p-6 mb-6">
        <h2 class="text-xl font-semibold mb-4">Estado de Autenticação</h2>
        <div class="space-y-2">
          <div><strong>Auth Events:</strong></div>
          <div v-for="(event, i) in authEvents" :key="i" class="text-sm bg-gray-100 p-2 rounded">
            <strong>{{ event.timestamp }}:</strong> {{ event.event }} - {{ event.description }}
          </div>
        </div>
      </div>

      <!-- Actions -->
      <div class="bg-white rounded-lg shadow p-6">
        <h2 class="text-xl font-semibold mb-4">Ações</h2>
        <div class="space-x-4">
          <NuxtLink to="/login" class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
            Ir para Login
          </NuxtLink>
          <NuxtLink to="/dashboard" class="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700">
            Ir para Dashboard
          </NuxtLink>
          <button @click="clearStorage" class="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
            Limpar Storage
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Estados
const user = useSupabaseUser()
const supabase = useSupabaseClient()
const hasSession = ref(false)
const sessionInfo = ref('Clique em "Verificar Sessão" para ver detalhes')
const authEvents = ref<Array<{timestamp: string, event: string, description: string}>>([])

// Função para verificar sessão
const checkSession = async () => {
  try {
    const { data, error } = await supabase.auth.getSession()
    
    sessionInfo.value = JSON.stringify({
      session: data.session ? {
        user: {
          id: data.session.user.id,
          email: data.session.user.email,
          email_confirmed_at: data.session.user.email_confirmed_at,
          created_at: data.session.user.created_at
        },
        access_token: data.session.access_token ? 'presente' : 'ausente',
        refresh_token: data.session.refresh_token ? 'presente' : 'ausente'
      } : null,
      error: error?.message || null
    }, null, 2)
    
    hasSession.value = !!data.session
  } catch (err) {
    sessionInfo.value = `Erro: ${err}`
  }
}

// Função para limpar storage
const clearStorage = () => {
  if (process.client) {
    localStorage.clear()
    sessionStorage.clear()
    location.reload()
  }
}

// Adiciona event logger
const addAuthEvent = (event: string, description: string) => {
  authEvents.value.unshift({
    timestamp: new Date().toLocaleTimeString(),
    event,
    description
  })
}

// Monitor de mudanças do usuário
watch(user, (newUser, oldUser) => {
  if (newUser && !oldUser) {
    addAuthEvent('USER_SIGNED_IN', `Usuário logado: ${newUser.email}`)
    hasSession.value = true
  } else if (!newUser && oldUser) {
    addAuthEvent('USER_SIGNED_OUT', `Usuário deslogado: ${oldUser.email}`)
    hasSession.value = false
  }
}, { immediate: true })

// Setup de auth listener
onMounted(() => {
  checkSession()
  
  // Listener para eventos de auth
  supabase.auth.onAuthStateChange((event, session) => {
    const description = session ? `${session.user?.email}` : 'Sem sessão'
    addAuthEvent(event, description)
    
    if (session) {
      hasSession.value = true
    }
  })
  
  addAuthEvent('PAGE_LOADED', `Página de teste carregada`)
})
</script>