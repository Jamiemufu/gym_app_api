require("dotenv").config();

import "reflect-metadata";
import { AppDataSource } from "./config/ormconfig";
import express from "express";
import session from "express-session";
import userRoutes from "./routes/UserRoutes";
import workoutRoutes from "./routes/WorkoutRoutes";

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

    // Use user routes with a base path
    app.use("/users", userRoutes);
    // Use workout routes with a base path
    app.use("/workouts", workoutRoutes);

    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => console.error("Error during Data Source initialization:", error));
