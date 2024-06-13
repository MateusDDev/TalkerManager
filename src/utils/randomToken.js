const randomToken = (tokenLength) => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let random = '';

  for (let index = 0; index < tokenLength; index += 1) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    random += characters.charAt(randomIndex);
  }

  return random;
};

module.exports = {
  randomToken,
};