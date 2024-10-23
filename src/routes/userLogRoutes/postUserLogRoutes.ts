import { Request, Response, NextFunction, Router } from "express";
import { AppDataSource } from "../../config/ormconfig";
import { resourceValidator } from "../../middleware/resourceValidator";
import { UserLogSetters } from "../../repositories/userLogRepository/UserLogSetters";

const router = Router();
const UserLogRepository = new UserLogSetters(AppDataSource);
const errorMessage = "User Log not found";

/**
 * Create a new user log
 * POST /userlog/create
 * @param req Request
 * @param res Response
 * @returns Promise<void>
 */
router.post("/create", async (req: Request, res: Response, next: NextFunction) => {
  /**
   * #swagger.tags = ["User Log"]
   * #swagger.description = "Create a new user log."
   * #swagger.path = '/userlog/create'
   * #swagger.summary = "Create a new user log."
   * #swagger.parameters['userId'] = { description: 'User ID.' }
   * #swagger.parameters['workoutId'] = { description: 'workout ID.' }
   * #swagger.parameters['exerciseId'] = { description: 'Exercise ID.' }
   * #swagger.parameters['reps'] = { description: 'Reps.' }
   * #swagger.parameters['sets'] = { description: 'Sets.' }
   * #swagger.parameters['weight'] = { description: 'Weight.' }
   * #swagger.responses[201] = { description: "User log created." }
   * #swagger.responses[400] = { description: "Invalid request body." }
   * #swagger.responses[500] = { description: "Internal server error." }
   */
  try {
    const userId = req.query.userId as string;
    const workoutId = req.query.workoutId as string;
    const exerciseId = req.query.exerciseId as string;
    const reps = Number(req.query.reps);
    const sets = Number(req.query.sets);
    const weight = Number(req.query.weight);

    const userLog = await UserLogRepository.createUserLog(userId, workoutId, exerciseId, reps, sets, weight);
    resourceValidator(userLog, errorMessage, req, res);
  } catch (error) {
    next(error);
  }
});

export default router;
