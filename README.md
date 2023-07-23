# SyncChat

Este é um projeto de uma aplicação web de chat em tempo real, desenvolvido utilizando Vite, React, Typescript, Tailwind CSS, Chakra UI no frontend e Node.js, Typescript, Express e Socket.IO no backend.

##Funcionalidades

* Chat em Tempo Real: Os usuários podem se conectar a salas de chat e enviar e receber mensagens em tempo real.

* Login e Registro de Usuários: Os usuários podem criar uma conta e fazer login para acessar as salas de chat.

* Gerenciamento de Salas: Os usuários podem criar novas salas de chat ou entrar em salas existentes.

* Comunicação Bidirecional: Através do Socket.IO, a comunicação entre o servidor e o cliente é bidirecional, permitindo atualizações em tempo real sem a necessidade de atualizar a página.


## Instalação

1 - Clone o repositório para o seu ambiente local:
```bash
git clone https://github.com/jovijovi-john/sync-chat
```

2 - Instale as dependências do frontend:
```bash
cd frontend
npm install
```

3 - Instale as dependências do backend:
```bash
cd backend
npm install
```

## Executando o Projeto

1 - Inicie o servidor backend:
```bash
cd backend
npm run dev
```
O servidor backend será executado na porta 3001.



2 - Inicie o frontend:

```bash
cd frontend
npm run dev
```

A aplicação frontend será iniciada e aberta automaticamente em http://localhost:3000.

## Tecnologias Utilizadas

* React: Biblioteca JavaScript para a construção de interfaces de usuário reativas e dinâmicas.

* Typescript: Linguagem que adiciona tipagem estática ao JavaScript, proporcionando uma melhor experiência de desenvolvimento.

* Vite: Ferramenta de build e desenvolvimento que permite uma inicialização rápida de projetos com React, Vue.js e outras bibliotecas.

* Tailwind CSS: Framework de CSS utilitário que permite estilizar a aplicação de forma rápida e eficiente.

* Chakra UI: Biblioteca de componentes para React que facilita a criação de interfaces bonitas e acessíveis.

* Node.js: Plataforma de tempo de execução do JavaScript construída sobre o motor V8 do Chrome.

* Express: Framework para Node.js que simplifica a criação de aplicativos web e APIs.

* Socket.IO: Biblioteca que permite a comunicação em tempo real bidirecional entre o cliente e o servidor.
