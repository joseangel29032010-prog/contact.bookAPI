
const bcrypt = require('bcryptjs');

const users = [];
let nextUserId = 1;

function findByEmail(email) {
  return users.find(
    (user) => user.email === email.toLowerCase()
  );
}

function findById(id) {
  return users.find((user) => user.id === Number(id));
}

function findAll() {
  return users.map(({ passwordHash, ...user }) => user);
}

function create({ name, email, passwordHash, role = 'member' }) {
  const user = {
    id: nextUserId++,
    name: name.trim(),
    email: email.toLowerCase(),
    passwordHash,
    role,
    createdAt: new Date().toISOString(),
  };

  users.push(user);
  return user;
}

// Actualiza el rol de un usuario existente.
function updateRole(id, role) {
  const user = findById(id);

  if (!user) {
    return null;
  }

  user.role = role;
  return user;
}

// Crea el administrador inicial si todavía no existe.
async function seedAdmin() {
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;

  if (!email || !password) {
    throw new Error('Faltan ADMIN_EMAIL o ADMIN_PASSWORD en .env');
  }

  const normalizedEmail = email.toLowerCase();

  if (findByEmail(normalizedEmail)) {
    console.log('El administrador inicial ya existe.');
    return;
  }

  const passwordHash = await bcrypt.hash(password, 10);

  create({
    name: 'Administrador',
    email: normalizedEmail,
    passwordHash,
    role: 'admin',
  });

  console.log('Administrador inicial creado.');
}

module.exports = {
  findByEmail,
  findById,
  findAll,
  create,
  updateRole,
  seedAdmin,
};
