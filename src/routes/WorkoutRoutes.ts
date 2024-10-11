import { Router, Request, Response } from "express";
import { AppDataSource } from "../config/ormconfig";
import { WorkoutRepository } from "../repositories/WorkoutRepository";

const router = Router();
const workoutRepo = new WorkoutRepository(AppDataSource);

// // Get all Workouts
router.get("/", async (req: Request, res: Response) => {
  const workouts = await workoutRepo.getAllWorkouts();
  res.json(workouts);
});

export default router;