export default defineNuxtRouteMiddleware((to, from) => {
  const user = useSupabaseUser()

  // Se não há usuário logado, redireciona para login
  if (!user.value) {
    return navigateTo('/login')
  }
})