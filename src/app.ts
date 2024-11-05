require("dotenv").config();

import "reflect-metadata"; //required for TypeORM
import { AppDataSource } from "./config/ormconfig";
import express from "express";
import session from "express-session";
import getUserRoutes from "./routes/userRoutes/getUserRoutes";
import postUserRoutes from "./routes/userRoutes/postUserRoutes";
import deleteUserRoutes from "./routes/userRoutes/deleteUserRoutes";
import getMesocycleRoutes from "./routes/mesocycleRoutes/getMesocycleRoutes";
import postMesocycleRoutes from "./routes/mesocycleRoutes/postMesocycleRoutes";
import deleteMesocycleRoutes from "./routes/mesocycleRoutes/deleteMesocycleRoutes";
import putMesocycleRoutes from "./routes/mesocycleRoutes/putMesocycleRoutes";
import patchMesocycleRoutes from "./routes/mesocycleRoutes/patchMesocycleRoutes";
import getExerciseRoutes from "./routes/exerciseRoutes/getExerciseRoutes";
import postExerciseRoutes from "./routes/exerciseRoutes/postExerciseRoutes";
import putExerciseRoutes from "./routes/exerciseRoutes/putExerciseRoutes";
import deleteExerciseRoutes from "./routes/exerciseRoutes/deleteExerciseRoutes";
import getWorkoutRoutes from "./routes/workoutRoutes/getWorkoutRoutes";
import postWorkoutRoutes from "./routes/workoutRoutes/postWorkoutRoutes";
import putWorkoutRoutes from "./routes/workoutRoutes/putWorkoutRoutes";
import deleteWorkoutRoutes from "./routes/workoutRoutes/deleteWorkoutRoutes";
import patchWorkoutRoutes from "./routes/workoutRoutes/patchWorkoutRoutes";
import getUserLogRoutes from "./routes/userLogRoutes/getUserLogRoutes";
import { errorHandler } from "./middleware/errorHandler";
import getUserWorkoutRoutes from "./routes/userWorkoutRoutes/getUserWorkoutRoutes";
import postUserWorkoutRoutes from "./routes/userWorkoutRoutes/postUserWorkoutRoutes";
import deleteUserWorkoutRoutes from "./routes/userWorkoutRoutes/deleteUserWorkoutRoutes";
import postUserLogRoutes from "./routes/userLogRoutes/postUserLogRoutes";

const swaggerUi = require("swagger-ui-express");
const app = express();

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

// user routes
app.use("/users", getUserRoutes);
app.use("/users", postUserRoutes);
app.use("/users", deleteUserRoutes);
// mesocycle routes
app.use("/mesocycle", getMesocycleRoutes);
app.use("/mesocycle", postMesocycleRoutes);
app.use("/mesocycle", deleteMesocycleRoutes);
app.use("/mesocycle", putMesocycleRoutes);
app.use("/mesocycle", patchMesocycleRoutes);
// exercise routes
app.use("/exercise", getExerciseRoutes);
app.use("/exercise", postExerciseRoutes);
app.use("/exercise", putExerciseRoutes);
app.use("/exercise", deleteExerciseRoutes);
// workout routes
app.use("/workout", getWorkoutRoutes);
app.use("/workout", postWorkoutRoutes);
app.use("/workout", putWorkoutRoutes);
app.use("/workout", deleteWorkoutRoutes);
app.use("/workout", patchWorkoutRoutes);
// user workout routes
app.use("/userworkout", getUserWorkoutRoutes);
app.use("/userworkout", postUserWorkoutRoutes);
app.use("/userworkout", deleteUserWorkoutRoutes);
// User Log routes
app.use("/userlog", getUserLogRoutes);
app.use("/userlog", postUserLogRoutes);
// Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(require("./swagger/swagger-output.json")));
// Error handling
app.all("*", () => {
  throw new Error("Route not found");
});
app.use(errorHandler);

// Initialize TypeORM and start the server
export const initializeApp = async () => {
  await AppDataSource.initialize();
  return app;
};

// Call the initialization function
initializeApp().catch((error) => {
  console.error("Error during Data Source initialization:", error);
});

export { app };
