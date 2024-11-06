require("dotenv").config();
import { AppDataSource } from "./src/config/ormconfig";
import { app } from "./src/app";

let server: ReturnType<typeof app.listen> | undefined;
const PORT = process.env.NODE_ENV === "test" ? 3001 : 3000;

beforeAll(async () => {
  const db = await AppDataSource.initialize();
  // console log the name of the db connected
  console.log("Connected to: " + db.options.database);
  await AppDataSource.synchronize(true);
  await AppDataSource.runMigrations();
  server = app.listen(PORT || "3000");
});

afterAll(async () => {
  await AppDataSource.undoLastMigration();
  await AppDataSource.destroy();
  server?.close();
});
