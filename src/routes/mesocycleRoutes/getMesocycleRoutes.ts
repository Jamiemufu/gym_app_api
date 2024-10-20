import { Router, Request, Response, NextFunction } from "express";
import { AppDataSource } from "../../config/ormconfig";
import { resourceValidator } from "../../middleware/resourceValidator";
import { MesocycleGetters } from "../../repositories/mesocycleRepository/MesocycleGetters";

const router = Router();
const mesoRepo = new MesocycleGetters(AppDataSource);
const errorMessage = "Mesocycle not found";

/**
 * NEEDS TO BE FIRST DUE TO ROUTE SPECIFICITY
 * Get mesocycle by user
 * GET /mesocycle/users/:uuid
 * @param req Request
 * @param res Response
 * @returns Promise<void>
 */
router.get("/users/:uuid", async (req: Request, res: Response, next: NextFunction) => {
  /**
   * #swagger.tags = ["Mesocycle"]
   * #swagger.description = "Retrieves a mesocycle by user ID."
   * #swagger.parameters['uuid'] = { description: "User ID" }
   * #swagger.path = '/mesocycle/users/{uuid}'
   * #swagger.summary = "Get a mesocycle by user ID"
   * #swagger.responses[200] = { description: "Mesocycles found." }
   * #swagger.responses[404] = { description: "Mesocycles not found." }
   * #swagger.responses[500] = { description: "Internal server error." }
   */
  try {
    const users = await mesoRepo.getMesocycleByUserId(req.params.uuid);
    resourceValidator(users, errorMessage, req, res);
  } catch (error) {
    next(error);
  }
});

/**
 * Get all mesocycles
 * GET /mesocycle/all
 * @param res Response
 * @returns Promise<void>
 */
router.get("/all", async (req: Request, res: Response, next: NextFunction) => {
  /**
   * #swagger.tags = ["Mesocycle"]
   * #swagger.description = "Retrieves all mesocycles."
   * #swagger.path = '/mesocycle/all'
   * #swagger.summary = "Get all mesocycles"
   * #swagger.responses[200] = { description: "Mesocycles found." }
   * #swagger.responses[404] = { description: "Mesocycles not found." }
   * #swagger.responses[500] = { description: "Internal server error." }
   */
  try {
    const mesocycles = await mesoRepo.getAllMesocycles();
    resourceValidator(mesocycles, errorMessage, req, res);
  } catch (error) {
    next(error);
  }
});

/**
 * Get mesocycle by id
 * GET /mesocycle/:uuid
 * @param req Request
 * @param res Response
 * @returns Promise<void>
 */
router.get("/:uuid", async (req: Request, res: Response, next: NextFunction) => {
  /**
   * #swagger.tags = ["Mesocycle"]
   * #swagger.description = "Retrieves a mesocycle by its ID."
   * #swagger.parameters['uuid'] = { description: "Mesocycle ID" }
   * #swagger.path = '/mesocycle/{uuid}'
   * #swagger.summary = "Get a mesocycle by ID"
   * #swagger.responses[200] = { description: "Mesocycle found." }
   * #swagger.responses[404] = { description: "Mesocycle not found." }
   * #swagger.responses[500] = { description: "Internal server error." }
   */
  try {
    const mesocycle = await mesoRepo.getMesocycleById(req.params.uuid);
    resourceValidator(mesocycle, errorMessage, req, res);
  } catch (error) {
    next(error);
  }
});

/**
 * Get mesocycle by name
 * GET /mesocycle/name/:name
 * @param req Request
 * @param res Response
 * @returns Promise<Mesocycle>
 */
router.get("/name/:name", async (req: Request, res: Response, next: NextFunction) => {
  /**
   * #swagger.tags = ["Mesocycle"]
   * #swagger.description = "Retrieves a mesocycle by its name."
   * #swagger.parameters['name'] = { description: "Mesocycle name" }
   * #swagger.path = '/mesocycle/name/{name}'
   * #swagger.summary = "Get a mesocycle by name"
   * #swagger.responses[200] = { description: "Mesocycle found." }
   * #swagger.responses[404] = { description: "Mesocycle not found." }
   * #swagger.responses[500] = { description: "Internal server error." }
   */
  try {
    const mesocycle = await mesoRepo.getMesocycleByName(req.params.name);
    resourceValidator(mesocycle, errorMessage, req, res);
  } catch (error) {
    next(error);
  }
});

/**
 * Get workouts by mesocycle id
 * GET /mesocycle/:id/workout
 * @param req Request
 * @param res Response
 * @returns Promise<void>
 */
router.get("/:uuid/workout", async (req: Request, res: Response, next: NextFunction) => {
  /**
   * #swagger.tags = ["Mesocycle"]
   * #swagger.description = "Retrieves workouts by mesocycle ID."
   * #swagger.parameters['uuid'] = { description: "Mesocycle ID" }
   * #swagger.path = '/mesocycle/{uuid}/workout'
   * #swagger.summary = "Get workouts by mesocycle ID"
   * #swagger.responses[200] = { description: "Workouts found." }
   * #swagger.responses[404] = { description: "Workouts not found." }
   * #swagger.responses[500] = { description: "Internal server error." }
   */
  try {
    const workouts = await mesoRepo.getWorkoutsByMesocycleId(req.params.uuid);
    resourceValidator(workouts, errorMessage, req, res);
  } catch (error) {
    next(error);
  }
});

/**
 * Get users by mesocycle id
 * GET /mesocycle/:uuid/users
 * @param req Request
 * @param res Response
 */
router.get("/:uuid/users", async (req: Request, res: Response, next: NextFunction) => {
  /**
   * #swagger.tags = ["Mesocycle"]
   * #swagger.description = "Retrieves users by mesocycle ID."
   * #swagger.parameters['uuid'] = { description: "Mesocycle ID" }
   * #swagger.path = '/mesocycle/{uuid}/users'
   * #swagger.summary = "Get users by mesocycle ID"
   * #swagger.responses[200] = { description: "Users found." }
   * #swagger.responses[404] = { description: "Users not found." }
   * #swagger.responses[500] = { description: "Internal server error." }
   */
  try {
    const users = await mesoRepo.getUsersByMesocycleId(req.params.uuid);
    resourceValidator(users, errorMessage, req, res);
  } catch (error) {
    next(error);
  }
});

export default router;