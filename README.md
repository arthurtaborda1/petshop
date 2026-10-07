# Petshop — projeto de Fundamentos de Desenvolvimento para Internet

Uma alteração...

Neste projeto você vai trabalhar em um sistema de cadastro de clientes de um
petshop, dividido em dois projetos independentes:

- **[`petshop-api/`](./petshop-api)** — API REST em Node.js + Express, que
  guarda os dados em um banco SQLite.
- **[`petshop-frontend/`](./petshop-frontend)** — Site em React (criado com
  Vite), que consome essa API para listar, cadastrar, editar e remover
  clientes.

Cada pasta é um projeto Node separado, com seu próprio `package.json`. Isso é
proposital: no mundo real, o front-end e o back-end quase sempre são projetos
(e até repositórios) diferentes, publicados e executados separadamente.

## Como rodar o projeto

Você precisa ter o **Node.js** instalado (qualquer versão razoavelmente
recente serve, só para ter o comando `npm`).

Não se preocupe com a versão: cada projeto (`petshop-api` e
`petshop-frontend`) tem o pacote `node` nas suas dependências. Ao rodar
`npm install`, é baixada uma versão atual do Node.js para dentro da pasta
`node_modules`, e os comandos `npm run ...` passam a usar essa versão, não
a que está instalada no computador. Assim o projeto funciona do mesmo jeito
em qualquer máquina, sem precisar instalar nada como administrador.

Você vai precisar de **dois terminais abertos ao mesmo tempo** (um para a API,
outro para o site), porque são dois servidores diferentes.

**Terminal 1 — a API:**

```bash
cd petshop-api
npm install
npm run dev
```

A API vai subir em `http://localhost:3001`. Na primeira vez que rodar, ela
cria sozinha o arquivo do banco de dados (`petshop.db`).

**Terminal 2 — o site:**

```bash
cd petshop-frontend
npm install
npm run dev
```

O site vai subir em `http://localhost:5173`. Abra esse endereço no navegador.

> As duas pastas precisam estar rodando ao mesmo tempo para o site funcionar,
> já que ele busca e salva os dados através da API.

## O que você vai praticar

- **Componentes React** e organização de uma interface em partes menores
  (`ClienteForm`, `ClienteList`) e em páginas (`Home`, `Clientes`, `Servicos`).
- **Navegação entre páginas** com [React Router](https://reactrouter.com/)
  (`BrowserRouter`, `Routes`, `Route`, `Link`).
- **Bootstrap** como framework de CSS (grid, formulários, tabelas, botões,
  cards), usado do jeito "tradicional" (classes prontas), sem biblioteca
  extra de componentes React.
- **Formulários** com [react-hook-form](https://react-hook-form.com/),
  incluindo validação de campos obrigatórios.
- **Consumo de API** com `fetch` (sem bibliotecas extras) e o ciclo
  requisição → resposta → atualização da tela.
- **API REST** com Express: rotas, métodos HTTP (`GET`, `POST`, `PUT`,
  `DELETE`), códigos de status HTTP.
- **Persistência de dados** com SQLite, incluindo criação de tabelas e
  comandos SQL básicos (`SELECT`, `INSERT`, `UPDATE`, `DELETE`).

Veja também o README de cada projeto:
[petshop-api/README.md](./petshop-api/README.md) (detalhes da API) e
[petshop-frontend/README.md](./petshop-frontend/README.md) (detalhes do site
e exercício proposto).

## Como o trabalho está dividido

As atividades deste projeto serão distribuídas em 4 aulas. Ao longo delas,
você vai:

- Entender o que é uma API REST e testar os endpoints na prática.
- Estudar o código do back-end (Node.js + Express + SQLite).
- Estudar o código do front-end (React, rotas, formulários, Bootstrap).
- Implementar, por conta própria, um novo cadastro completo — o exercício
  de "Serviços oferecidos".
- Publicar o projeto em um site real, acessível pela internet.

O roteiro detalhado de cada aula será apresentado em sala.

## Para ir além (opcional)

Depois que você dominar o CRUD básico, alguns próximos passos legais para
explorar por conta própria:

- Trocar o SQLite por um banco de dados "de servidor" (Postgres/MySQL) — o
  resto do código (rotas, front-end) muda muito pouco.
- Adicionar autenticação (login) para proteger o cadastro.
