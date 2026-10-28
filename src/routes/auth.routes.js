
const express = require('express');
const rateLimit = require('express-rate-limit');

const {
  register,
  login,
  me,
} = require('../controllers/auth.controller');

const {
  registerValidators,
  loginValidators,
  validateAuth,
} = require('../validators/auth.validators');

const verifyToken = require('../middlewares/verifyToken');

const router = express.Router();

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  skipSuccessfulRequests: true,
  message: {
    error: 'Demasiados intentos de inicio de sesión. Intenta más tarde.',
  },
  handler: (req, res) => {
    res.status(429).json({
      error: 'Demasiados intentos de inicio de sesión. Intenta más tarde.',
    });
  },
});

router.post('/register', registerValidators, validateAuth, register);
router.post('/login', loginLimiter, loginValidators, validateAuth, login);
router.get('/me', verifyToken, me);

module.exports = router;
