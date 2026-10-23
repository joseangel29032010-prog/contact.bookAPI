
const AppError = require('../utils/AppError');

function notFound(req, res, next) {
  next(new AppError('Ruta no encontrada', 404));
}

module.exports = notFound;
