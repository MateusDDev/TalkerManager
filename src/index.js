const express = require('express');
const talkerRoutes = require('./routes/talkerRoutes');
const { validateLogin } = require('./middlewares/verifyLogin');
const { randomToken } = require('./utils/randomToken');

const app = express();
app.use(express.json());

const HTTP_OK_STATUS = 200;
const PORT = process.env.PORT || '3001';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online on port 3001');
});

app.use('/talker', talkerRoutes);

app.post('/login', validateLogin, (_req, res) => {
  try {
    const randomChar = randomToken(16);
    res.status(200).json({ token: randomChar });
  } catch (error) {
    res.status(500).json({ message: error });
  }
});
