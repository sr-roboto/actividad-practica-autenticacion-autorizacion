import jwt from 'jsonwebtoken';
import { SECRET_KEY } from '../configs/env.js';

export default (userId) => {
  return new Promise((resolve, reject) => {
    const payload = { userId };
    jwt.sign(
      payload,
      SECRET_KEY,
      {
        expiresIn: '5h',
      },
      (error, token) => {
        if (error) {
          console.log(error);
          reject('No se pudo generar el token');
        } else {
          resolve(token);
        }
      }
    );
  });
};
