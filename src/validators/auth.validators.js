
const { body, validationResult } = require('express-validator');

const registerValidators = [
  body('name')
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('El nombre debe tener entre 2 y 50 caracteres'),

  body('email')
    .trim()
    .isEmail()
    .withMessage('Debes proporcionar un email válido')
    .normalizeEmail(),

  body('password')
    .isString()
    .withMessage('La contraseña debe ser texto')
    .bail()
    .isLength({ min: 6 })
    .withMessage('La contraseña debe tener al menos 6 caracteres'),
];

const loginValidators = [
  body('email')
    .trim()
    .isEmail()
    .withMessage('Debes proporcionar un email válido')
    .normalizeEmail(),

  body('password')
    .isString()
    .withMessage('La contraseña es obligatoria'),
];

function validateAuth(req, res, next) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: errors.array()[0].msg,
    });
  }

  next();
}

module.exports = {
  registerValidators,
  loginValidators,
  validateAuth,
};
