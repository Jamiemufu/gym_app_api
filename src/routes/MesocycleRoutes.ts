// src/routes/UserRoutes.ts
import { Router, Request, Response, NextFunction } from "express";
import { AppDataSource } from "../config/ormconfig";
import { MesocycleRepository } from "../repositories/MesocycleRepository";
import { resourceValidator } from "../middleware/resourceValidator";

const router = Router();
const mesoRepo = new MesocycleRepository(AppDataSource);
const errorMessage = "Mesocycle not found";

/**
 * NEEDS TO BE FIRST DUE TO ROUTE SPECIFICITY
 * Get mesocycle by user
 * GET /users/:id
 * @param req Request
 * @param res Response
 * @returns Promise<void>
 */
router.get("/users/:uuid", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await mesoRepo.getMesocycleByUserId(req.params.uuid);
    resourceValidator(users, errorMessage, req, res);
  } catch (error) {
    next(error);
  }
});

/**
 * Get all mesocycles
 * GET /mesocycles
 * @param res Response
 * @returns Promise<void>
 */
router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const mesocycles = await mesoRepo.getAllMesocycles();
    resourceValidator(mesocycles, errorMessage, req, res);
  } catch (error) {
    next(error);
  }
});

/**
 * Get mesocycle by id
 * GET /mesocycles/:id
 * @param req Request
 * @param res Response
 * @returns Promise<void>
 */
router.get("/:uuid", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const mesocycle = await mesoRepo.getMesocycleById(req.params.uuid);
    resourceValidator(mesocycle, errorMessage, req, res);
  } catch (error) {
    next(error);
  }
});

/**
 * Get mesocycle by name
 * GET /mesocycles/name/:name
 * @param req Request
 * @param res Response
 * @returns Promise<Mesocycle>
 */
router.get("/name/:name", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const mesocycle = await mesoRepo.getMesocycleByName(req.params.name);
    resourceValidator(mesocycle, errorMessage, req, res);
  } catch (error) {
    next(error);
  }
});

/**
 * Get workouts by mesocycle id
 * GET /workouts/:id
 * @param req Request
 * @param res Response
 * @returns Promise<void>
 */
router.get("/:uuid/workouts", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const workouts = await mesoRepo.getWorkoutsByMesocycleId(req.params.uuid);
    resourceValidator(workouts, errorMessage, req, res);
  } catch (error) {
    next(error);
  }
});

/**
 * Get users by mesocycle id
 * GET /mesocycles/:id/users
 * @param req Request
 * @param res Response
 */
router.get("/:uuid/users", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await mesoRepo.getUsersByMesocycleId(req.params.uuid);
    resourceValidator(users, errorMessage, req, res);
  } catch (error) {
    next(error);
  }
});

export default router;
