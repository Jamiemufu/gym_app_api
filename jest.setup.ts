require("dotenv").config();
import { AppDataSource } from "./src/config/ormconfig";
import { app } from "./src/app";

let server: ReturnType<typeof app.listen> | undefined;

beforeAll(async () => {
  const db = await AppDataSource.initialize();
  // console log the name of the db connected
  console.log("Connected to: " + db.options.database);
  await AppDataSource.synchronize(true);
  await AppDataSource.runMigrations();
  server = app.listen(process.env.APP_PORT || "3000");
});

afterAll(async () => {
  await AppDataSource.undoLastMigration();
  await AppDataSource.destroy();
  server?.close();
});
