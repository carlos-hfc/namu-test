# Pacote Compartilhado

O workspace `@namu-test/shared` contém código reutilizado pelas aplicações web e mobile.

## Responsabilidades

- Tipos do domínio de categorias e conteúdos.
- Cliente Axios e configuração global da base URL.
- Schemas Zod para ambiente e filtros.
- Hooks React Query para categorias, conteúdos e favoritos.
- Serviços HTTP para os endpoints da API.
- Utilitários de formatação e composição de classes.
- Tratamento padronizado de erros da API.
- Query client compartilhado.

## Estrutura

```text
src/
├── hooks/       Hooks React Query
├── http/        Chamadas REST
├── lib/         Axios e React Query
├── schemas/     Validação Zod
├── types/       Tipos do domínio
└── utils/       Formatação e utilitários
```

## Uso

O pacote é resolvido pelo nome no workspace npm:

```ts
import {
  configureApi,
  useContents,
  validateEnv,
} from "@namu-test/shared"
```

Cada aplicação deve configurar a base URL antes das primeiras requisições:

```ts
configureApi({
  baseURL: "http://localhost:3333",
})
```

## Validação de ambiente

`validateEnv` exige uma propriedade `API_URL` válida:

```ts
validateEnv({
  API_URL: "http://localhost:3333",
})
```

A URL é fornecida por `VITE_API_URL` na web e por `API_URL` no mobile.

## Dependências

O pacote usa Axios e Zod diretamente. React, React Hook Form e TanStack React Query são peer dependencies e são fornecidos pelas aplicações consumidoras.

Não há scripts próprios de build ou teste no workspace. O desenvolvimento atual é realizado pela resolução dos arquivos TypeScript nas aplicações web e mobile.
