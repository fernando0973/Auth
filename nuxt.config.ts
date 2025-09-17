// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: false },
  modules: ['@nuxtjs/tailwindcss', '@nuxtjs/supabase'],
  supabase: {
    redirect: true,
    redirectOptions: {
      login: '/login',
      callback: '/confirm',
      exclude: ['/docs', '/recuperar-senha', '/login', '/criar-conta']
    },
    cookieOptions: {
      secure: process.env.NODE_ENV === 'production'
    }
  },
  ssr: true
})