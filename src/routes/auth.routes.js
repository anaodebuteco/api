// src/routes/auth.routes.js
const express = require('express');
const { signupSchema, loginSchema } = require('../validations/auth.validation');
const validate = require('../middlewares/validate.middleware'); // <- aqui
const { signup, login } = require('../controllers/auth.controller');

const router = express.Router();

router.post('/signup', validate(signupSchema), signup);
router.post('/login', validate(loginSchema), login);

module.exports = router;
