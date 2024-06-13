const { readFile } = require('../utils/talkerFile');

const testToken = (req, res, next) => {
  const token = req.header('authorization');

  if (!token) return res.status(401).json({ message: 'Token não encontrado' });
  if (token.length !== 16 || typeof token !== 'string') {
    return res.status(401).json({ message: 'Token inválido' });
  }

  next();
};

const testName = (req, res, next) => {
  const { name } = req.body;

  if (!name) return res.status(400).json({ message: 'O campo "name" é obrigatório' });
  if (name.length <= 3) {
    return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }

  next();
};

const testAge = (req, res, next) => {
  const { age } = req.body;

  if (!age) return res.status(400).json({ message: 'O campo "age" é obrigatório' });
  if (typeof age !== 'number' || !Number.isInteger(age) || age < 18) {
    const message = 'O campo "age" deve ser um número inteiro igual ou maior que 18'; 
    return res.status(400).json({ message });
  }

  next();
};

const testTalk = (req, res, next) => {
  const { talk } = req.body;

  if (!talk) return res.status(400).json({ message: 'O campo "talk" é obrigatório' });

  next();
};

const testWatchedAt = (req, res, next) => {
  const { talk } = req.body;
  const { watchedAt } = talk;
  const regex = /^\d{2}\/\d{2}\/\d{4}$/;

  if (!watchedAt) return res.status(400).json({ message: 'O campo "watchedAt" é obrigatório' });

  if (!regex.test(watchedAt)) {
    return res.status(400).json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }

  next();
};

const testRate = (req, res, next) => {
  const { talk } = req.body;
  const { rate } = talk;

  if (rate === undefined) return res.status(400).json({ message: 'O campo "rate" é obrigatório' });

  if (rate < 1 || rate > 5 || !Number.isInteger(rate)) {
    const message = 'O campo "rate" deve ser um número inteiro entre 1 e 5';
    return res.status(400).json({ message });
  }

  next();
};

const testId = async (req, res, next) => {
  const { id } = req.params;
  const talkers = await readFile();

  if (!talkers.some((tk) => tk.id === Number(id))) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }

  next();
};

module.exports = {
  testToken,
  testName,
  testAge,
  testTalk,
  testWatchedAt,
  testRate,
  testId,
};