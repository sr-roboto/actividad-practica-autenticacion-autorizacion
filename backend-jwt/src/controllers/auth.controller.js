import generarJwt from '../helpers/generar-jwt.js';
import { registerService, loginService } from '../services/auth.service.js';

// Endpoint de registro de sesión (register)
const register = async (req, res) => {
  const { username, password } = req.body;
  try {
    await registerService(username, password);
    return res.status(201).json({ message: 'Usuario registrado' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error Inesperado' });
  }
};

// Endpoint de inicio de sesión (login)
const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await loginService(username, password);
    // Validación de usuario
    if (!user) {
      return res.status(401).json({ message: 'Credenciales incorrectas' });
    }
    // Generar token JWT
    const token = await generarJwt(user.id);
    // Almacenar el token en la sesión del servidor
    req.session.token = token;
    // Almacenar el token en una cookie segura
    res.cookie('authToken', token, {
      httpOnly: true, // La cookie no es accesible desde JavaScript
      secure: false, // Cambiar a true en producción con HTTPS
      maxAge: 3600000, // Expiración en milisegundos (1 hora)
    });
    return res.json({ message: 'Inicio de sesión exitoso' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error Inesperado' });
  }
};

// Endpoint para validar la sesión
const session = async (req, res) => {
  console.log(req.user);
  return res.json({
    message: 'Acceso permitido a área protegida',
    user: req.user,
  });
};

// Endpoint de cierre de sesión (logout)
const logout = async (req, res) => {
  try {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ message: 'Error al cerrar sesión' });
      }
      res.clearCookie('authToken');
      return res.json({ message: 'Cierre de sesión exitoso' });
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error Inesperado' });
  }
};

export { login, session, logout, register };
