import jwt from 'jsonwebtoken';
import { SECRET_KEY } from '../configs/env.js';
import { connectDB } from '../database/db.js';

// Middleware para verificar el token JWT
export default async (req, res, next) => {
  console.log(req.session);
  console.log('-----------');
  console.log(req.cookies);
  const token = req.cookies.authToken || req.session.token;
  if (!token) {
    return res.status(403).json({ message: 'Token no proporcionado' });
  }
  const decoded = jwt.verify(token, SECRET_KEY);
  console.log(decoded.userId);
  // Se busca al usuario en la base de datos
  const connection = await connectDB();
  const [result] = await connection.execute(
    'SELECT * FROM users WHERE id = ?',
    [decoded.userId]
  );
  const user = result[0];
  connection.end();
  if (!user) {
    return res.status(401).json({ message: 'Token inválido' });
  }
  req.user = user; // Agrega la información del usuario decodificada al request
  next();
};
