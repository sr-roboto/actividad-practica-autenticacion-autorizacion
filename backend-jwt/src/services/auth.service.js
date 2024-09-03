import { connectDB } from '../database/db.js';

const registerService = async (username, password) => {
  try {
    const connection = await connectDB();
    await connection.execute(
      'INSERT INTO users (username, password) VALUES (?, ?)',
      [username, password]
    );
    connection.end();
  } catch (error) {
    console.error(error);
  }
};

const loginService = async (username, password) => {
  try {
    const connection = await connectDB();
    const [result] = await connection.execute(
      'SELECT * FROM users WHERE username = ? AND password = ?',
      [username, password]
    );
    const user = result[0];
    connection.end();
    return user;
  } catch (error) {
    console.error(error);
  }
};

export { registerService, loginService };
