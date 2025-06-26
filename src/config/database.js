import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
  }
);

export default sequelize; 

export const startDB = async () => {
    try {
        await sequelize.authenticate();
        console.log("Se establecio la conexión con la base de datos");
        await sequelize.sync();
    } catch (error) {
        console.log("Hubo un error al intentar establecer conexion con la base de datos: ", error.message);
    }
};