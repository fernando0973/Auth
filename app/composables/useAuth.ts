interface LoginCredentials {
  email: string
  password: string
}

interface SignUpCredentials {
  email: string
  password: string
  confirmPassword?: string
}

interface AuthError {
  message: string
  code?: string
}

interface AuthState {
  isLoading: boolean
  error: string | null
}

export const useAuth = () => {
  // Cliente Supabase
  const supabase = useSupabaseClient()
  
  // Usuário atual (reativo)
  const user = useSupabaseUser()
  
  // Estado da autenticação
  const authState = reactive<AuthState>({
    isLoading: false,
    error: null
  })

  // Computed para verificar se está autenticado
  const isAuthenticated = computed(() => !!user.value)

  // Função para limpar erros
  const clearError = () => {
    authState.error = null
  }

  // Função para limpar tokens corrompidos/expirados
  const clearAuthTokens = async () => {
    try {
      // Verifica se estamos no lado cliente
      if (!process.client) return
      
      // Limpa a sessão do Supabase de forma silenciosa
      await supabase.auth.signOut({ scope: 'local' })
      
      // Limpa tokens do localStorage de forma segura
      try {
        const keys = Object.keys(localStorage)
        keys.forEach(key => {
          if (key.includes('supabase') || key.includes('auth-token') || key.startsWith('sb-')) {
            localStorage.removeItem(key)
          }
        })
      } catch (storageError) {
        console.warn('Erro ao limpar localStorage:', storageError)
      }
      
    } catch (error) {
      console.warn('Erro ao limpar tokens (não crítico):', error)
    }
  }

  // Função de login com email e senha
  const login = async (credentials: LoginCredentials): Promise<boolean> => {
    authState.isLoading = true
    authState.error = null

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: credentials.email,
        password: credentials.password
      })

      if (error) {
        throw error
      }

      if (data.user) {
        console.log('Login bem-sucedido:', data.user.email)
        return true
      }

      throw new Error('Falha na autenticação')

    } catch (error: any) {
      console.error('Erro no login:', error)
      
      // Tratamento de erros específicos do Supabase
      const authError = error as AuthError
      
      switch (authError.code) {
        case 'invalid_credentials':
          authState.error = 'Email ou senha incorretos'
          break
        case 'email_not_confirmed':
          authState.error = 'Email não confirmado. Verifique sua caixa de entrada'
          break
        case 'too_many_requests':
          authState.error = 'Muitas tentativas. Tente novamente em alguns minutos'
          break
        default:
          authState.error = authError.message || 'Erro desconhecido no login'
      }
      
      return false

    } finally {
      authState.isLoading = false
    }
  }

  // Função de criação de conta
  const signUp = async (credentials: SignUpCredentials): Promise<boolean> => {
    authState.isLoading = true
    authState.error = null

    try {
      const { data, error } = await supabase.auth.signUp({
        email: credentials.email,
        password: credentials.password,
        options: {
          emailRedirectTo: `${window.location.origin}/confirm`
        }
      })

      if (error) {
        throw error
      }

      if (data.user) {
        console.log('Conta criada com sucesso:', data.user.email)
        
        // Sempre retorna true para conta criada com sucesso
        // O formulário vai mostrar o modal baseado no sucesso
        return true
      }

      throw new Error('Falha na criação da conta')

    } catch (error: any) {
      console.error('Erro na criação da conta:', error)
      
      // Tratamento de erros específicos do Supabase
      const authError = error as AuthError
      
      switch (authError.code) {
        case 'user_already_exists':
          authState.error = 'Este email já está cadastrado'
          break
        case 'weak_password':
          authState.error = 'A senha deve ter pelo menos 6 caracteres'
          break
        case 'invalid_email':
          authState.error = 'Email inválido'
          break
        case 'signup_disabled':
          authState.error = 'Cadastro de novos usuários está desabilitado'
          break
        default:
          authState.error = authError.message || 'Erro desconhecido na criação da conta'
      }
      
      return false

    } finally {
      authState.isLoading = false
    }
  }

  // Função de login com magic link (OTP)
  const loginWithMagicLink = async (email: string): Promise<boolean> => {
    authState.isLoading = true
    authState.error = null

    try {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/confirm`
        }
      })

      if (error) {
        throw error
      }

      console.log('Magic link enviado para:', email)
      return true

    } catch (error: any) {
      console.error('Erro ao enviar magic link:', error)
      authState.error = error.message || 'Erro ao enviar link de confirmação'
      return false

    } finally {
      authState.isLoading = false
    }
  }

  // Função de logout
  const logout = async (): Promise<boolean> => {
    authState.isLoading = true
    authState.error = null

    try {
      const { error } = await supabase.auth.signOut()

      if (error) {
        throw error
      }

      console.log('Logout realizado com sucesso')
      
      // Redireciona para login após logout
      await navigateTo('/login')
      
      return true

    } catch (error: any) {
      console.error('Erro no logout:', error)
      authState.error = error.message || 'Erro ao fazer logout'
      return false

    } finally {
      authState.isLoading = false
    }
  }

  // Função para alterar senha do usuário logado
  const changePassword = async (newPassword: string): Promise<boolean> => {
    authState.isLoading = true
    authState.error = null

    try {
      const { data, error } = await supabase.auth.updateUser({
        password: newPassword
      })

      if (error) {
        throw error
      }

      if (data.user) {
        console.log('Senha alterada com sucesso')
        return true
      }

      throw new Error('Falha na alteração da senha')

    } catch (error: any) {
      console.error('Erro ao alterar senha:', error)
      
      // Tratamento de erros específicos do Supabase
      const authError = error as AuthError
      
      switch (authError.code) {
        case 'weak_password':
          authState.error = 'A nova senha deve ter pelo menos 6 caracteres'
          break
        case 'same_password':
          authState.error = 'A nova senha deve ser diferente da atual'
          break
        default:
          authState.error = authError.message || 'Erro desconhecido ao alterar senha'
      }
      
      return false

    } finally {
      authState.isLoading = false
    }
  }

  // Função para solicitar reset de senha via email
  const requestPasswordReset = async (email: string): Promise<boolean> => {
    authState.isLoading = true
    authState.error = null

    try {
      const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/recuperar-senha`
      })

      if (error) {
        throw error
      }

      console.log('Email de reset enviado para:', email)
      return true

    } catch (error: any) {
      console.error('Erro ao solicitar reset de senha:', error)
      
      const authError = error as AuthError
      
      switch (authError.code) {
        case 'invalid_email':
          authState.error = 'Email inválido'
          break
        case 'email_not_found':
          authState.error = 'Email não encontrado em nossa base de dados'
          break
        case 'too_many_requests':
          authState.error = 'Muitas tentativas. Tente novamente em alguns minutos'
          break
        default:
          authState.error = authError.message || 'Erro ao enviar email de recuperação'
      }
      
      return false

    } finally {
      authState.isLoading = false
    }
  }

  // Função para obter informações do usuário atual
  const getUserProfile = () => {
    if (!user.value) return null
    
    return {
      id: user.value.id,
      email: user.value.email,
      emailConfirmed: user.value.email_confirmed_at !== null,
      createdAt: user.value.created_at,
      lastSignIn: user.value.last_sign_in_at,
      metadata: user.value.user_metadata
    }
  }

  // Função para verificar se email está confirmado
  const isEmailConfirmed = computed(() => {
    return user.value?.email_confirmed_at !== null
  })

  return {
    // Estado
    user: readonly(user),
    authState: readonly(authState),
    isAuthenticated,
    isEmailConfirmed,
    
    // Funções
    login,
    signUp,
    loginWithMagicLink,
    logout,
    changePassword,
    requestPasswordReset,
    clearError,
    clearAuthTokens,
    getUserProfile
  }
}
