import express from 'express';
import auth from '../controllers/auth.controller.js';
import { loginValidation, registerValidation } from '../validators/auth.validator.js';
import validate from '../middlewares/validate.middleware.js';
const route = express.Router();

route.post('/register', registerValidation, validate, auth.register);
route.post('/login', loginValidation, validate, auth.login);
route.post('/password', loginValidation, validate, auth.setNewPassword);
route.post('/logout', auth.logout);

export default route;