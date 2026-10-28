
const express = require('express');
const router = express.Router();

const verifyToken = require('../middlewares/verifyToken');
const checkRole = require('../middlewares/checkRole');
const controller = require('../controllers/admin.controller');

router.use(verifyToken, checkRole('admin'));

router.get('/users', controller.getUsers);
router.patch('/users/:id/role', controller.updateUserRole);

module.exports = router;
