# Biblioteca Namu

Aplicação web e app mobile para navegar por uma biblioteca de conteúdos de bem-estar e gerenciar favoritos. O projeto foi desenvolvido como monorepo npm e usa uma API REST para web e mobile.

## Funcionalidades implementadas

### Web

- Listagem paginada de conteúdos.
- Busca por título e filtro por categoria.
- Estados de carregamento, lista vazia e erro com tentativa novamente.
- Página própria de detalhes acessível por URL.
- Favoritar e desfavoritar conteúdos.
- Layout responsivo e navegação por teclado.
- Testes de integração das páginas com API simulada.

### Mobile

- Lista de conteúdos e carregamento incremental.
- Tela de detalhes com estado de favorito.
- Tela de favoritos.
- Navegação entre conteúdos e favoritos com React Navigation.
- Estado global do catálogo e cache das requisições com React Query.

## Tecnologias

- **React 19 e Vite** para a aplicação web.
- **React Native 0.88**, em bare workflow, para o aplicativo Android e iOS.
- **TypeScript** nos três pacotes.
- **React Navigation** para a navegação mobile.
- **TanStack React Query** para cache e sincronização das requisições.
- **React Hook Form e Zod** para formulários e validação.
- **Axios** para comunicação REST.
- **Tailwind CSS e NativeWind** para estilos web e mobile.
- **Vitest, Testing Library e MSW** para testes web.
- **ESLint** para análise estática do monorepo.

React Query foi escolhido para centralizar estados de carregamento, erro, cache e repetição de consultas sem adicionar outro gerenciador de estado ao projeto. O pacote `shared` evita duplicação de tipos, validação de ambiente, cliente HTTP e hooks entre web e mobile.

## Estrutura

```text
.
├── web/      Aplicação React com Vite
├── mobile/   Aplicação React Native bare
└── shared/   Tipos, hooks, serviços HTTP e utilitários compartilhados
```

## Pré-requisitos

- Node.js 22.11 ou superior.
- npm.
- API REST disponível.
- Para mobile Android: Android Studio, JDK configurado e emulador ou dispositivo.
- Para mobile iOS: macOS, Xcode e CocoaPods.

## Instalação

Na raiz do projeto:

```sh
npm ci
```

Configure a URL da API em cada aplicação:

- Web: `web/.env`, com `VITE_API_URL`.
- Mobile: `mobile/.env`, com `API_URL`.

Exemplos:

```dotenv
# web/.env
VITE_API_URL=http://localhost:3333
```

```dotenv
# mobile/.env
API_URL=http://10.0.2.2:3333
# ou
API_URL=http://localhost:3333
```

Em Android Emulator, `10.0.2.2` normalmente representa o host da máquina. Em dispositivo físico, use o endereço IP acessível da máquina na rede local ou conecte o cabo USB à máquina e use `localhost`.

## Execução

Web:

```sh
npm run dev:web
```

Acesse a URL exibida pelo Vite, normalmente `http://localhost:5173`.

Mobile:

```sh
npm start -w mobile
npm run android -w mobile
```

O ambiente mobile deve ser preparado conforme a documentação oficial do React Native.

## Qualidade

Executar o lint de todos os pacotes:

```sh
npm run lint
```

Corrigir problemas automatizáveis:

```sh
npm run lint:fix
```

Executar os testes web:

```sh
npm run test -w web
```

Gerar o build web:

```sh
npm run build -w web
```

Há uma GitHub Action em `.github/workflows/ci.yaml` que executa o lint e os testes web em pushes e pull requests.

## API

O código da API utilizada pela aplicação está disponível em:

https://github.com/sioux1to1/teste-frontend-react-react-native-namu

A API deve estar rodando na máquina local para que a web e o mobile consigam realizar consultas. A aplicação web publicada em https://namu-test-carlos-hfc.vercel.app/ precisa que o navegador permita o acesso a serviços locais no dispositivo. O Safari pode bloquear essa comunicação por padrão.

A aplicação espera os seguintes recursos:

| Método | Rota | Uso |
| --- | --- | --- |
| `GET` | `/categories` | Categorias |
| `GET` | `/contents` | Lista paginada |
| `GET` | `/contents/:id` | Detalhe |
| `GET` | `/favorites` | Favoritos |
| `POST` | `/favorites` | Adicionar favorito |
| `DELETE` | `/favorites/:contentId` | Remover favorito |

Erros de rede e respostas da API são tratados pelas interfaces com estados visuais apropriados.

## Decisões técnicas

- `shared` concentra integração HTTP, tipos e hooks para manter web e mobile consistentes.
- React Query controla retries, cache e invalidação das consultas.
- MSW substitui a API nos testes web sem exigir serviços externos.
- Axios possui configuração global de `baseURL`, definida separadamente por cada aplicação.
- O conteúdo e os filtros são mantidos em contexto no mobile, enquanto os dados remotos continuam no React Query.

## Documentação dos pacotes

- [Aplicação web](./web/README.md)
- [Aplicação mobile](./mobile/README.md)
- [Pacote compartilhado](./shared/README.md)
