import { Router, Request, Response, NextFunction } from "express";
import { AppDataSource } from "../../config/ormconfig";
import { resourceValidator } from "../../middleware/resourceValidator";
import { WorkoutSetters } from "../../repositories/workoutRepository/WorkoutSetters";

const router = Router();
const workoutRepository = new WorkoutSetters(AppDataSource);
const errorMessage = "Workout not found";

/**
 * Remove workout by ID
 * DELETE /workout/delete/:uuid
 * @param res Response
 * @returns Promise<void>
 */
router.delete("/delete/:uuid", async (req: Request, res: Response, next: NextFunction) => {
  /**
   * #swagger.tags = ["Workout"]
   * #swagger.description = "Removes a workout by its ID."
   * #swagger.parameters['uuid'] = { description: "Workout ID" }
   * #swagger.path = '/workout/delete/{uuid}'
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

// TODO: TEST THIS
/**
 * Delete Exercises from Workout
 * DELETE /workout/delete/:uuid/exercise
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
   * #swagger.summary = "Remove exercises from workout by workout ID and exercise ID separe"
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


/** Delete ALL exercises from a workout
 * DELETE /workout/delete/:uuid/exercise/all
 * @param res Response
 * @returns Promise<void>
 * @throws Error
 */
router.delete("/delete/:uuid/exercise/all", async (req: Request, res: Response, next: NextFunction) => {
  /**
   * #swagger.tags = ["Workout"]
   * #swagger.description = "Removes all exercises from a workout by its ID."
   * #swagger.parameters['uuid'] = { description: "Workout ID" }
   * #swagger.path = '/workout/delete/{uuid}/exercise/all'
   * #swagger.summary = "Remove all exercises from workout by workout ID"
   * #swagger.responses[204] = { description: "Exercises removed." }
   * #swagger.responses[404] = { description: "Workout not found." }
   * #swagger.responses[500] = { description: "Internal server error." }
   */
  try {
    const workout = await workoutRepository.removeAllExercisesFromWorkout(req.params.uuid);
    resourceValidator(workout, errorMessage, req, res);
  } catch (error) {
    next(error);
  }
});

export default router;