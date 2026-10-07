// API do Petshop
// -----------------------------------------------------------------------
// Servidor Express que expõe as rotas REST do sistema. Cada entidade
// (cliente, serviço, etc.) tem seu próprio arquivo de rotas dentro de
// routes/ — assim o projeto continua organizado mesmo com mais tabelas.
//
// Veja também o README.md deste projeto.
// -----------------------------------------------------------------------

import express from 'express';
import cors from 'cors';
import clientesRouter from './routes/clientes.js';
import servicosRouter from './routes/servicos.js';

const app = express();
const PORT = 3001;

// Permite que o front-end (rodando em outra porta) faça requisições a esta API.
app.use(cors());

// Faz o Express entender requisições com corpo em JSON (req.body).
app.use(express.json());

// Toda rota de routes/clientes.js passa a existir sob o prefixo /api/clientes.
// Ex.: o router.get('/:id') de clientes.js vira, na prática, /api/clientes/:id.
app.use('/api/clientes', clientesRouter);

app.use('/api/servicos', servicosRouter);
// -------------------------------------------------------------------------
// PONTO DE EXERCÍCIO
// -------------------------------------------------------------------------
// Para criar o cadastro de "serviços oferecidos" (ou qualquer outro
// cadastro novo):
//
//   1. Crie routes/servicos.js copiando routes/clientes.js como modelo.
//   2. Importe e monte o router aqui, do mesmo jeito que o de clientes:
//
//        import servicosRouter from './routes/servicos.js';
//        app.use('/api/servicos', servicosRouter);
//
// Não esqueça de criar a tabela "servicos" em database.js antes!
// -------------------------------------------------------------------------

app.listen(PORT, () => {
  console.log(`API do petshop rodando em http://localhost:${PORT}`);
});
