require("dotenv").config();
import { AppDataSource } from "./src/config/ormconfig";
import { app } from "./src/app";

let server: ReturnType<typeof app.listen> | undefined;

beforeAll(async () => {
  await AppDataSource.initialize();
  await AppDataSource.synchronize(true);
  await AppDataSource.runMigrations();
  server = app.listen(process.env.APP_PORT || "3000");
});

afterAll(async () => {
  await AppDataSource.undoLastMigration();
  await AppDataSource.destroy();
  server?.close();
});
