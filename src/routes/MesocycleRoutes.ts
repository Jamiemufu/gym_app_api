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
  mesocycles ? res.status(200).json(mesocycles) : res.status(404).json({ message: "Mesocycles not found" });
});

/**
 * Get mesocycle by id
 * GET /mesocycles/:id
 * @param req Request
 * @param res Response
 * @returns Promise<void>
 */
router.get("/:uuid", async (req: Request, res: Response) => {
  const mesocycle = await mesoRepo.getMesocycleById(req.params.uuid);
  mesocycle ? res.status(200).json(mesocycle) : res.status(404).json({ message: "Mesocycle not found" });
});

/**
 * Get users by mesocycle id
 * GET /mesocycles/:id/users
 * @param req Request
 * @param res Response
 */
router.get("/:uuid/users", async (req: Request, res: Response) => {
  const users = await mesoRepo.getUsersByMesocycleId(req.params.uuid);
  users ? res.status(200).json(users) : res.status(404).json({ message: "Users not found" });
});

/**
 * Get all users
 * GET /users
 * @param res Response
 * @returns Promise<void>
 */
router.get("/users/", async (req: Request, res: Response) => {
  const users = await mesoRepo.getAllMesocycleUsers();
  users ? res.status(200).json(users) : res.status(404).json({ message: "Users not found" });
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
  users ? res.status(200).json(users) : res.status(404).json({ message: "Mesocycle not found" });
});

/**
 * Get workouts by mesocycle
 * GET /workouts
 * @param res Response
 * @returns Promise<void>
 */
router.get("/workouts", async (req: Request, res: Response) => {
  const workouts = await mesoRepo.getAllWorkoutsByMesocycles();
  workouts ? res.status(200).json(workouts) : res.status(404).json({ message: "Workouts not found" });
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
  workouts ? res.status(200).json(workouts) : res.status(404).json({ message: "Workouts not found" });
});

export default router;
