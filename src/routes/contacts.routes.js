
const express = require('express');
const rateLimit = require('express-rate-limit');

const router = express.Router();

const controller = require('../controllers/contacts.controller');

const {
  validateContact,
  validatePutContact,
  validateId,
  checkValidation
} = require('../validators/contacts.validators');

const requireClientId = require('../middlewares/requireClientId');
const validateApiKey = require('../middlewares/validateApiKey');
const AppError = require('../utils/AppError');

const contactsLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  limit: 50,
  message: {
    error: 'Demasiadas solicitudes. Intenta de nuevo más tarde.'
  },
  handler: (req, res, next, options) => {
    next(new AppError(options.message.error, 429));
  }
});

router.use(contactsLimiter);

// Estadísticas: debe estar antes de /:id
router.get(
  '/stats/summary',
  requireClientId,
  controller.getContactStats
);

// Consultar todos los contactos
router.get('/', controller.getAllContacts);

// Consultar un contacto por ID
router.get(
  '/:id',
  validateId,
  checkValidation,
  controller.getContactById
);

// Crear un contacto
router.post(
  '/',
  validateContact,
  checkValidation,
  controller.createContact
);

router.put(
  '/:id',
  validateId,
  validatePutContact,
  checkValidation,
  controller.updateContact
);

// Cambiar el estado de favorito
router.patch(
  '/:id/favorite',
  validateId,
  checkValidation,
  controller.toggleFavorite
);

// Eliminar un contacto: requiere API key
router.delete(
  '/:id',
  validateId,
  checkValidation,
  validateApiKey,
  controller.deleteContact
);

module.exports = router;
