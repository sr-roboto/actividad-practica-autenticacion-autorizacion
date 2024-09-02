import { Router } from 'express';
import {
  login,
  register,
  session,
  logout,
} from '../controllers/auth.controllers.js';
const authRoutes = Router();

authRoutes.post('/auth/register', register);
authRoutes.post('/auth/login', login);
authRoutes.get('/auth/session', session);
authRoutes.post('/auth/logout', logout);

export { authRoutes };
