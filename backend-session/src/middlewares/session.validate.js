// middlewares/sessionMiddleware.js
import session from 'express-session';
import { EXPRESS_SESSION_SECRET } from '../configs/dotenv.js';

const validateSession = session({
  secret: EXPRESS_SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: false, // true solo si usas HTTPS
    httpOnly: true, // evita acceso a cookie desde JavaScript del cliente
    // sameSite: 'lax' // permite envío de cookies en navegadores modernos
  },
});

export { validateSession };
