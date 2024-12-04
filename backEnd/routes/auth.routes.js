import express from 'express';
import { loginValidation, registerValidation } from '../validators/auth.validator.js';
import validate from '../middlewares/validate.middleware.js';
import { login, logout, register, setNewPassword } from '../controllers/auth.controller.js';
const route = express.Router();

route.post('/register', registerValidation, validate, register);
route.post('/login', loginValidation, validate, login);
route.post('/password', loginValidation, validate, setNewPassword);
route.post('/logout', logout);

export default route;