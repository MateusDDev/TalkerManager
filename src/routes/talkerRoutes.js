const express = require('express');
const { readFile } = require('../utils/talkerFile');
const { findById, addTalker, editTalker, deleteTalker, searchTalker } = require('../db/talkerDB');
const { testToken, testName, 
  testAge, testTalk, 
  testWatchedAt, testRate, testId } = require('../middlewares/verifyTalker');

const router = express.Router();

router.get('/', async (_req, res) => {
  try {
    const content = await readFile();
    
    if (!content) return res.status(200).json([]);

    res.status(200).json(content);
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

router.get('/search', testToken, async (req, res) => {
  const talkers = await readFile();
  const { q } = req.query;

  if (!q) return res.status(200).json(talkers);

  const result = await searchTalker(q);
  res.status(200).json(result);
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const [item] = await findById(Number(id));
    if (item) {
      res.status(200).json(item);
    } else {
      res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
    }
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

router.post('/', 
  testToken,
  testName,
  testAge,
  testTalk,
  testWatchedAt,
  testRate,
  async (req, res) => {
    const talker = req.body;
    try {
      await addTalker(talker);
      const talkers = await readFile();
      res.status(201).json(talkers[talkers.length - 1]);
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: 'talker errro' });
    }
  });

router.put('/:id',
  testToken,
  testName,
  testAge,
  testTalk,
  testWatchedAt,
  testRate,
  testId,
  async (req, res) => {
    const param = req.params.id;
    const id = Number(param);
    const newTalker = req.body;
    try {
      await editTalker(newTalker, id);
      res.status(200).json({ ...newTalker, id });
    } catch (error) {
      res.status(500).json({ message: error });
    }
  });

router.delete('/:id', testToken, async (req, res) => {
  const { id } = req.params;
  await deleteTalker(Number(id));
  res.status(204).end();
});

module.exports = router;