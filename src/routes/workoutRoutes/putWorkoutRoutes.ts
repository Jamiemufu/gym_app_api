import { Router, Request, Response, NextFunction } from "express";
import { AppDataSource } from "../../config/ormconfig";
import { resourceValidator } from "../../middleware/resourceValidator";
import { WorkoutSetters } from "../../repositories/workoutRepository/WorkoutSetters";

const router = Router();
const workoutRepository = new WorkoutSetters(AppDataSource);
const errorMessage = "Workout not found";

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