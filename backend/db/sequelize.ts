import { Sequelize } from "sequelize";
import * as dotenv from "dotenv";

dotenv.config();

const db = new Sequelize(
  process.env.DB_NAME as string,
  process.env.DB_USER as string,
  process.env.DB_PASSWORD,
  {
    dialect: "mariadb",
    host: "127.0.0.1",
  }
);

export { db };