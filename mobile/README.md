# Aplicação Mobile

Aplicativo React Native em bare workflow para consultar conteúdos e gerenciar favoritos da biblioteca Namu.

## Demonstração

Um vídeo curto mostrando o funcionamento do aplicativo está disponível em:

https://youtube.com/shorts/-b5MRk-Dw80

## Funcionalidades

- Tela de conteúdos com lista paginada.
- Tela de detalhes de conteúdo.
- Tela de favoritos.
- Adição e remoção de favoritos sincronizadas no contexto da aplicação.
- Navegação com React Navigation.
- Estados de carregamento, vazio e erro.

## Tecnologias

- React Native 0.88.
- React Native Community CLI.
- React Navigation.
- TanStack React Query.
- NativeWind e Tailwind CSS.
- Código compartilhado do workspace `shared`.

## Pré-requisitos

- Node.js 22.11 ou superior.
- Ambiente Android configurado com Android Studio e JDK ou um dispositivo físico Android.
- API REST acessível pela rede em que o emulador ou dispositivo estiver.

## Configuração da API

Na raiz do projeto, instale as dependências:

```sh
npm ci
```

Configure `mobile/.env`:

```dotenv
API_URL=http://10.0.2.2:3333
```

URLs comuns:

- Android Emulator: `http://10.0.2.2:3333`
- Dispositivo físico: `http://SEU_IP_LOCAL:3333` ou `http://localhost:3333`

O endereço deve apontar para uma interface acessível pelo dispositivo. Reinicie o Metro após alterar `.env`.

## Execução

Terminal 1:

```sh
npm start -w mobile
```

Terminal 2, Android:

```sh
npm run android -w mobile
```