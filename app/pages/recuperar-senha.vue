<template>
  <div class="min-h-screen bg-gray-50 flex items-center justify-center">
    <div class="max-w-md w-full bg-white rounded-lg shadow-md p-8">
      <!-- Logo simples -->
      <div class="text-center mb-8">
        <h1 class="text-2xl font-bold text-gray-900">Recuperar Senha</h1>
        <p class="text-gray-600 mt-2">Digite seu email para receber instruções</p>
      </div>

      <!-- Formulário simples -->
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

        <!-- Botão -->
        <BaseButton
          type="submit"
          variant="primary"
          full-width
          :disabled="!email"
        >
          Enviar instruções
        </BaseButton>
      </form>

      <!-- Links -->
      <div class="mt-6 text-center text-sm">
        <NuxtLink to="/login" class="text-blue-600 hover:text-blue-500">
          Voltar ao login
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Meta tags para SEO
useSeoMeta({
  title: 'Recuperar Senha - Auth App',
  description: 'Recupere sua senha inserindo seu email.',
})

// Estado do formulário
const email = ref('')

// Função de submit
async function handleSubmit() {
  if (!email.value) {
    return
  }

  // TODO: Implementar lógica de recuperação de senha
  console.log('Recuperar senha para:', email.value)
  alert(`Instruções enviadas para: ${email.value}`)
}
</script>
