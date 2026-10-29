
const express = require('express');
const router = express.Router();

let jogos = [];
let idAtual = 1;


router.get('/', (req, res) => {
  res.json(jogos);
});


router.get('/:id', (req, res) => {
  const id = Number(req.params.id);
  const jogo = jogos.find(j => j.id === id);

  if (!jogo) {
    return res.status(404).json({ mensagem: 'Jogo nao encontrado' });
  }

  res.json(jogo);
});


router.post('/', (req, res) => {
  const { titulo, plataforma, genero, anoLancamento } = req.body;

  if (!titulo || !plataforma || !genero || !anoLancamento) {
    return res.status(400).json({ mensagem: 'Preencha todos os campos' });
  }

  const novoJogo = {
    id: idAtual++,
    titulo,
    plataforma,
    genero,
    anoLancamento
  };

  jogos.push(novoJogo);

  res.status(201).json(novoJogo);
});


router.put('/:id', (req, res) => {
  const id = Number(req.params.id);
  const jogo = jogos.find(j => j.id === id);

  if (!jogo) {
    return res.status(404).json({ mensagem: 'Jogo nao encontrado' });
  }

  const { titulo, plataforma, genero, anoLancamento } = req.body;

  if (!titulo || !plataforma || !genero || !anoLancamento) {
    return res.status(400).json({ mensagem: 'Preencha todos os campos' });
  }

  jogo.titulo = titulo;
  jogo.plataforma = plataforma;
  jogo.genero = genero;
  jogo.anoLancamento = anoLancamento;

  res.json({ mensagem: 'Jogo atualizado', jogo });
});


router.delete('/:id', (req, res) => {
  const id = Number(req.params.id);
  const indice = jogos.findIndex(j => j.id === id);

  if (indice === -1) {
    return res.status(404).json({ mensagem: 'Jogo nao encontrado' });
  }

  jogos.splice(indice, 1);

  res.json({ mensagem: 'Jogo removido com sucesso' });
});

module.exports = router;
