
const AppError = require('../utils/AppError');

function validateApiKey(req, res, next) {
  const apiKey = req.get('x-api-key');

  if (apiKey !== 'talendig-123') {
    return next(
      new AppError('API key inválida o ausente', 401)
    );
  }

  next();
}

module.exports = validateApiKey;
