
require('dotenv').config();

const app = require('./app');
const { seedAdmin } = require('./data/users.data');

const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    await seedAdmin();

    app.listen(PORT, () => {
      console.log(`Contact Book API ejecutándose en el puerto ${PORT}`);
    });
  } catch (error) {
    console.error('Error al iniciar el servidor:', error.message);
    process.exit(1);
  }
}

startServer();
