
const { body, param, validationResult } = require('express-validator');
const AppError = require('../utils/AppError');

const validCategories = ['family', 'friends', 'work', 'other'];

const validateName = body('name')
  .exists()
  .withMessage('El nombre es obligatorio')
  .bail()
  .isString()
  .withMessage('El nombre debe ser texto')
  .bail()
  .trim()
  .isLength({ min: 2, max: 50 })
  .withMessage('El nombre debe tener entre 2 y 50 caracteres');

const validatePhone = body('phone')
  .exists()
  .withMessage('El teléfono es obligatorio')
  .bail()
  .isString()
  .withMessage('El teléfono debe ser texto')
  .bail()
  .trim()
  .isLength({ min: 7, max: 20 })
  .withMessage('El teléfono debe tener entre 7 y 20 caracteres')
  .bail()
  .matches(/^[0-9+\-() ]+$/)
  .withMessage('El teléfono contiene caracteres no permitidos');

const optionalFields = [
  body('email')
    .optional()
    .isEmail()
    .withMessage('El correo electrónico no es válido'),

  body('category')
    .optional()
    .isIn(validCategories)
    .withMessage('La categoría debe ser family, friends, work u other'),

  body('favorite')
    .optional()
    .isBoolean()
    .withMessage('favorite debe ser true o false')
];

// POST: nombre y teléfono obligatorios.
const validateContact = [
  validateName,
  validatePhone,
  ...optionalFields
];

// PUT: también exige nombre y teléfono para reemplazar el contacto.
const validatePutContact = [
  validateName,
  validatePhone,
  ...optionalFields
];

const validateId = [
  param('id')
    .isInt({ min: 1 })
    .withMessage('El ID debe ser un número entero positivo')
];

function checkValidation(req, res, next) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return next(new AppError(errors.array()[0].msg, 400));
  }

  next();
}

module.exports = {
  validateContact,
  validatePutContact,
  validateId,
  checkValidation
};
