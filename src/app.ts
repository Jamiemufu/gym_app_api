require("dotenv").config();

import "reflect-metadata"; //required for TypeORM
import { AppDataSource } from "./config/ormconfig";
import express from "express";
import session from "express-session";
import userRoutes from "./routes/UserRoutes";
import mesocycleRoutes from "./routes/MesocycleRoutes";
import exerciseRoutes from "./routes/ExerciseRoutes";
import { errorHandler } from "./middleware/errorHandler";

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

    // // Use user routes with a base path
    app.use("/users", userRoutes);
    app.use("/mesocycle", mesocycleRoutes);
    app.use("/exercise", exerciseRoutes);
    // // Use workout routes with a base path
    // app.use("/workouts", workoutRoutes);
    app.use(errorHandler)

    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
      console.log('Database name:', AppDataSource.options.database);
    });
  })
  .catch((error) => console.error("Error during Data Source initialization:", error));
