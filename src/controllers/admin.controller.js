
const usersData = require('../data/users.data');
const AppError = require('../utils/AppError');

function getUsers(req, res) {
  res.status(200).json({
    users: usersData.findAll(),
  });
}

function updateUserRole(req, res, next) {
  try {
    const { role } = req.body;
    const allowedRoles = ['member', 'manager', 'admin'];

    if (!allowedRoles.includes(role)) {
      throw new AppError(
        'El rol debe ser member, manager o admin',
        400
      );
    }

    const user = usersData.updateRole(req.params.id, role);

    if (!user) {
      throw new AppError('Usuario no encontrado', 404);
    }

    const { passwordHash, ...safeUser } = user;

    res.status(200).json({
      message: 'Rol actualizado correctamente',
      user: safeUser,
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getUsers,
  updateUserRole,
};
