const fs = require('fs').promises;
const { resolve } = require('path');
const { readFile, writeFile } = require('../utils/talkerFile');

const findById = async (id) => {
  const content = await readFile();
  return content.filter((item) => item.id === id);
};

const addTalker = async (talker) => {
  const talkers = await readFile();
  try {
    const newTalker = {
      name: talker.name,
      age: talker.age,
      id: talkers.length + 1,
      talk: talker.talk,
    };
    await writeFile(newTalker);
  } catch (error) {
    console.log(`${error} ao adicionar talker`);
  }
};

const editTalker = async (item, id) => {
  const talkers = await readFile();
  const { name, age, talk } = item;

  const newTalkers = talkers.map((talker) => {
    if (talker.id === id) {
      return {
        ...talker,
        name,
        age,
        talk,
      };
    }
    return talker;
  });

  await fs.writeFile(resolve(__dirname, '../talker.json'), JSON.stringify(newTalkers, null, 2));
};

const deleteTalker = async (id) => {
  const talkers = await readFile();

  const newTalkers = talkers.filter((talker) => talker.id !== id);

  await fs.writeFile(resolve(__dirname, '../talker.json'), JSON.stringify(newTalkers, null, 2));
};

const searchTalker = async (query) => {
  const talkers = await readFile();

  const search = talkers.filter(({ name }) => name.includes(query));

  return search;
};

module.exports = {
  findById,
  addTalker,
  editTalker,
  deleteTalker,
  searchTalker,
};