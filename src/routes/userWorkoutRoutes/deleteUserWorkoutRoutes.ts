import { Router, Request, Response, NextFunction } from "express";
import { AppDataSource } from "../../config/ormconfig";
import { resourceValidator } from "../../middleware/resourceValidator";
import { UserWorkoutSetters } from "../../repositories/userWorkoutRepository/UserWorkoutSetters";

const router = Router();
const userWorkoutRepository = new UserWorkoutSetters(AppDataSource);
const errorMessage = "User workout not found";

/**
 * Delete a user workout
 * DELETE /userworkout/delete/{uuid}
 * @param req Request
 * @param res Response
 * @returns Promise<void>
 */
router.delete("/delete/:uuid", async (req: Request, res: Response, next: NextFunction) => {
  /**
   * #swagger.tags = ["User Workout"]
   * #swagger.description = "Delete a user workout."
   * #swagger.path = '/userworkout/delete/{uuid}'
   * #swagger.parameters['uuid'] = { description: 'User workout ID.' }
   * #swagger.responses[204] = { description: "User workout deleted." }
   * #swagger.responses[400] = { description: "Invalid request body." }
   * #swagger.responses[500] = { description: "Internal server error." }
   */
  try {
    const userWorkout = await userWorkoutRepository.deleteUserWorkout(req.params.userWorkoutId);
    resourceValidator(userWorkout, errorMessage, req, res);
  } catch (error) {
    next(error);
  }
});

export default router;
