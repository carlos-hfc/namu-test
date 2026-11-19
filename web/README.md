# Aplicação Web

Interface web da biblioteca Namu, construída com React, Vite e TypeScript.

## Ambiente publicado

A aplicação também está disponível em:

https://namu-test-carlos-hfc.vercel.app/

Para realizar consultas à API, ela precisa estar rodando na máquina local. Ao abrir a aplicação publicada no navegador, será solicitada permissão para acessar outros aplicativos e serviços no dispositivo.

Safari bloqueia essa solicitação por padrão. Nesse caso, use um navegador que permita o acesso à API local ou configure o Safari para permitir os requisitos necessários.

## Funcionalidades

- Catálogo paginado com título, categoria, tipo, duração e imagem.
- Busca por título e filtro por categoria.
- Estados de carregamento, vazio, erro e tentativa novamente.
- Página de detalhes em `/content/:contentId`.
- Favoritar e desfavoritar conteúdos.
- Layout responsivo e elementos acessíveis.

## Tecnologias

- React 19 e React DOM.
- Vite 8.
- React Router para navegação.
- TanStack React Query para dados remotos.
- React Hook Form, Zod e Radix UI.
- Tailwind CSS.
- Vitest, Testing Library e MSW.

## Pré-requisitos

- Node.js 22.11 ou superior.
- API REST acessível.

## Configuração

Na raiz do monorepo:

```sh
npm ci
```

Configure `web/.env`:

```dotenv
VITE_API_URL=http://localhost:3333
```

O valor pode apontar para outra instância da API. Reinicie o servidor Vite depois de alterar o arquivo.

## Execução

```sh
npm run dev -w web
```

URL padrão: `http://localhost:5173`.

## Build

```sh
npm run build -w web
npm run preview -w web
```

O build gera os arquivos em `web/dist`.

## Testes

```sh
npm run test -w web
```

Os testes estão em `src/**/*.spec.tsx`. O servidor MSW definido em `src/test/mocks` simula categorias, conteúdos e favoritos. Os testes cobrem listagem, filtros, estados de erro, navegação e detalhes.

## Lint

Na raiz do monorepo:

```sh
npm run lint
```

Ou apenas neste workspace:

```sh
npm run lint -w web
```
