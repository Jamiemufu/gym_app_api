require("dotenv").config();

import "reflect-metadata"; //required for TypeORM
import { AppDataSource } from "./config/ormconfig";
import express from "express";
import session from "express-session";
import userRoutes from "./routes/UserRoutes";
import mesocycleRoutes from "./routes/MesocycleRoutes";
import exerciseRoutes from "./routes/ExerciseRoutes";
import workoutRoutes from "./routes/WorkoutRoutes";
import { errorHandler } from "./middleware/errorHandler";

const swaggerUi = require('swagger-ui-express');
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
    app.use("/users", userRoutes);
    app.use("/mesocycle", mesocycleRoutes);
    app.use("/exercise", exerciseRoutes);
    app.use("/workout", workoutRoutes);
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(require('./swagger/swagger-output.json')));
    app.use(errorHandler)
    
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
      console.log('Database name:', AppDataSource.options.database);
    });
  })
  .catch((error) => console.error("Error during Data Source initialization:", error));
