require("dotenv").config();

import "reflect-metadata";
import { AppDataSource } from "./config/ormconfig";
import { UserRepository } from "./repositories/UserRepository";
import express from "express";
import { Request, Response } from "express";
import session from "express-session";

const app = express();
const PORT = process.env.APP_PORT || 3000;

// Middleware
app.use(express.json());
app.use(
  session({
    secret: "my_secret",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: "auto" },
  })
);

// Initialize TypeORM and start the server
AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");

    const userRepo = new UserRepository(AppDataSource);

    // Get all Users
    app.get("/users", async (req: Request, res: Response) => {
      const users = await userRepo.getAllUsers();
      res.json(users);
    });

    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => console.error("Error during Data Source initialization:", error));
