<template>
  <DashboardLayout 
    page-title="Documentação"
    page-description="Guia completo do sistema de autenticação"
  >
    <!-- Navegação -->
    <div class="bg-white rounded-lg shadow-sm p-6 mb-8">
      <nav class="flex space-x-6">
        <a href="#inicio" class="text-blue-600 hover:text-blue-800 font-medium">Início Rápido</a>
        <a href="#auth" class="text-blue-600 hover:text-blue-800 font-medium">Autenticação</a>
        <a href="#components" class="text-blue-600 hover:text-blue-800 font-medium">Componentes</a>
        <a href="#api" class="text-blue-600 hover:text-blue-800 font-medium">API</a>
      </nav>
    </div>

    <!-- Conteúdo -->
    <div class="space-y-8">
      <!-- Início Rápido -->
      <section id="inicio" class="bg-white rounded-lg shadow-sm p-8">
        <h2 class="text-2xl font-bold text-gray-900 mb-4">Início Rápido</h2>
        <p class="text-gray-600 mb-4">
          Este sistema utiliza Nuxt 4 + Supabase para fornecer autenticação segura e moderna.
        </p>
        <div class="bg-gray-100 rounded-lg p-4">
          <h3 class="font-semibold mb-2">Tecnologias Utilizadas:</h3>
          <ul class="list-disc list-inside space-y-1 text-gray-700">
            <li>Nuxt 4 - Framework Vue.js</li>
            <li>Supabase - Backend as a Service</li>
            <li>TailwindCSS - Framework CSS</li>
            <li>TypeScript - Tipagem estática</li>
          </ul>
        </div>
      </section>

      <!-- Autenticação -->
      <section id="auth" class="bg-white rounded-lg shadow-sm p-8">
        <h2 class="text-2xl font-bold text-gray-900 mb-4">Sistema de Autenticação</h2>
        <p class="text-gray-600 mb-4">
          O sistema oferece autenticação segura com redirecionamento automático e gerenciamento de sessão.
        </p>
        
        <h3 class="text-lg font-semibold mb-2">Páginas Disponíveis:</h3>
        <div class="grid md:grid-cols-2 gap-4 mb-6">
          <div class="border rounded-lg p-4">
            <h4 class="font-medium text-blue-600">/login</h4>
            <p class="text-sm text-gray-600">Página de autenticação com email e senha</p>
          </div>
          <div class="border rounded-lg p-4">
            <h4 class="font-medium text-blue-600">/confirm</h4>
            <p class="text-sm text-gray-600">Confirmação de email e callback</p>
          </div>
          <div class="border rounded-lg p-4">
            <h4 class="font-medium text-blue-600">/dashboard</h4>
            <p class="text-sm text-gray-600">Painel administrativo (protegido)</p>
          </div>
          <div class="border rounded-lg p-4">
            <h4 class="font-medium text-blue-600">/</h4>
            <p class="text-sm text-gray-600">Página inicial (protegida)</p>
          </div>
        </div>

        <h3 class="text-lg font-semibold mb-2">Fluxo de Autenticação:</h3>
        <ol class="list-decimal list-inside space-y-2 text-gray-700">
          <li>Usuário acessa página protegida</li>
          <li>Sistema redireciona para /login</li>
          <li>Usuário insere credenciais</li>
          <li>Sistema valida com Supabase</li>
          <li>Redirecionamento para página original</li>
        </ol>
      </section>

      <!-- Componentes -->
      <section id="components" class="bg-white rounded-lg shadow-sm p-8">
        <h2 class="text-2xl font-bold text-gray-900 mb-4">Componentes</h2>
        <p class="text-gray-600 mb-4">
          Sistema de componentes reutilizáveis para interface consistente.
        </p>

        <div class="space-y-4">
          <div class="border-l-4 border-blue-500 pl-4">
            <h3 class="font-semibold">BaseInput</h3>
            <p class="text-sm text-gray-600">Input reutilizável com validação e estados</p>
          </div>
          <div class="border-l-4 border-green-500 pl-4">
            <h3 class="font-semibold">InputPassword</h3>
            <p class="text-sm text-gray-600">Campo de senha com toggle de visibilidade</p>
          </div>
          <div class="border-l-4 border-purple-500 pl-4">
            <h3 class="font-semibold">BaseButton</h3>
            <p class="text-sm text-gray-600">Botão com variantes e estados de loading</p>
          </div>
        </div>
      </section>

      <!-- API -->
      <section id="api" class="bg-white rounded-lg shadow-sm p-8">
        <h2 class="text-2xl font-bold text-gray-900 mb-4">Composable useAuth</h2>
        <p class="text-gray-600 mb-4">
          Composable centralizado para gerenciamento de autenticação.
        </p>

        <div class="bg-gray-100 rounded-lg p-4">
          <h3 class="font-semibold mb-2">Métodos Disponíveis:</h3>
          <ul class="space-y-2 text-sm">
            <li><code class="bg-gray-200 px-2 py-1 rounded">login(credentials)</code> - Autenticação com email/senha</li>
            <li><code class="bg-gray-200 px-2 py-1 rounded">loginWithMagicLink(email)</code> - Login via email</li>
            <li><code class="bg-gray-200 px-2 py-1 rounded">logout()</code> - Encerrar sessão</li>
            <li><code class="bg-gray-200 px-2 py-1 rounded">clearError()</code> - Limpar mensagens de erro</li>
            <li><code class="bg-gray-200 px-2 py-1 rounded">getUserProfile()</code> - Dados do usuário</li>
          </ul>
        </div>
      </section>
    </div>

    <!-- Footer -->
    <div class="text-center mt-12 pt-8 border-t">
      <p class="text-gray-500">
        Documentação do Sistema de Autenticação - Nuxt 4 + Supabase
      </p>
    </div>
  </DashboardLayout>
</template>

<script setup lang="ts">
// Meta tags para SEO
useSeoMeta({
  title: 'Documentação - Auth App',
  description: 'Documentação completa do sistema de autenticação com Nuxt 4 e Supabase.',
})
</script>
