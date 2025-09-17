# Auth - Sistema de Autenticação Completo

![Nuxt 4](https://img.shields.io/badge/Nuxt-4.1.1-00DC82?style=for-the-badge&logo=nuxt.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)

Sistema completo de autenticação desenvolvido com **Nuxt 4**, **Supabase** e **TailwindCSS**. Inclui registro de usuários, login, confirmação por email, componentes reutilizáveis e interface responsiva.

## ✨ Funcionalidades

- 🔐 **Sistema de Autenticação Completo**
  - Registro de usuários com validação
  - Login com email e senha
  - Confirmação obrigatória por email
  - Recuperação de senha
  - Logout seguro

- 🎨 **Interface Moderna**
  - Design responsivo com TailwindCSS
  - Componentes reutilizáveis
  - Modal profissional para alertas
  - Estados de loading em tempo real
  - Validação visual de formulários

- 🛡️ **Segurança**
  - Integração com Supabase Auth
  - Proteção de rotas
  - Tratamento de erros específicos
  - Tipagem TypeScript completa

## 🚀 Tecnologias Utilizadas

### Frontend
- **[Nuxt 4](https://nuxt.com/)** - Framework Vue.js full-stack
- **[Vue 3](https://vuejs.org/)** - Framework reativo com Composition API
- **[TypeScript](https://www.typescriptlang.org/)** - Tipagem estática
- **[TailwindCSS](https://tailwindcss.com/)** - Framework CSS utility-first

### Backend & Autenticação
- **[Supabase](https://supabase.com/)** - Backend as a Service
- **[@nuxtjs/supabase](https://supabase.nuxtjs.org/)** - Módulo oficial Nuxt

### Ferramentas
- **[Vite](https://vitejs.dev/)** - Build tool ultra-rápido
- **[ESLint](https://eslint.org/)** - Linting de código
- **Git** - Controle de versão

## 📁 Estrutura do Projeto

```
Auth/
├── app/
│   ├── components/          # Componentes reutilizáveis
│   │   ├── BaseButton.vue   # Botão com variantes
│   │   ├── BaseInput.vue    # Campo de entrada
│   │   ├── BaseModal.vue    # Modal para alertas
│   │   ├── InputPassword.vue # Campo de senha
│   │   ├── LoginForm.vue    # Formulário de login
│   │   └── RegisterForm.vue # Formulário de registro
│   │
│   ├── composables/         # Lógica reutilizável
│   │   └── useAuth.ts       # Gerenciamento de autenticação
│   │
│   ├── pages/              # Rotas da aplicação
│   │   ├── index.vue       # Página inicial
│   │   ├── login.vue       # Página de login
│   │   ├── criar-conta.vue # Página de registro
│   │   ├── confirm.vue     # Confirmação de email
│   │   ├── dashboard.vue   # Área autenticada
│   │   ├── docs.vue        # Documentação
│   │   └── recuperar-senha.vue # Reset de senha
│   │
│   └── app.vue             # Layout principal
│
├── .github/
│   ├── instructions/       # Guias de desenvolvimento
│   └── prompts/            # Documentação Supabase
│
├── public/                 # Arquivos estáticos
├── nuxt.config.ts         # Configuração Nuxt
├── tailwind.config.js     # Configuração Tailwind
└── package.json           # Dependências
```

## ⚙️ Configuração e Instalação

### Pré-requisitos
- Node.js 18+ 
- npm ou yarn
- Conta no Supabase

### 1. Clone o repositório
```bash
git clone https://github.com/fernando0973/Auth.git
cd Auth
```

### 2. Instale as dependências
```bash
npm install
```

### 3. Configure as variáveis de ambiente
Crie um arquivo `.env` na raiz do projeto:

```env
SUPABASE_URL=sua_url_do_supabase
SUPABASE_KEY=sua_chave_publica_do_supabase
```

### 4. Configure o Supabase
1. Crie um projeto no [Supabase](https://supabase.com/)
2. Ative a autenticação por email
3. Configure as URLs de redirect:
   - Site URL: `http://localhost:3000`
   - Redirect URLs: `http://localhost:3000/confirm`

### 5. Execute o projeto
```bash
# Desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview da build
npm run preview
```

## 🎯 Componentes Principais

### BaseButton
Botão reutilizável com múltiplas variantes e estados.

```vue
<BaseButton 
  variant="primary" 
  size="lg" 
  :loading="isLoading"
  @click="handleClick"
>
  Clique aqui
</BaseButton>
```

**Variantes**: `primary`, `secondary`, `outline`, `ghost`, `danger`  
**Tamanhos**: `sm`, `md`, `lg`

### BaseInput
Campo de entrada com validação e estados de erro.

```vue
<BaseInput
  v-model="email"
  type="email"
  label="Email"
  placeholder="Digite seu email"
  :error="emailError"
  required
/>
```

### BaseModal
Modal responsivo para alertas e confirmações.

```vue
<BaseModal
  :is-open="showModal"
  type="success"
  title="Sucesso!"
  description="Operação realizada com sucesso."
  @confirm="handleConfirm"
  @close="closeModal"
/>
```

**Tipos**: `success`, `error`, `warning`, `info`

### useAuth Composable
Gerenciamento centralizado da autenticação.

```typescript
const { 
  user, 
  isAuthenticated, 
  login, 
  signUp, 
  logout 
} = useAuth()
```

## 🔐 Fluxo de Autenticação

### Registro de Usuário
1. Usuário preenche formulário de registro
2. Sistema cria conta no Supabase
3. Email de confirmação é enviado
4. Modal de sucesso é exibido
5. Usuário confirma email pelo link
6. Redirecionamento para login

### Login
1. Usuário insere credenciais
2. Validação local do formulário
3. Autenticação via Supabase
4. Redirecionamento para dashboard

### Proteção de Rotas
```typescript
// nuxt.config.ts
supabase: {
  redirectOptions: {
    login: '/login',
    callback: '/confirm',
    exclude: ['/docs', '/recuperar-senha', '/login', '/criar-conta']
  }
}
```

## 🎨 Customização do Design

### Cores do TailwindCSS
O projeto utiliza a paleta padrão do Tailwind com foco em:
- **Primário**: Blue (600, 700)
- **Sucesso**: Green (400, 600, 800)
- **Erro**: Red (400, 600, 800)
- **Neutro**: Gray (50-900)

### Componentes Responsivos
Todos os componentes são mobile-first e utilizam breakpoints:
- `sm:` 640px+
- `md:` 768px+
- `lg:` 1024px+

## 📱 Páginas e Rotas

| Rota | Descrição | Proteção |
|------|-----------|----------|
| `/` | Página inicial | Pública |
| `/login` | Autenticação | Pública |
| `/criar-conta` | Registro | Pública |
| `/confirm` | Confirmação email | Pública |
| `/recuperar-senha` | Reset senha | Pública |
| `/docs` | Documentação | Pública |
| `/dashboard` | Área logada | Protegida |

## 🛠️ Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview da build
npm run preview

# Linting
npm run lint

# Type checking
npm run type-check
```

## 🚀 Deploy

### Vercel (Recomendado)
```bash
npm i -g vercel
vercel
```

### Netlify
```bash
npm run build
# Upload da pasta .output/public
```

### Servidor próprio
```bash
npm run build
node .output/server/index.mjs
```

## 🤝 Contribuição

1. Fork o projeto
2. Crie sua feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 📞 Contato

**Fernando** - fernando0973@gmail.com

**Link do Projeto**: [https://github.com/fernando0973/Auth](https://github.com/fernando0973/Auth)

---

⭐ Se este projeto te ajudou, considere dar uma estrela!
