# 🌳 Tree View Application

Uma aplicação React moderna e robusta para visualizar hierarquias de ativos empresariais com arquitetura enterprise-grade.

## ✨ Características Principais

- **🏢 Seleção Multi-Empresa**: Navegue entre diferentes empresas com contexto persistente
- **🌲 Árvore Hierárquica**: Visualização intuitiva de localizações, ativos e componentes
- **🔍 Filtros Avançados**: Sistema robusto de filtros com busca em tempo real
- **⚡ Performance**: Virtualização para datasets grandes e monitoramento de performance
- **📱 Responsivo**: Interface adaptável para todos os dispositivos
- **♿ Acessível**: Navegação por teclado e suporte a leitores de tela

## 🚀 Stack Tecnológica

### **Frontend**

- **React 18** - Biblioteca de UI moderna com hooks
- **TypeScript** - Tipagem estática e intellisense
- **Vite** - Build tool ultra-rápido e dev server
- **Tailwind CSS** - Framework CSS utilitário com design system customizado

### **Estado & Lógica**

- **Context API** - Gerenciamento de estado global
- **Custom Hooks** - Lógica de negócio reutilizável
- **React Query** - Gerenciamento de estado do servidor

### **Qualidade & Testes**

- **Vitest** - Testes unitários rápidos
- **Playwright** - Testes e2e robustos
- **ESLint + Prettier** - Qualidade e formatação de código

- **Husky + commitlint** - Hooks de git e validação de commits

### **DevOps & Deploy**

- **GitHub Actions** - CI/CD automatizado
- **Docker** - Containerização para produção
- **pnpm** - Gerenciador de pacotes rápido e eficiente

## 🏗️ Arquitetura

### **Estrutura de Pastas**

```
src/
├── components/           # Componentes UI reutilizáveis
│   ├── ui/             # Componentes base (Button, Input, etc.)
│   └── __tests__/      # Testes dos componentes
├── features/            # Funcionalidades organizadas por domínio
│   ├── assets/         # Sistema de árvore de ativos
│   ├── companies/      # Seleção e gerenciamento de empresas
│   ├── filters/        # Sistema de filtros avançados
│   └── performance/    # Monitoramento e métricas
├── contexts/            # Contextos React para estado global
├── hooks/               # Hooks customizados
├── services/            # Serviços de API e externos
├── types/               # Definições TypeScript

├── utils/               # Utilitários e helpers
└── test/                # Configurações de teste
```

### **Padrões de Design**

- **Feature-based Architecture**: Organização por funcionalidades
- **Component Composition**: Componentes pequenos e reutilizáveis

- **Custom Hooks**: Lógica de negócio isolada e testável
- **Type Safety**: TypeScript em toda a aplicação

## 🎯 Funcionalidades

### **Sistema de Árvore**

- **Navegação Hierárquica**: Expansão/colapso de nós
- **Seleção de Nós**: Detalhes em tempo real
- **Virtualização**: Performance otimizada para grandes datasets
- **Status Visual**: Indicadores de status operacional

### **Filtros Inteligentes**

- **Busca por Texto**: Filtro em tempo real
- **Filtro por Tipo**: Localização, ativo ou componente
- **Filtro por Status**: Operando, alerta ou crítico
- **Filtro por Sensor**: Sensores de energia ou vibração
- **Combinação de Filtros**: Múltiplos filtros simultâneos

### **Monitoramento de Performance**

- **Métricas em Tempo Real**: Tempo de renderização e filtros
- **Cache Hit Rate**: Eficiência do sistema de cache
- **Contadores de Nós**: Estatísticas da árvore
- **Dashboard Expandível**: Visualização detalhada

### **Sistema de Cache**

- **Cache Inteligente**: Armazenamento de dados frequentemente acessados
- **Invalidação Automática**: Atualização quando necessário
- **Performance**: Redução de chamadas à API

## 🚀 Como Executar

### **Pré-requisitos**

- **Node.js**: 18.0.0 ou superior
- **pnpm**: 8.0.0 ou superior (recomendado)
- **Git**: Para clonar o repositório

