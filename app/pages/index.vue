<template>
  <DashboardLayout 
    page-title="Página Principal"
    page-description="Bem-vindo ao seu projeto Nuxt 4 com TailwindCSS"
  >
    <!-- Hero Section -->
    <div class="text-center mb-16">
      <h2 class="text-5xl font-extrabold text-gray-900 mb-4">
        Bem-vindo ao seu projeto
        <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
          Nuxt 4
        </span>
      </h2>
      <p class="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
        Esta é uma página de teste para verificar se o TailwindCSS está funcionando corretamente.
        Aqui você pode ver diversos estilos e componentes responsivos.
      </p>
      <NuxtLink 
        to="/dashboard"
        class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition-colors transform hover:scale-105"
      >
        Acessar Dashboard
      </NuxtLink>
    </div>

    <!-- Features Grid -->
    <div class="grid md:grid-cols-3 gap-8 mb-16">
      <div class="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
        <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
          <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
          </svg>
        </div>
        <h3 class="text-xl font-semibold text-gray-900 mb-2">Super Rápido</h3>
        <p class="text-gray-600">
          Nuxt 4 oferece performance otimizada com renderização híbrida e build otimizado.
        </p>
      </div>

      <div class="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
        <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
          <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
        </div>
        <h3 class="text-xl font-semibold text-gray-900 mb-2">TypeScript</h3>
        <p class="text-gray-600">
          Desenvolvimento type-safe com suporte completo ao TypeScript out of the box.
        </p>
      </div>

      <div class="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
        <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
          <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17v4a2 2 0 002 2h4M15 7l3 3"></path>
          </svg>
        </div>
        <h3 class="text-xl font-semibold text-gray-900 mb-2">Flexível</h3>
        <p class="text-gray-600">
          Estrutura modular que cresce com seu projeto, desde MVPs até aplicações enterprise.
        </p>
      </div>
    </div>

    <!-- Stats Section -->
    <div class="bg-white rounded-2xl shadow-lg p-8">
      <h3 class="text-2xl font-bold text-gray-900 text-center mb-8">
        TailwindCSS em ação
      </h3>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div class="text-center">
          <div class="text-3xl font-bold text-blue-600 mb-2">100%</div>
          <div class="text-sm text-gray-600">Responsivo</div>
        </div>
        <div class="text-center">
          <div class="text-3xl font-bold text-green-600 mb-2">50+</div>
          <div class="text-sm text-gray-600">Classes CSS</div>
        </div>
        <div class="text-center">
          <div class="text-3xl font-bold text-purple-600 mb-2">∞</div>
          <div class="text-sm text-gray-600">Possibilidades</div>
        </div>
        <div class="text-center">
          <div class="text-3xl font-bold text-red-600 mb-2">0</div>
          <div class="text-sm text-gray-600">CSS customizado</div>
        </div>
      </div>
    </div>
  </DashboardLayout>
</template>

<script setup lang="ts">
// Meta tags para SEO
useSeoMeta({
  title: 'Home - Nuxt 4 + TailwindCSS',
  description: 'Página inicial do projeto Nuxt 4 com TailwindCSS para demonstração de estilos.',
  ogTitle: 'Home - Nuxt 4 + TailwindCSS',
  ogDescription: 'Página inicial do projeto Nuxt 4 com TailwindCSS para demonstração de estilos.',
})
</script>
