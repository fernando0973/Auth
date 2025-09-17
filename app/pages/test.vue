<template>
  <div class="min-h-screen bg-gray-50 flex items-center justify-center">
    <div class="max-w-md w-full bg-white rounded-lg shadow-md p-8">
      <h1 class="text-2xl font-bold text-gray-900 mb-6">Teste dos Componentes</h1>
      
      <!-- Teste BaseInput -->
      <div class="mb-6">
        <BaseInput
          v-model="testEmail"
          type="email"
          label="Email (BaseInput)"
          placeholder="Digite seu email"
        />
        <p class="text-sm text-gray-500 mt-1">Valor: {{ testEmail }}</p>
      </div>

      <!-- Teste InputPassword -->
      <div class="mb-6">
        <InputPassword
          v-model="testPassword"
          label="Senha (InputPassword)"
          placeholder="Digite sua senha"
        />
        <p class="text-sm text-gray-500 mt-1">Valor: {{ testPassword }}</p>
      </div>

      <!-- Teste BaseButton -->
      <div class="space-y-4">
        <BaseButton
          variant="primary"
          full-width
          @click="handleTest"
        >
          Botão Primário
        </BaseButton>
        
        <BaseButton
          variant="outline"
          full-width
          :loading="isLoading"
          @click="handleLoading"
        >
          Teste Loading
        </BaseButton>
      </div>

      <!-- Valores atuais -->
      <div class="mt-6 p-4 bg-gray-100 rounded">
        <h3 class="font-semibold mb-2">Valores:</h3>
        <p><strong>Email:</strong> {{ testEmail }}</p>
        <p><strong>Senha:</strong> {{ testPassword }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Estados de teste
const testEmail = ref('')
const testPassword = ref('')
const isLoading = ref(false)

// Funções de teste
function handleTest() {
  alert(`Email: ${testEmail.value}\nSenha: ${testPassword.value}`)
}

async function handleLoading() {
  isLoading.value = true
  await new Promise(resolve => setTimeout(resolve, 2000))
  isLoading.value = false
}
</script>
