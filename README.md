# Tree View Application

Uma aplicação React para visualizar a hierarquia de ativos empresariais em estrutura de árvore.

## 🚀 Tecnologias

- **Vite** - Build tool e dev server
- **React 19** - Biblioteca de UI
- **TypeScript** - Tipagem estática
- **TailwindCSS** - Framework de CSS utilitário

## 📋 Funcionalidades

- **Seleção de Empresa**: Escolha entre diferentes empresas
- **Visualização em Árvore**: Hierarquia de localizações, ativos e componentes
- **Filtros Avançados**:
  - Busca por texto
  - Filtro por sensores de energia
  - Filtro por status crítico
- **Navegação Interativa**: Expandir/colapsar nós da árvore
- **Responsivo**: Interface adaptável para diferentes dispositivos

## 🏗️ Estrutura da Árvore

A aplicação suporta três tipos de entidades:

- **🏭 Locations**: Localizações físicas onde os ativos estão localizados
- **⚙️ Assets**: Ativos que podem conter componentes ou sub-ativos
- **🔧 Components**: Sensores de vibração ou energia com status operacional

## 🚀 Como Executar

### Pré-requisitos

- Node.js 18+
- pnpm (recomendado) ou npm

### Instalação

```bash
# Clone o repositório
git clone <repository-url>
cd tree-view-app

# Instale as dependências
pnpm install

# Execute em modo de desenvolvimento
pnpm dev
```

### Build para Produção

```bash
pnpm build
pnpm preview
```

## 📁 Estrutura do Projeto

```
src/
├── components/          # Componentes React
│   ├── AssetTree.tsx   # Árvore principal
│   ├── TreeNode.tsx    # Nó individual da árvore
│   ├── Filters.tsx     # Componente de filtros
│   └── CompanySelector.tsx # Seletor de empresa
├── services/            # Serviços de API
│   └── api.ts          # Cliente da API
├── types/               # Definições TypeScript
│   └── index.ts        # Interfaces e tipos
├── utils/               # Utilitários
│   └── treeBuilder.ts  # Lógica de construção da árvore
└── App.tsx             # Componente principal
```

## 🔌 API

A aplicação consome a API fake-api.tractian.com com os seguintes endpoints:

- `GET /companies` - Lista todas as empresas
- `GET /companies/:id/locations` - Localizações de uma empresa
- `GET /companies/:id/assets` - Ativos de uma empresa

## 🎨 Design

Interface limpa e moderna construída com TailwindCSS, seguindo princípios de UX para navegação em árvores complexas.

## 🧪 Testes

```bash
# Executar testes
pnpm test

# Executar testes em modo watch
pnpm test:watch
```

## 📝 Licença

Este projeto foi desenvolvido como parte de um desafio técnico.
