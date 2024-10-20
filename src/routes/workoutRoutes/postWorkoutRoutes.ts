import { Router, Request, Response, NextFunction } from "express";
import { AppDataSource } from "../../config/ormconfig";
import { WorkoutSetters } from "../../repositories/workoutRepository/WorkoutSetters";

const router = Router();
const workoutRepository = new WorkoutSetters(AppDataSource);
const errorMessage = "Workout not found";

// TODO: Add workout creation route

export default router;