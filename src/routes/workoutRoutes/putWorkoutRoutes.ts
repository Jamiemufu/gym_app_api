import { Router, Request, Response, NextFunction } from "express";
import { AppDataSource } from "../../config/ormconfig";
import { resourceValidator } from "../../middleware/resourceValidator";
import { WorkoutSetters } from "../../repositories/workoutRepository/WorkoutSetters";
import { splitRequestParams } from "../../middleware/requestValidator";

const router = Router();
const workoutRepository = new WorkoutSetters(AppDataSource);
const errorMessage = "Workout not found";

// TODO: TEST and update this
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
   * #swagger.parameters['exercises'] = { description: "Array of exercise IDs seperated by , or &" }
   * #swagger.path = '/workout/update/{uuid}'
   * #swagger.summary = "Update workout by workout ID"
   * #swagger.responses[204] = { description: "Workout updated." }
   * #swagger.responses[404] = { description: "Workout not found." }
   * #swagger.responses[304] = { description: "Nothing to Update." }
   * #swagger.responses[500] = { description: "Internal server error." }
   */
  try {
    const name = req.query.name as string;
    const exerciseIds = req.query.exercises as string;

    const exercisesToUpdate = splitRequestParams(exerciseIds);  

    const workout = await workoutRepository.updateWorkout(req.params.uuid, exercisesToUpdate, name);
    resourceValidator(workout, errorMessage, req, res);
  } catch (error) {
    next(error);
  }
});

export default router;