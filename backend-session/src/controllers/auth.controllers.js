import { User } from '../models/user.model.js';

// Ruta para manejar el registro de usuarios
const register = async (req, res) => {
  const { username, password } = req.body;

  // Verificar si el usuario ya existe
  const existingUser = await User.findOne({ username });

  if (existingUser) {
    return res.status(400).json({ message: 'El usuario ya existe' });
  }

  // Crear un nuevo usuario

  const newUser = new User({ username, password });
  newUser.save();
  res.json({ message: 'Usuario creado exitosamente' });
};

// Ruta para manejar el inicio de sesión
const login = async (req, res) => {
  const { username, password } = req.body;

  // Buscar usuario
  console.log(username, password);

  const user = await User.findOne({ username, password });
  console.log(user);

  if (user) {
    // Guardar información del usuario en la sesión
    req.session.userId = user.id;
    req.session.username = user.username;
    console.log(req.session);
    return res.json({
      message: 'Inicio de sesión exitoso',
      user: { id: user.id, username: user.username },
    });
  } else {
    return res.status(401).json({ message: 'Credenciales incorrectas' });
  }
};

// Ruta para obtener los datos de la sesión
const session = async (req, res) => {
  if (req.session.userId) {
    return res.json({
      loggedIn: true,
      user: { id: req.session.userId, username: req.session.username },
    });
  } else {
    return res
      .status(401)
      .json({ loggedIn: false, message: 'No hay sesión activa' });
  }
};

// Ruta para cerrar la sesión
const logout = async (req, res) => {
  console.log(req.session);
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: 'Error al cerrar la sesión' });
    }
    res.clearCookie('connect.sid'); // Nombre de cookie por defecto para express-session
    return res.json({ message: 'Sesión cerrada exitosamente' });
  });
};

export { register, login, session, logout };