### **Instalação e Desenvolvimento**

```bash
# Clone o repositório
git clone <repository-url>
cd tree-view-app

# Instale as dependências
pnpm install

# Execute em modo de desenvolvimento
pnpm dev

# A aplicação estará disponível em http://localhost:5173
```

### **Scripts Disponíveis**

```bash
# Desenvolvimento
pnpm dev          # Servidor de desenvolvimento
pnpm build        # Build para produção
pnpm preview      # Preview do build de produção

# Testes
pnpm test         # Testes unitários
pnpm test:watch   # Testes em modo watch
pnpm test:e2e     # Testes end-to-end
pnpm test:e2e:ui  # Interface visual dos testes e2e


# Qualidade de Código
pnpm lint         # Verificação de linting
pnpm lint:fix     # Correção automática de linting
pnpm format       # Formatação de código

pnpm type-check   # Verificação de tipos TypeScript
```

## 🧪 Testes

### **Testes Unitários**

- **Cobertura**: Componentes, hooks e utilitários
- **Framework**: Vitest + React Testing Library
- **Execução**: `pnpm test`

### **Testes End-to-End**

- **Framework**: Playwright
- **Navegadores**: Chromium e Firefox (desktop)
- **Execução**: `pnpm test:e2e`

- **Relatórios**: HTML interativo em `playwright-report/`

### **Qualidade de Código**

- **ESLint**: Regras de qualidade e boas práticas

- **Prettier**: Formatação automática de código
- **TypeScript**: Verificação de tipos em tempo de compilação
- **Husky**: Hooks de git para validação automática

## 🔌 API

A aplicação consome a API fake-api.tractian.com:

### **Endpoints Principais**

- `GET /companies` - Lista todas as empresas disponíveis
- `GET /companies/:id/locations` - Localizações de uma empresa específica
- `GET /companies/:id/assets` - Ativos de uma empresa específica

### **Estrutura de Dados**

- **Company**: ID, nome e informações básicas
- **Location**: ID, nome, empresa pai e hierarquia
- **Asset**: ID, nome, tipo, localização e status operacional

## 🎨 Design System

### **Princípios de Design**

- **Mobile First**: Design responsivo para todos os dispositivos
- **Acessibilidade**: Navegação por teclado e suporte a leitores
- **Performance**: Interface fluida e responsiva
- **Consistência**: Padrões visuais uniformes

### **Componentes**

- **Button**: Variantes primário, secundário e outline
- **Input**: Campos de texto com validação
- **Tree Node**: Nós da árvore com estados visuais
- **Filters**: Sistema de filtros com contadores
- **Performance Dashboard**: Métricas em tempo real

## 🚀 Deploy

### **Docker**

```bash
# Build da imagem
docker build -t tree-view-app .

# Execução do container

docker run -p 3000:3000 tree-view-app
```

### **GitHub Actions**

- **CI/CD Automatizado**: Testes e build em cada push

- **Deploy Automático**: Deploy em ambiente de staging
- **Qualidade de Código**: Validação automática de linting e tipos

## 📊 Métricas de Qualidade

- **Testes**: 44/44 passando (100%)
- **Cobertura**: Componentes principais testados
- **Performance**: Virtualização para datasets grandes
- **Acessibilidade**: Navegação por teclado e ARIA labels
- **Responsividade**: Funciona em todos os tamanhos de tela

## 🤝 Contribuição

### **Padrões de Código**

- **Conventional Commits**: Padrão de mensagens de commit
- **ESLint + Prettier**: Formatação e qualidade automática
- **TypeScript**: Tipagem estática obrigatória
- **Testes**: Cobertura de testes para novas funcionalidades

### **Fluxo de Trabalho**

1. Fork do repositório
2. Criação de branch para feature
3. Desenvolvimento com testes
4. Pull Request com descrição detalhada
5. Code Review e merge

## 📝 Licença

Este projeto foi desenvolvido como parte de um desafio técnico para demonstrar habilidades em desenvolvimento React moderno, arquitetura de software e boas práticas de desenvolvimento.

---

**Desenvolvido com ❤️ por Wesley Israel N**
