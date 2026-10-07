// Rotas do cadastro de clientes.
//
// Esse arquivo só cuida da tabela "clientes". Ele é "montado" em um
// endereço base (/api/clientes) lá em server.js, por isso as rotas aqui
// dentro começam em "/" (a lista) e "/:id" (um cliente específico), e não
// em "/api/clientes".

import { Router } from 'express';
import db from '../database.js';

const router = Router();

// Campos que toda requisição de criação/atualização de cliente precisa ter.
const CAMPOS_OBRIGATORIOS = ['nome', ' descricao', 'preco'];

// Confere se o corpo da requisição tem os campos obrigatórios preenchidos.
function validarServico(dados) {
  for (const campo of CAMPOS_OBRIGATORIOS) {
    if (!dados[campo] || String(dados[campo]).trim() === '') {
      return `O campo "${campo}" é obrigatório.`;
    }
  }
  return null;
}

// GET /api/clientes -> lista todos os clientes, do mais recente para o mais antigo
router.get('/', (req, res) => {
  const servicos = db
    .prepare('SELECT * FROM servicos ORDER BY id_servico DESC')
    .all();
  res.json(servicos);
});

// GET /api/servicos/:id -> busca um único servico
router.get('/:id', (req, res) => {
  const servico = db
    .prepare('SELECT * FROM servicos WHERE id_servico = ?')
    .get(req.params.id);

  if (!servico) {
    return res.status(404).json({ erro: 'Servico não encontrado.' });
  }
  res.json(servico);
});

// POST /api/servicos -> cria um novo servico
router.post('/', (req, res) => {
  const erro = validarServico(req.body);
  if (erro) {
    return res.status(400).json({ erro });
  }

  // Os campos opcionais recebem "null" quando não vierem na requisição:
  // o SQLite aceita null (campo vazio), mas não aceita undefined.
  const {
    nome,
    descricao = null,
    preco
  } = req.body;

  const resultado = db
    .prepare(
      `INSERT INTO servicos
        (nome, descricao, preco)
       VALUES (?, ?, ?)`
    )
    .run(nome, descricao, preco);

  const novoServico = db
    .prepare('SELECT * FROM servicos WHERE id_servico = ?')
    .get(resultado.lastInsertRowid);

  res.status(201).json(novoServico);
});

// PUT /api/servicos/:id -> atualiza um servico existente
router.put('/:id', (req, res) => {
  const erro = validarServico(req.body);
  if (erro) {
    return res.status(400).json({ erro });
  }

  const servicoExistente = db
    .prepare('SELECT * FROM servicos WHERE id_servico = ?')
    .get(req.params.id);

  if (!servicoExistente) {
    return res.status(404).json({ erro: 'Servico não encontrado.' });
  }

  const {
    nome,
    descricao = null,
    preco
  } = req.body;

  db.prepare(
    `UPDATE servicos SET
       nome = ?, descricao = ?, preco = ?
     WHERE id_servico = ?`
  ).run(nome, descricao, preco, req.params.id);

  const servicoAtualizado = db
    .prepare('SELECT * FROM servicos WHERE id_servico = ?')
    .get(req.params.id);

  res.json(servicoAtualizado);
});

// DELETE /api/servicos/:id -> remove um servico
router.delete('/:id', (req, res) => {
  const resultado = db
    .prepare('DELETE FROM servicos WHERE id_servico = ?')
    .run(req.params.id);

  if (resultado.changes === 0) {
    return res.status(404).json({ erro: 'Servico não encontrado.' });
  }

  res.status(204).send();
});

export default router;
