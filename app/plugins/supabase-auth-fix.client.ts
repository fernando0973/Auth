export default defineNuxtPlugin(() => {
  const supabase = useSupabaseClient()
  
  // Só executa no lado cliente
  if (process.client) {
    // Escuta mudanças de estado de autenticação de forma mais simples
    supabase.auth.onAuthStateChange((event, session) => {
      console.log('Auth state change:', event, session?.user?.email || 'no user')
      
      // Log para debug de confirmações sem interferir no processo
      if (event === 'SIGNED_IN' && session) {
        console.log('Usuário logado via confirmação:', session.user.email)
      }
      
      if (event === 'SIGNED_OUT') {
        console.log('Usuário deslogado')
      }
    })
  }
})