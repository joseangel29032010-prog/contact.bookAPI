
const AppError = require('../utils/AppError');

function requireClientId(req, res, next) {
  const clientId = req.get('x-client-id');

  if (!clientId || !clientId.trim()) {
    return next(
      new AppError('Falta el encabezado x-client-id', 400)
    );
  }

  req.clientId = clientId.trim();
  next();
}

module.exports = requireClientId;
