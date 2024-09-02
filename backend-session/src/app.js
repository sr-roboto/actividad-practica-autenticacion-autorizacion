import cors from 'cors';
import express from 'express';
import morgan from 'morgan';
import path from 'path';

import { authRoutes } from './routes/auth.routes.js';
import { validateSession } from './middlewares/session.validate.js';

const app = express();

const __dirname = path.resolve();

// Middlewares
app.use(
  cors({
    // Permitir solicitudes desde el front-end
    origin: ['http://localhost:5500', 'http://localhost:3000'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true, // Habilitar envío de cookies
  })
);
app.use(morgan('dev'));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(validateSession);

app.use('/api', authRoutes);

export { app };
