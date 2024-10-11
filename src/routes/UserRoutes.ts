// routes/userRoutes.ts

import { Router, Request, Response } from "express";
import { UserRepository } from "../repositories/UserRepository";
import { AppDataSource } from "../config/ormconfig";

const router = Router();
const userRepo = new UserRepository(AppDataSource);

// Get all Users
router.get("/", async (req: Request, res: Response) => {
  const users = await userRepo.getAllUsers();
  res.json(users);
});

// Get all Users with all related entities
router.get("/all", async (req: Request, res: Response) => {
    const users = await userRepo.getAllUsersWithAll();
    res.json(users);
  });

// Get User by UUID
router.get("/:uuid", async (req: Request, res: Response) => {
  const user = await userRepo.getUserWithMesocyclesWorkoutsUserExercisesAndExercises(req.params.uuid);
  res.json(user);
});

// Get User with Mesocycles
router.get("/:uuid/mesocycles", async (req: Request, res: Response) => {
  const user = await userRepo.getUserWithMesocycles(req.params.uuid);
  res.json(user);
});

// Get User with Mesocycles and Workouts
router.get("/:uuid/mesocycles/workouts", async (req: Request, res: Response) => {
  const user = await userRepo.getUserWithMesocyclesAndWorkouts(req.params.uuid);
  res.json(user);
});

// Get User with Mesocycles, Workouts, and User Exercises
router.get("/:uuid/mesocycles/workouts/user-exercises", async (req: Request, res: Response) => {
  const user = await userRepo.getUserWithMesocyclesWorkoutsAndUserExercises(req.params.uuid);
  res.json(user);
});

// Get User with Mesocycles, Workouts, User Exercises, and Exercises
router.get("/:uuid/mesocycles/workouts/user-exercises/exercises", async (req: Request, res: Response) => {
  const user = await userRepo.getUserWithMesocyclesWorkoutsUserExercisesAndExercises(req.params.uuid);
  res.json(user);
});

export default router;
