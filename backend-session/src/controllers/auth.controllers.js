import {
  registerUser,
  loginUser,
  getSessionData,
  destroySession,
} from '../services/auth.services.js';

const register = async (req, res) => {
  const { username, password } = req.body;
  try {
    await registerUser(username, password);
    return res.json({ message: 'Usuario registrado exitosamente' });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Error al registrar el usuario' });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await loginUser(username, password);
    if (user) {
      req.session.userId = user.id;
      req.session.username = user.username;
      return res.json({
        message: 'Inicio de sesión exitoso',
        user: { id: user.id, username: user.username },
      });
    } else {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Error al iniciar sesión' });
  }
};

const session = async (req, res) => {
  try {
    const sessionData = getSessionData(req.session);
    if (sessionData.loggedIn) {
      return res.json(sessionData);
    } else {
      return res.status(401).json(sessionData);
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Error al obtener la sesión' });
  }
};

const logout = async (req, res) => {
  try {
    destroySession(req.session, (err) => {
      if (err) {
        return res.status(500).json({ message: 'Error al cerrar la sesión' });
      }
      res.clearCookie('connect.sid');
      return res.json({ message: 'Sesión cerrada exitosamente' });
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Error al cerrar la sesión' });
  }
};

export { register, login, session, logout };
