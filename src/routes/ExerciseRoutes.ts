import { Router, Request, Response, NextFunction } from "express";
import { AppDataSource } from "../config/ormconfig";
import { ExerciseRepository } from "../repositories/ExerciseRepository";
import { resourceValidator } from "../middleware/resourceValidator";

const router = Router();
const exerciseRepository = new ExerciseRepository(AppDataSource);
const errorMessage = "Exercise not found";

/**
 * Get all exercises
 * GET /exercise/all
 * @param res Response
 * @returns Promise<Exercise[]>
 */
router.get("/all", async (req: Request, res: Response, next: NextFunction) => {
  /**
   * #swagger.tags = ["Exercise"]
   * #swagger.description = "Retrieves all exercises."
   * #swagger.path = '/exercise/all'
   * #swagger.responses[200] = { description: "Exercises found." }
   * #swagger.responses[404] = { description: "Exercises not found." }
   * #swagger.responses[500] = { description: "Internal server error." }
   */
  try {
    const exercises = await exerciseRepository.getAllExercises();
    resourceValidator(exercises, errorMessage, req, res);
  } catch (err) {
    next(err);
  }
});

/**
 * Get exercise by name
 * GET /exercise/name/:name
 * @param req Request
 * @param res Response
 * @returns Promise<Exercise>
 */
router.get("/name/:name", async (req: Request, res: Response, next: NextFunction) => {
  /**
   * #swagger.tags = ["Exercise"]
   * #swagger.description = "Retrieves an exercise by its name."
   * #swagger.parameters['name'] = { description: "Exercise name" }
   * #swagger.path = '/exercise/name/{name}'
   * #swagger.responses[200] = { description: "Exercise found." }
   * #swagger.responses[404] = { description: "Exercise not found." }
   * #swagger.responses[500] = { description: "Internal server error." }
   */
  try {
    const exercise = await exerciseRepository.getExerciseByName(req.params.name);
    resourceValidator(exercise, errorMessage, req, res);
  } catch (error) {
    next(error);
  }
});

/**
 * Get exercise by muscle group
 * GET /exercise/muscle_group/:muscle_group
 * @param req Request
 * @param res Response
 * @returns Promise<Exercise[]>
 */
router.get("/muscle_group/:muscle_group", async (req: Request, res: Response, next: NextFunction) => {
  /**
   * #swagger.tags = ["Exercise"]
   * #swagger.description = "Retrieves exercises by its muscle group."
   * #swagger.parameters['muscle_group'] = { description: "Muscle group" }
   * #swagger.path = '/exercise/muscle_group/{muscle_group}'
   * #swagger.responses[200] = { description: "Exercise found." }
   * #swagger.responses[404] = { description: "Exercise not found." }
   * #swagger.responses[500] = { description: "Internal server error." }
   */
  try {
    const exercise = await exerciseRepository.getExerciseByType(req.params.muscle_group);
    resourceValidator(exercise, errorMessage, req, res);
  } catch (error) {
    next(error);
  }
});

/**
 * Get exercise by equipment
 * GET /exercise/equipment/:equipment
 * @param req Request
 * @param res Response
 * @returns Promise<Exercise[]>
 */
router.get("/equipment/:equipment", async (req: Request, res: Response, next: NextFunction) => {
  /**
   * #swagger.tags = ["Exercise"]
   * #swagger.description = "Retrieves exercises by its equipment."
   * #swagger.parameters['equipment'] = { description: "Equipment" }
   * #swagger.path = '/exercise/equipment/{equipment}'
   * #swagger.responses[200] = { description: "Exercise found." }
   * #swagger.responses[404] = { description: "Exercise not found." }
   * #swagger.responses[500] = { description: "Internal server error." }
   */
  try {
    const exercise = await exerciseRepository.getExerciseByEquipment(req.params.equipment);
    resourceValidator(exercise, errorMessage, req, res);
  } catch (error) {
    next(error);
  }
});

/**
 * Get exercise by id
 * GET /exercise/id/:uuid
 * @param req Request
 * @param res Response
 * @returns Promise<Exercise>
 */
router.get("/id/:uuid", async (req: Request, res: Response, next: NextFunction) => {
  /**
   * #swagger.tags = ["Exercise"]
   * #swagger.description = "Retrieves an exercise by its ID."
   * #swagger.parameters['uuid'] = { description: "Exercise ID" }
   * #swagger.path = '/exercise/id/{uuid}'
   * #swagger.responses[200] = { description: "Exercise found." }
   * #swagger.responses[404] = { description: "Exercise not found." }
   * #swagger.responses[500] = { description: "Internal server error." }
   */
  try {
    const exercise = await exerciseRepository.getExerciseById(req.params.uuid);
    resourceValidator(exercise, errorMessage, req, res);
  } catch (error) {
    next(error);
  }
});

export default router;
