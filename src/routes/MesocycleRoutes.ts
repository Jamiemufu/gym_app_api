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
 * GET /mesocycle/users/id/:uuid
 * @param req Request
 * @param res Response
 * @returns Promise<void>
 */
router.get("/users/id/:uuid", async (req: Request, res: Response, next: NextFunction) => {
  /**
   * #swagger.tags = ["Mesocycle"]
   * #swagger.description = "Retrieves a mesocycle by user ID."
   * #swagger.parameters['uuid'] = { description: "User ID" }
   * #swagger.path = '/mesocycle/users/id/{uuid}'
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
 * GET /mesocycle/id/:uuid
 * @param req Request
 * @param res Response
 * @returns Promise<void>
 */
router.get("/id/:uuid", async (req: Request, res: Response, next: NextFunction) => {
  /**
   * #swagger.tags = ["Mesocycle"]
   * #swagger.description = "Retrieves a mesocycle by its ID."
   * #swagger.parameters['uuid'] = { description: "Mesocycle ID" }
   * #swagger.path = '/mesocycle/id/{uuid}'
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
 * GET /mesocycle/workouts/:id
 * @param req Request
 * @param res Response
 * @returns Promise<void>
 */
router.get("/id/:uuid/workouts", async (req: Request, res: Response, next: NextFunction) => {
  /**
   * #swagger.tags = ["Mesocycle"]
   * #swagger.description = "Retrieves workouts by mesocycle ID."
   * #swagger.parameters['uuid'] = { description: "Mesocycle ID" }
   * #swagger.path = '/mesocycle/workouts/{uuid}'
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
 * GET /mesocycle/id/:uuid/users
 * @param req Request
 * @param res Response
 */
router.get("/id/:uuid/users", async (req: Request, res: Response, next: NextFunction) => {
  /**
   * #swagger.tags = ["Mesocycle"]
   * #swagger.description = "Retrieves users by mesocycle ID."
   * #swagger.parameters['uuid'] = { description: "Mesocycle ID" }
   * #swagger.path = '/mesocycle/id/{uuid}/users'
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

/**
 * Update mesocycle name
 * PUT /mesocycle/update/:uuid/:name
 * @param req Request
 * @param res Response
 * @returns Promise<void>
 */
router.patch("/update/:uuid/:name", async (req: Request, res: Response, next: NextFunction) => {
  /**
   * #swagger.tags = ["Mesocycle"]
   * #swagger.description = "Updates a mesocycle name."
   * #swagger.parameters['uuid'] = { description: "Mesocycle ID" }
   * #swagger.parameters['name'] = { description: "New Mesocycle name" }
   * #swagger.path = '/mesocycle/update/name/{uuid}/{name}'
   * #swagger.responses[200] = { description: "Mesocycle updated." }
   * #swagger.responses[404] = { description: "Mesocycle not found." }
   * #swagger.responses[500] = { description: "Internal server error." }
   */
  try {
    const mesocycle = await mesoRepo.updateMesocycleName(req.params.uuid, req.params.name);
    resourceValidator(mesocycle, errorMessage, req, res);
  } catch (error) {
    next(error);
  }
});

/**
 * Update MesoCycle
 * PUT /mesocycle/update/:uuid
 * @param req Request
 * @param res Response
 * @returns Promise<void>
 * @throws Error
 */
router.put("/update/:uuid", async (req: Request, res: Response, next: NextFunction) => {
  /**
   * #swagger.tags = ["Mesocycle"]
   * #swagger.description = "Updates a mesocycle."
   * #swagger.parameters['uuid'] = { description: "Mesocycle ID" }
   * #swagger.parameters['name'] = { description: "Mesocycle name" }
   * #swagger.parameters['length'] = { description: "Mesocycle length" }
   * #swagger.parameters['phase'] = { description: "Mesocycle phase" }
   * #swagger.parameters['periodization'] = { description: "Mesocycle periodization" }
   * #swagger.path = '/mesocycle/update/{uuid}'
   * #swagger.responses[200] = { description: "Mesocycle updated." }
   * #swagger.responses[404] = { description: "Mesocycle not found." }
   * #swagger.responses[500] = { description: "Internal server error." }
   */
  try {
    const mesocycle = await mesoRepo.updateMesocycle(
      req.params.uuid,
      req.query.name as string,
      parseInt(req.query.length as string),
      req.query.phase as string,
      req.query.periodization as string
    );
    resourceValidator(mesocycle, errorMessage, req, res);
  } catch (error) {
    next(error);
  }
});

/**
 * Create mesocycle
 * POST /mesocycle/create/:uuid
 * @param req Request
 * @param res Response
 * @returns Promise<void>
 */
router.post("/create/:uuid", async (req: Request, res: Response, next: NextFunction) => {
  /**
   * #swagger.tags = ["Mesocycle"]
   * #swagger.description = "Creates a new mesocycle."
   * #swagger.parameters['uuid'] = { description: "User ID" }
   * #swagger.parameters['name'] = { description: "Mesocycle name" }
   * #swagger.parameters['length'] = { description: "Mesocycle length" }
   * #swagger.parameters['phase'] = { description: "Mesocycle phase" }
   * #swagger.parameters['periodization'] = { description: "Mesocycle periodization" }
   * #swagger.path = '/mesocycle/create/{uuid}'
   * #swagger.responses[201] = { description: "Mesocycle created." }
   * #swagger.responses[500] = { description: "Internal server error." }
   */
  try {
    const userId = req.params.uuid;
    const name = req.query.name as string;
    const length = parseInt(req.query.length as string);
    const phase = req.query.phase as string;
    const periodization = req.query.periodization as string;
    const mesocycle = await mesoRepo.createMesocycle(userId, name, length, phase, periodization);
    resourceValidator(mesocycle, errorMessage, req, res);
  } catch (error) {
    next(error);
  }
});

/**
 * Delete mesocycle
 * DELETE /mesocycle/delete/:uuid
 * @param req Request
 * @param res Response
 * @returns Promise<void>
 */
router.delete("/delete/:uuid", async (req: Request, res: Response, next: NextFunction) => {
  /**
   * #swagger.tags = ["Mesocycle"]
   * #swagger.description = "Deletes a mesocycle."
   * #swagger.parameters['uuid'] = { description: "Mesocycle ID" }
   * #swagger.path = '/mesocycle/delete/{uuid}'
   * #swagger.responses[204] = { description: "Mesocycle deleted." }
   * #swagger.responses[404] = { description: "Mesocycle not found." }
   * #swagger.responses[500] = { description: "Internal server error." }
   */
  try {
    const mesocycle = await mesoRepo.deleteMesocycle(req.params.uuid);
    resourceValidator(mesocycle, errorMessage, req, res);
  } catch (error) {
    next(error);
  }
});

export default router;
