
const express = require('express');
const rateLimit = require('express-rate-limit');

const router = express.Router();
const controller = require('../controllers/contacts.controller');

const {
  validateContact,
  validatePutContact,
  validateId,
  checkValidation,
} = require('../validators/contacts.validators');

const verifyToken = require('../middlewares/verifyToken');
const checkRole = require('../middlewares/checkRole');
const requireClientId = require('../middlewares/requireClientId');
const AppError = require('../utils/AppError');

const contactsLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  limit: 50,
  message: {
    error: 'Demasiadas solicitudes. Intenta de nuevo más tarde.',
  },
  handler: (req, res, next, options) => {
    next(new AppError(options.message.error, 429));
  },
});

// Todas las rutas de contactos requieren un JWT válido.
router.use(verifyToken);
router.use(contactsLimiter);

// Las estadísticas requieren x-client-id.
router.get('/stats/summary', requireClientId, controller.getContactStats);

router.get('/', controller.getAllContacts);

router.get('/:id', validateId, checkValidation, controller.getContactById);

router.post('/', validateContact, checkValidation, controller.createContact);

router.put(
  '/:id',
  validateId,
  validatePutContact,
  checkValidation,
  controller.updateContact
);

router.patch(
  '/:id/favorite',
  validateId,
  checkValidation,
  controller.toggleFavorite
);

// Solo managers y administradores pueden eliminar.
router.delete(
  '/:id',
  checkRole('manager', 'admin'),
  validateId,
  checkValidation,
  controller.deleteContact
);

module.exports = router;
