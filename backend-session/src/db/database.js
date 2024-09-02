import mysql2 from 'mysql2/promise';
import { DB_HOST, DB_NAME, DB_PASSWORD, DB_USER } from '../configs/dotenv.js';

const connect = async () => {
  const connection = await mysql2.createConnection({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
  });
  console.log('Database connected!');
  return connection;
};

export { connect };
