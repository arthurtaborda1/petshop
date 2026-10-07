// Conexão com o banco de dados SQLite e criação das tabelas.
//
// Usamos o SQLite que já vem embutido no próprio Node.js (módulo
// "node:sqlite", disponível a partir do Node 22.13 — o projeto já baixa
// uma versão compatível do Node no "npm install"; veja o README.md).
// Não é preciso instalar nem compilar nenhum pacote extra para ter um banco.
//
// Ele é síncrono, ou seja, cada comando SQL roda e devolve o resultado na
// hora, sem precisar de "await". Isso deixa o código mais fácil de ler.
//
// Esse arquivo é importado por routes/clientes.js (e, no exercício, também
// por routes/servicos.js), mas o código abaixo só roda uma vez: o Node
// executa o módulo na primeira importação e reaproveita o resultado nas
// seguintes. Por isso o CREATE TABLE só acontece uma vez, ao iniciar o
// servidor, mesmo com vários arquivos de rotas importando este arquivo.

import { DatabaseSync } from 'node:sqlite';

// O banco fica salvo em um arquivo chamado "petshop.db" dentro desta pasta.
// Se o arquivo não existir, ele é criado automaticamente.
const db = new DatabaseSync('petshop.db');

// Configuração recomendada do SQLite para melhorar a performance e evitar
// problemas de acesso concorrente ao arquivo do banco.
db.exec('PRAGMA journal_mode = WAL');

// Cria a tabela de clientes caso ela ainda não exista.
// "IF NOT EXISTS" evita erro quando o servidor é reiniciado várias vezes.
db.exec(`
  CREATE TABLE IF NOT EXISTS clientes (
    id_cliente INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    telefone TEXT NOT NULL,
    tipo_pet TEXT NOT NULL,
    nome_pet TEXT NOT NULL,
    data_nascimento_pet TEXT,
    raca TEXT,
    cor TEXT
  )
`);

db.exec(`
  CREATE TABLE IF NOT EXISTS servicos (
    id_servico INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    descricao TEXT,
    preco REAL NOT NULL
  )
`);

export default db;
