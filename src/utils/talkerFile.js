const fs = require('fs').promises;
const { resolve } = require('path');

const readFile = async () => {
  const content = await fs.readFile(resolve(__dirname, '../talker.json'));
  return JSON.parse(content);
};

const writeFile = async (item) => {
  const talkers = await readFile();
  talkers.push(item);
  await fs.writeFile(resolve(__dirname, '../talker.json'), JSON.stringify(talkers, null, 2));
};

module.exports = { 
  readFile,
  writeFile,
};