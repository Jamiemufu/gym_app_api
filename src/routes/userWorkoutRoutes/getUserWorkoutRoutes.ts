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
router.get("/all", async (req: Request, res: Response, next: NextFunction) => {
  /**
   * #swagger.tags = ["User Workout"]
   * #swagger.description = "Retrieves all user workouts."
   * #swagger.path = '/userworkout/all'
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

/**
 * Get all user workouts with relations
 * GET /userworkout/all/relations
 * @param res Response
 * @returns Promise<void>
 */
router.get("/all/relations", async (req: Request, res: Response, next: NextFunction) => {
  /**
   * #swagger.tags = ["User Workout"]
   * #swagger.description = "Retrieves all user workouts with relations."
   * #swagger.path = '/userworkout/all/relations'
   * #swagger.responses[200] = { description: "User workouts found." }
   * #swagger.responses[404] = { description: "User workouts not found." }
   * #swagger.responses[500] = { description: "Internal server error." }
   */
  try {
    const workouts = await userWorkoutRepository.getAllUserWorkoutsWithRelations();
    resourceValidator(workouts, errorMessage, req, res);
  } catch (error) {
    next(error);
  }
});

/**
 * Get user workout by ID
 * GET /userworkout/:uuid
 * @param req Request
 * @param res Response
 * @returns Promise<void>
 */
router.get("/:uuid", async (req: Request, res: Response, next: NextFunction) => {
  /**
   * #swagger.tags = ["User Workout"]
   * #swagger.description = "Retrieves a user workout by their ID."
   * #swagger.parameters['uuid'] = { description: "User workout ID" }
   * #swagger.path = '/userworkout/{uuid}'
   * #swagger.responses[200] = { description: "User workout found." }
   * #swagger.responses[404] = { description: "User workout not found." }
   * #swagger.responses[500] = { description: "Internal server error." }
   */
  try {
    const workout = await userWorkoutRepository.getUserWorkoutById(req.params.uuid);
    resourceValidator(workout, errorMessage, req, res);
  } catch (error) {
    next(error);
  }
});

export default router;
