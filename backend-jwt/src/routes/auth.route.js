import { Router } from 'express';
import {
  login,
  logout,
  session,
  register,
} from '../controllers/auth.controller.js';
import { validarJWT } from '../middlewares/validar-jwt.js';
const authRouter = Router();

authRouter.post('/auth/register', register);
authRouter.post('/auth/login', login);
authRouter.get('/auth/session', validarJWT, session);
authRouter.post('/auth/logout', logout);

export { authRouter };
