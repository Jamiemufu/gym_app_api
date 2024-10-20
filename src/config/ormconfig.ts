import "dotenv/config"; // having require at root not working?
import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT || "5432"), // Convert to number
  database: process.env.DATABASE_NAME,
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  logging: true,
  synchronize: true,
  entities: ["src/entities/**/*.ts"],
  migrations: ["src/migration/**/*.ts"],
  migrationsTableName: "migrations",
  subscribers: [],
});

// npx typeorm-ts-node-commonjs migration:run -- -d ./src/config/ormconfig.ts
// npx typeorm migration:create ./src/migration/InitMigration
