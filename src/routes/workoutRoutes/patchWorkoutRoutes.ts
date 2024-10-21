import { Router, Request, Response, NextFunction } from "express";
import { AppDataSource } from "../../config/ormconfig";
import { resourceValidator } from "../../middleware/resourceValidator";
import { WorkoutSetters } from "../../repositories/workoutRepository/WorkoutSetters";

const router = Router();
const workoutRepository = new WorkoutSetters(AppDataSource);
const errorMessage = "Workout not found";

/**
 * Update workout name
 * PATCH /workout/update/:uuid/name
 * @param res Response
 * @returns Promise<void>
 * @throws Error
 */
router.patch("/update/:uuid/name", async (req: Request, res: Response, next: NextFunction) => {
  /**
   * #swagger.tags = ["Workout"]
   * #swagger.description = "Updates a workout name by its ID."
   * #swagger.parameters['uuid'] = { description: "Workout ID" }
   * #swagger.parameters['name'] = { description: "Workout name" }
   * #swagger.path = '/workout/update/{uuid}/name'
   * #swagger.summary = "Update workout name by workout ID"
   * #swagger.responses[204] = { description: "Workout name updated." }
   * #swagger.responses[304] = { description: "Nothing to Update." }
   * #swagger.responses[404] = { description: "Workout not found." }
   * #swagger.responses[500] = { description: "Internal server error." }
   */
  try {
    const name = req.query.name as string;
    const workout = await workoutRepository.updateWorkoutName(req.params.uuid, name);
    resourceValidator(workout, errorMessage, req, res);
  } catch (error) {
    next(error);
  }
});

export default router;