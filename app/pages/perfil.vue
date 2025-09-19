<template>
  <DashboardLayout 
    page-title="Perfil"
    page-description="Gerencie sua conta e configurações"
  >
    <div class="max-w-4xl mx-auto">
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
      <PasswordChangeForm />
    </div>
  </DashboardLayout>
</template>

<script setup lang="ts">
// Meta tags
useSeoMeta({
  title: 'Perfil - Auth App',
  description: 'Página de perfil do usuário.'
})

// Middleware de autenticação
definePageMeta({
  middleware: 'auth-guard'
})

// Composables
const { getUserProfile } = useAuth()

// Estado do usuário
const userProfile = computed(() => getUserProfile())

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
</script>