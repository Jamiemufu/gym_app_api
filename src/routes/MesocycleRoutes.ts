// src/routes/UserRoutes.ts
import { Router, Request, Response } from "express";
import { AppDataSource } from "../config/ormconfig";
import { MesocycleRepository } from "../repositories/MesocycleRepository";

const router = Router();
const mesoRepo = new MesocycleRepository(AppDataSource);

/**
 * Get all mesocycles
 * GET /mesocycles
 * @param res Response
 * @returns Promise<void>
 */
router.get("/", async (req: Request, res: Response) => {
  const mesocycles = await mesoRepo.getAllMesocycles();
  res.json(mesocycles);
});

/**
 * Get mesocycle by id
 * GET /mesocycles/:id
 * @param req Request
 * @param res Response
 * @returns Promise<void>
 */
router.get("/:uuid:", async (req: Request, res: Response) => {
  const mesocycle = await mesoRepo.getMesocycleById(req.params.uuid);
  if (mesocycle) {
    res.json(mesocycle);
  } else {
    res.status(404).json({ message: "Mesocycle not found" });
  }
});

/**
 * Get users by mesocycle id
 * GET /mesocycles/:id/users
 * @param req Request
 * @param res Response
 */
router.get("/:uuid/users", async (req: Request, res: Response) => {
  const users = await mesoRepo.getUsersByMesocycleId(req.params.uuid);
  res.json(users);
});

/**
 * Get all users
 * GET /users
 * @param res Response
 * @returns Promise<void>
 */
router.get("/users/", async (req: Request, res: Response) => {
  const users = await mesoRepo.getAllMesocycleUsers();
  res.json(users);
});

/**
 * Get mesocycle by user
 * GET /users/:id
 * @param req Request
 * @param res Response
 * @returns Promise<void>
 */
router.get("/user/:uuid", async (req: Request, res: Response) => {
  const users = await mesoRepo.getMesocycleByUser(req.params.uuid);
  res.json(users);
});

/**
 * Get workouts by mesocycle
 * GET /workouts
 * @param res Response
 * @returns Promise<void>
 */
router.get("/workouts", async (req: Request, res: Response) => {
  const workouts = await mesoRepo.getAllWorkoutsByMesocycles();
  res.json(workouts);
});

/**
 * Get workouts by mesocycle id
 * GET /workouts/:id
 * @param req Request
 * @param res Response
 * @returns Promise<void>
 */
router.get("/workouts/:uuid", async (req: Request, res: Response) => {
  const workouts = await mesoRepo.getWorkoutsByMesocycleId(req.params.uuid);
  res.json(workouts);
});

export default router;
