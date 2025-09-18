export default defineNuxtPlugin(async () => {
  const supabase = useSupabaseClient()
  
  // Função para limpar tokens corrompidos no lado cliente
  const clearCorruptedTokens = () => {
    try {
      const keys = Object.keys(localStorage)
      keys.forEach(key => {
        if (key.includes('supabase') || key.includes('auth-token') || key.startsWith('sb-')) {
          try {
            const value = localStorage.getItem(key)
            if (value) {
              // Tenta fazer parse para verificar se o token está válido
              const parsed = JSON.parse(value)
              if (parsed && parsed.refresh_token === null) {
                console.warn('Token corrompido encontrado, removendo:', key)
                localStorage.removeItem(key)
              }
            }
          } catch (error) {
            // Se não conseguir fazer parse, remove o item
            console.warn('Token inválido encontrado, removendo:', key)
            localStorage.removeItem(key)
          }
        }
      })
    } catch (error) {
      console.warn('Erro ao verificar tokens:', error)
    }
  }

  // Verifica e limpa tokens corrompidos na inicialização
  if (process.client) {
    clearCorruptedTokens()
    
    // Escuta mudanças de estado de autenticação
    supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'TOKEN_REFRESHED' && !session) {
        console.warn('Falha no refresh do token, limpando storage')
        clearCorruptedTokens()
      }
      
      if (event === 'SIGNED_OUT') {
        clearCorruptedTokens()
      }
    })
  }
})