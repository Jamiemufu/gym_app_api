import { Router, Request, Response, NextFunction } from "express";
import { AppDataSource } from "../../config/ormconfig";
import { resourceValidator } from "../../middleware/resourceValidator";
import { WorkoutGetters } from "../../repositories/workoutRepository/WorkoutGetters";

const router = Router();
const workoutRepository = new WorkoutGetters(AppDataSource);
const errorMessage = "Workout not found";

/**
 * Get all workouts
 * GET /workout/all
 * @param res Response
 * @returns Promise<void>
 */
router.get("/all", async (req: Request, res: Response, next: NextFunction) => {
  /**
   * #swagger.tags = ["Workout"]
   * #swagger.description = "Retrieves all workouts."
   * #swagger.path = '/workout/all'
   * #swagger.summary = "Get all workouts"
   * #swagger.responses[200] = { description: "Workouts found." }
   * #swagger.responses[404] = { description: "Workouts not found." }
   * #swagger.responses[500] = { description: "Internal server error." }
   */
  try {
    const workouts = await workoutRepository.getAllWorkouts();
    resourceValidator(workouts, errorMessage, req, res);
  } catch (error) {
    next(error);
  }
});

/**
 * Get workouts and exercises
 * GET /workout/all/exercises
 * @param res Response
 * @returns Promise<void>
 */
router.get("/all/exercises", async (req: Request, res: Response, next: NextFunction) => {
  /**
   * #swagger.tags = ["Workout"]
   * #swagger.description = "Retrieves workouts and exercises."
   * #swagger.path = '/workout/all/exercises'
   * #swagger.summary = "Get workouts and exercises"
   * #swagger.responses[200] = { description: "Workouts found." }
   * #swagger.responses[404] = { description: "Workouts not found." }
   * #swagger.responses[500] = { description: "Internal server error." }
   */
  try {
    const workouts = await workoutRepository.getWorkoutsAndExercises();
    resourceValidator(workouts, errorMessage, req, res);
  } catch (error) {
    next(error);
  }
});

/**
 * Get workout by ID
 * GET /workout/:uuid
 * @param res Response
 * @returns Promise<void>
 */
router.get("/:uuid", async (req: Request, res: Response, next: NextFunction) => {
  /**
   * #swagger.tags = ["Workout"]
   * #swagger.description = "Retrieves a workout by its ID."
   * #swagger.parameters['uuid'] = { description: "Workout ID" }
   * #swagger.path = '/workout/{uuid}'
   * #swagger.summary = "Get workout by workout ID"
   * #swagger.responses[200] = { description: "Workout found." }
   * #swagger.responses[404] = { description: "Workout not found." }
   * #swagger.responses[500] = { description: "Internal server error." }
   */
  try {
    const workout = await workoutRepository.getWorkoutById(req.params.uuid);
    resourceValidator(workout, errorMessage, req, res);
  } catch (error) {
    next(error);
  }
});

/**
 * Get workout exercises
 * GET /workout/id/:uuid/exercises
 * @param res Response
 * @returns Promise<void>
 */
router.get("/:uuid/exercises", async (req: Request, res: Response, next: NextFunction) => {
  /**
   * #swagger.tags = ["Workout"]
   * #swagger.description = "Retrieves a workout's exercises by its ID."
   * #swagger.parameters['uuid'] = { description: "Workout ID" }
   * #swagger.path = '/workout/{uuid}/exercises'
   * #swagger.summary = "Get workout exercises by workout ID"
   * #swagger.responses[200] = { description: "Workout found." }
   * #swagger.responses[404] = { description: "Workout not found." }
   * #swagger.responses[500] = { description: "Internal server error." }
   */
  try {
    const workout = await workoutRepository.getWorkoutExercises(req.params.uuid);
    resourceValidator(workout, errorMessage, req, res);
  } catch (error) {
    next(error);
  }
});

/**
 * Get workout by name
 * GET /workout/name/:name
 * @param res Response
 * @returns Promise<void>
 */
router.get("/name/:name", async (req: Request, res: Response, next: NextFunction) => {
  /**
   * #swagger.tags = ["Workout"]
   * #swagger.description = "Retrieves a workout by its name."
   * #swagger.parameters['name'] = { description: "Workout name" }
   * #swagger.path = '/workout/name/{name}'
   * #swagger.summary = "Get workout by name"
   * #swagger.responses[200] = { description: "Workout found." }
   * #swagger.responses[404] = { description: "Workout not found." }
   * #swagger.responses[500] = { description: "Internal server error." }
   */
  try {
    const workout = await workoutRepository.getWorkoutByName(req.params.name);
    resourceValidator(workout, errorMessage, req, res);
  } catch (error) {
    next(error);
  }
});

/**
 * Get workouts by exercise ID
 * GET /workout/exercise/:uuid
 * @param res Response
 * @returns Promise<void>
 */
router.get("/exercise/:uuid", async (req: Request, res: Response, next: NextFunction) => {
  /**
   * #swagger.tags = ["Workout"]
   * #swagger.description = "Retrieves workouts by exercise ID."
   * #swagger.parameters['uuid'] = { description: "Exercise ID" }
   * #swagger.path = '/workout/exercise/{uuid}'
   * #swagger.summary = "Get workouts by exercise ID"
   * #swagger.responses[200] = { description: "Workouts found." }
   * #swagger.responses[404] = { description: "Workouts not found." }
   * #swagger.responses[500] = { description: "Internal server error." }
   */
  try {
    const workouts = await workoutRepository.getWorkoutsByExerciseId(req.params.uuid);
    resourceValidator(workouts, errorMessage, req, res);
  } catch (error) {
    next(error);
  }
});

/**
 * Get workout by exercise name
 * GET /workout/exercise/name/:name
 * @param res Response
 * @returns Promise<void>
 */
router.get("/exercise/name/:name", async (req: Request, res: Response, next: NextFunction) => {
  /**
   * #swagger.tags = ["Workout"]
   * #swagger.description = "Retrieves workouts by exercise name."
   * #swagger.parameters['name'] = { description: "Exercise name" }
   * #swagger.path = '/workout/exercise/name/{name}'
   * #swagger.summary = "Get workouts by exercise name"
   * #swagger.responses[200] = { description: "Workouts found." }
   * #swagger.responses[404] = { description: "Workouts not found." }
   * #swagger.responses[500] = { description: "Internal server error." }
   */
  try {
    const workouts = await workoutRepository.getWorkoutsByExerciseName(req.params.name);
    resourceValidator(workouts, errorMessage, req, res);
  } catch (error) {
    next(error);
  }
});

export default router;
