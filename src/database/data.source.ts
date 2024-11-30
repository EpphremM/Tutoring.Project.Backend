import "reflect-metadata";
import { DataSource, Entity } from "typeorm";
import ENV from "../shared/dot_env/utility";
export const AppDataSource: DataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  username: ENV.db_username,
  port: parseInt(ENV.db_port || "5432"),
  database: ENV.db_name,
  password: ENV.db_password,
  entities: [__dirname + "/entities/**/*.ts"],
  migrations: [__dirname + "/migration/**/*.ts"],
  // entities: [__dirname + '/entities/**/*.ts'],
  synchronize: true,
});
const intializeConnection = () => {
  try {
    AppDataSource.initialize().then(() => {
      console.log("Database connected");
    });
  } catch (error) {
    console.log("database connection error ", error);
  }
};
export default intializeConnection;
