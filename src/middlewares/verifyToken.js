
const jwt = require('jsonwebtoken');
const AppError = require('../utils/AppError');

function verifyToken(req, res, next) {
  const authorization = req.headers.authorization;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new AppError('Token requerido', 401));
  }

  const token = authorization.slice(7);

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    req.user = {
      id: Number(payload.sub),
      role: payload.role,
    };

    next();
  } catch (error) {
    next(new AppError('Token inválido o expirado', 401));
  }
}

module.exports = verifyToken;
