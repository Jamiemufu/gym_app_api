import { Router, Request, Response, NextFunction } from "express";
import { AppDataSource } from "../config/ormconfig";
import { WorkoutRepository } from "../repositories/WorkoutRepository";
import { resourceValidator } from "../middleware/resourceValidator";

const router = Router();
const workoutRepository = new WorkoutRepository(AppDataSource);
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
 * GET /workout/id/:uuid
 * @param res Response
 * @returns Promise<void>
 */
router.get("/id/:uuid", async (req: Request, res: Response, next: NextFunction) => {
  /**
   * #swagger.tags = ["Workout"]
   * #swagger.description = "Retrieves a workout by its ID."
   * #swagger.parameters['uuid'] = { description: "Workout ID" }
   * #swagger.path = '/workout/id/{uuid}'
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
router.get("/id/:uuid/exercises", async (req: Request, res: Response, next: NextFunction) => {
  /**
   * #swagger.tags = ["Workout"]
   * #swagger.description = "Retrieves a workout's exercises by its ID."
   * #swagger.parameters['uuid'] = { description: "Workout ID" }
   * #swagger.path = '/workout/id/{uuid}/exercises'
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

/**
 * Remove workout by ID
 * DELETE /workout/id/:uuid
 * @param res Response
 * @returns Promise<void>
 */
router.delete("/id/:uuid", async (req: Request, res: Response, next: NextFunction) => {
  /**
   * #swagger.tags = ["Workout"]
   * #swagger.description = "Removes a workout by its ID."
   * #swagger.parameters['uuid'] = { description: "Workout ID" }
   * #swagger.path = '/workout/id/{uuid}'
   * #swagger.summary = "Remove workout by workout ID"
   * #swagger.responses[204] = { description: "Workout removed." }
   * #swagger.responses[404] = { description: "Workout not found." }
   * #swagger.responses[500] = { description: "Internal server error." }
   */
  try {
    const workout = await workoutRepository.removeWorkoutById(req.params.uuid);
    resourceValidator(workout, errorMessage, req, res);
  } catch (error) {
    next(error);
  }
});

/**
 * Delete Exercises from Workout
 * DELETE /workout/update/:uuid/exercise
 * @param res Response
 * @returns Promise<void>
 * @throws Error
 */
router.delete("/delete/:uuid/exercise", async (req: Request, res: Response, next: NextFunction) => {
  /**
   * #swagger.tags = ["Workout"]
   * #swagger.description = "Removes exercises from a workout by its ID."
   * #swagger.parameters['uuid'] = { description: "Workout ID" }
   * #swagger.path = '/workout/delete/{uuid}/exercise'
   * #swagger.summary = "Remove exercises from workout by workout ID"
   * #swagger.responses[204] = { description: "Exercises removed." }
   * #swagger.responses[404] = { description: "Workout not found." }
   * #swagger.responses[500] = { description: "Internal server error." }
   */
  try {
    const exercisesTodelete = req.query.exercises as string;
    const workout = await workoutRepository.removeExercisesFromWorkout(req.params.uuid, exercisesTodelete);
    resourceValidator(workout, errorMessage, req, res);
  } catch (error) {
    next(error);
  }
});

//TODO: Finish updating
/**
 * Update workout
 * PUT /workout/update/:uuid
 * @param res Response
 * @returns Promise<void>
 */
router.put("/update/:uuid", async (req: Request, res: Response, next: NextFunction) => {
  /**
   * #swagger.tags = ["Workout"]
   * #swagger.description = "Updates a workout by its ID."
   * #swagger.parameters['uuid'] = { description: "Workout ID" }
   * #swagger.parameters['name'] = { description: "Workout name" }
   * #swagger.parameters['exercises'] = { description: "Workout exercises" }
   * #swagger.path = '/workout/update/{uuid}'
   * #swagger.summary = "Update workout by workout ID"
   * #swagger.responses[200] = { description: "Workout updated." }
   * #swagger.responses[404] = { description: "Workout not found." }
   * #swagger.responses[500] = { description: "Internal server error." }
   */
  try {
    const name = req.query.name as string;
    const exerciseIds = req.query.exercises;

    console.log(typeof exerciseIds);
    console.log(exerciseIds);

    const workout = await workoutRepository.updateWorkout(req.params.uuid, name, exerciseIds);
    resourceValidator(workout, errorMessage, req, res);
  } catch (error) {
    next(error);
  }
});

export default router;