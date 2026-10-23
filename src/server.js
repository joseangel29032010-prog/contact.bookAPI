
const app = require('./app');

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Contact Book API ejecutándose en el puerto ${PORT}`);
});
