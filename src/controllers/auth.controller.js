
const bcrypt = require('bcryptjs');
const AppError = require('../utils/AppError');
const usersData = require('../data/users.data');
const { signToken } = require('../utils/jwt');

function publicUser(user) {
  const { passwordHash, ...safeUser } = user;
  return safeUser;
}

async function register(req, res, next) {
  try {
    const { name, email, password } = req.body;

    if (usersData.findByEmail(email)) {
      throw new AppError('El email ya está registrado', 409);
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = usersData.create({
      name,
      email,
      passwordHash,
      role: 'member',
    });

    const token = signToken(user);

    res.status(201).json({
      user: publicUser(user),
      token,
    });
  } catch (error) {
    next(error);
  }
}

async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    const user = usersData.findByEmail(email);

    if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
      throw new AppError('Credenciales inválidas', 401);
    }

    const token = signToken(user);

    res.status(200).json({
      user: publicUser(user),
      token,
    });
  } catch (error) {
    next(error);
  }
}

function me(req, res, next) {
  try {
    const user = usersData.findById(req.user.id);

    if (!user) {
      throw new AppError('Token inválido o expirado', 401);
    }

    res.status(200).json({
      user: publicUser(user),
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  register,
  login,
  me,
};
