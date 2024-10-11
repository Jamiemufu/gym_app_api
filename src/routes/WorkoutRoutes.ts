import { Router, Request, Response } from "express";
import { AppDataSource } from "../config/ormconfig";
import { WorkoutRepository } from "../repositories/WorkoutRepository";

const router = Router();
const workoutRepo = new WorkoutRepository(AppDataSource);

// Get all workouts
router.get("/", async (req: Request, res: Response) => {
  const workouts = await workoutRepo.getAllWorkouts();
  res.json(workouts);
});

// get workout by id
router.get("/:uuid", async (req: Request, res: Response) => {
  const workout = await workoutRepo.getWorkoutById(req.params.uuid);
  res.json(workout);
});

export default router;