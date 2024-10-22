import { Router, Request, Response, NextFunction } from "express";
import { AppDataSource } from "../../config/ormconfig";
import { UserWorkoutGetters } from "../../repositories/userWorkoutRepository/UserWorkoutGetters";
import { resourceValidator } from "../../middleware/resourceValidator";

const router = Router();
const userWorkoutRepository = new UserWorkoutGetters(AppDataSource);
const errorMessage = "User workout not found";

/**
 * Get all user workouts
 * GET /userworkout/all
 * @param res Response
 * @returns Promise<void>
 */
router.use("/all", async (req: Request, res: Response, next: NextFunction) => {
  /**
   * #swagger.tags = ["User Workout"]
   * #swagger.description = "Retrieves all user workouts."
   * #swagger.path = '/userworkout/all'
   * #swagger.summary = "Get all user workouts"
   * #swagger.responses[200] = { description: "User workouts found." }
   * #swagger.responses[404] = { description: "User workouts not found." }
   * #swagger.responses[500] = { description: "Internal server error." }
   */
  try {
    const workouts = await userWorkoutRepository.getAllUserWorkouts();
    resourceValidator(workouts, errorMessage, req, res);
  } catch (error) {
    next(error);
  }
});

export default router;