import pkg from 'pg';
const { Pool } = pkg;
import { config } from 'dotenv';

config({path:`${process.cwd()}/.env`});

const pool = new Pool({
  user: process.env.DB_User,
  host: '127.0.0.1',
  database: process.env.DB_Name,
  password: process.env.DB_Pass,
  port: 5432,
});

export default pool;
