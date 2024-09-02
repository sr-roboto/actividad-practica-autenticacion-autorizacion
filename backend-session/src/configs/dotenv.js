import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT;
const SESSION_KEY = process.env.SESSION_KEY;
const EXPRESS_SESSION_SECRET = process.env.EXPRESS_SESSION_SECRET;
const DB_NAME = process.env.DB_NAME;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_HOST = process.env.DB_HOST;

export {
  PORT,
  SESSION_KEY,
  EXPRESS_SESSION_SECRET,
  DB_NAME,
  DB_USER,
  DB_PASSWORD,
  DB_HOST,
};
