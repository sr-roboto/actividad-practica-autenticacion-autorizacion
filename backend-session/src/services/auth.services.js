// services/auth.service.js
import { connect } from '../db/database.js';

const registerUser = async (username, password) => {
  const connection = await connect();
  const query = 'INSERT INTO users (username, password) VALUES (?, ?)';
  await connection.execute(query, [username, password]);
  connection.end();
};

const loginUser = async (username, password) => {
  const connection = await connect();
  const query = 'SELECT * FROM users WHERE username = ? AND password = ?';
  const [result] = await connection.execute(query, [username, password]);
  connection.end();
  return result[0];
};

const getSessionData = (session) => {
  if (session.userId) {
    return {
      loggedIn: true,
      user: { id: session.userId, username: session.username },
    };
  } else {
    return { loggedIn: false, message: 'No hay sesión activa' };
  }
};

const destroySession = (session, callback) => {
  session.destroy(callback);
};

export { registerUser, loginUser, getSessionData, destroySession };
