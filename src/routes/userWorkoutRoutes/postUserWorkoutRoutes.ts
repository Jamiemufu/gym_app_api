import { Router, Request, Response, NextFunction } from "express";
import { AppDataSource } from "../../config/ormconfig";
import { resourceValidator } from "../../middleware/resourceValidator";
import { UserWorkoutSetters } from "../../repositories/userWorkoutRepository/UserWorkoutSetters";

const router = Router();
const userWorkoutRepository = new UserWorkoutSetters(AppDataSource);
const errorMessage = "User workout not found";

/**
 * Create a new user workout
 * POST /userworkout/create
 * @param req Request
 * @param res Response
 * @returns Promise<void>
 * @throws Error
 */
router.post("/create", async (req: Request, res: Response, next: NextFunction) => {
  /**
   * #swagger.tags = ["User Workout"]
   * #swagger.description = "Create a new user workout."
   * #swagger.path = '/userworkout/create'
   * #swagger.parameters['userId'] = { description: 'User ID.' }
   * #swagger.parameters['workoutId'] = { description: 'Workout ID.' }
   * #swagger.responses[201] = { description: "User workout created." }
   * #swagger.responses[400] = { description: "Invalid request body." }
   * #swagger.responses[500] = { description: "Internal server error." }
   */
  try {
    const userWorkout = await userWorkoutRepository.createUserWorkout(req.params.userId, req.params.workoutId);
    resourceValidator(userWorkout, errorMessage, req, res);
  }
  catch (error) {
    next(error);
  }
});

export default router;