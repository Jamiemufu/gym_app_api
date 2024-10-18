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

/**
 * Update exercise by id
 * PUT /exercise/update/:uuid
 * @param req Request
 * @param res Response
 * @returns Promise<Exercise>
 * @throws Error
 */
router.put("/update/:uuid", async (req: Request, res: Response, next: NextFunction) => {
  /**
   * #swagger.tags = ["Exercise"]
   * #swagger.description = "Updates an exercise by its ID."
   * #swagger.parameters['uuid'] = { description: "Exercise ID" }
   * #swagger.parameters['name'] = { description: "Exercise name" }
   * #swagger.parameters['muscle_group'] = { description: "Muscle group" }
   * #swagger.parameters['equipment'] = { description: "Equipment" }
   * #swagger.path = '/exercise/update/{uuid}'
   * #swagger.responses[200] = { description: "Exercise updated." }
   * #swagger.responses[404] = { description: "Exercise not found." }
   * #swagger.responses[500] = { description: "Internal server error." }
   */
  try {
    const exercise = await exerciseRepository.updateExercise(
      req.params.uuid,
      req.query.name as string,
      req.query.muscle_group as string,
      req.query.equipment as string
    );
    resourceValidator(exercise, errorMessage, req, res);
  } catch (error) {
    next(error);
  }
});

/**
 * Create a new exercise
 * POST /exercise/create
 * @param req Request
 * @param res Response
 * @returns Promise<Exercise>
 */
router.post("/create", async (req: Request, res: Response, next: NextFunction) => {
  /**
   * #swagger.tags = ["Exercise"]
   * #swagger.description = "Creates a new exercise."
   * #swagger.parameters['name'] = { description: "Exercise name", required: true }
   * #swagger.parameters['muscle_group'] = { description: "Muscle group", required: true }
   * #swagger.parameters['equipment'] = { description: "Equipment", required: true }
   * #swagger.path = '/exercise/create'
   * #swagger.responses[201] = { description: "Exercise created." }
   * #swagger.responses[500] = { description: "Internal server error." }
   */
  try {
    const exercise = await exerciseRepository.createExercise(
      req.query.name as string,
      req.query.muscle_group as string,
      req.query.equipment as string
    );
    resourceValidator(exercise, errorMessage, req, res);
  } catch (error) {
    next(error);
  }
});

/**
 * Delete exercise by id
 * DELETE /exercise/delete/:uuid
 * @param req Request
 * @param res Response
 * @returns Promise<void>
 */
router.delete("/delete/:uuid", async (req: Request, res: Response, next: NextFunction) => {
  /**
   * #swagger.tags = ["Exercise"]
   * #swagger.description = "Deletes an exercise by its ID."
   * #swagger.parameters['uuid'] = { description: "Exercise ID" }
   * #swagger.path = '/exercise/delete/{uuid}'
   * #swagger.responses[204] = { description: "Exercise deleted." }
   * #swagger.responses[404] = { description: "Exercise not found." }
   * #swagger.responses[500] = { description: "Internal server error." }
   */
  try {
    const exercise = await exerciseRepository.deleteExercise(req.params.uuid);
    resourceValidator(exercise, errorMessage, req, res);
  } catch (error) {
    next(error);
  }
});

export default router;
