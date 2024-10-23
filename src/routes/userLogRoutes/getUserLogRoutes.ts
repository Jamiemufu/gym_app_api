import { Request, Response, NextFunction, Router } from "express";
import { AppDataSource } from "../../config/ormconfig";
import { UserLogGetters } from "../../repositories/userLogRepository/UserLogGetters";
import { resourceValidator } from "../../middleware/resourceValidator";

const router = Router();
const UserLogRepository = new UserLogGetters(AppDataSource);
const errorMessage = "User Log not found";

/**
 * Get all user logs
 * GET /userlog/all
 * @param res Response
 * @returns Promise<void>
 */
router.get("/all", async (req: Request, res: Response, next: NextFunction) => {
  /**
   * #swagger.tags = ["User Log"]
   * #swagger.description = "Retrieves all user logs."
   * #swagger.path = '/userlog/all'
   * #swagger.responses[200] = { description: "User logs found." }
   * #swagger.responses[404] = { description: "User logs not found." }
   * #swagger.responses[500] = { description: "Internal server error." }
   */
  try {
    const userLog = await UserLogRepository.getAllUserLogs();
    resourceValidator(userLog, errorMessage, req, res);
  } catch (error) {
    next(error);
  }
});

/**
 * Get user logs by User ID
 * GET /userlog/user/:uuid
 * @param req Request
 * @param res Response
 * @returns Promise<void>
 */
router.get("/user/:uuid", async (req: Request, res: Response, next: NextFunction) => {
  /**
   * #swagger.tags = ["User Log"]
   * #swagger.description = "Retrieves user logs by User ID."
   * #swagger.path = '/userlog/user/{uuid}'
   * #swagger.parameters['uuid'] = { description: "User ID" }
   * #swagger.responses[200] = { description: "User logs found." }
   * #swagger.responses[404] = { description: "User logs not found." }
   * #swagger.responses[500] = { description: "Internal server error." }
   */
  try {
    const userLog = await UserLogRepository.getUserLogsByUserId(req.params.uuid);
    resourceValidator(userLog, errorMessage, req, res);
  } catch (error) {
    next(error);
  }
});

/**
 * Get userlogs by ExerciseID
 * GET /userlog/exercise/
 * @param req Request
 * @param res Response
 * @returns Promise<void>
 */
router.get("/exercise", async (req: Request, res: Response, next: NextFunction) => {
  /**
   * #swagger.tags = ["User Log"]
   * #swagger.description = "Retrieves user logs by Exercise ID."
   * #swagger.path = '/userlog/exercise}'
   * #swagger.parameters['uuid'] = { description: "Exercise ID" }
   * #swagger.parameters['userId'] = { description: "User ID" }
   * #swagger.responses[200] = { description: "User logs found." }
   * #swagger.responses[404] = { description: "User logs not found." }
   * #swagger.responses[500] = { description: "Internal server error." }
   */
  try {
    const userId = req.query.userId as string;
    const exerciseId = req.query.exerciseId as string;
    const userLog = await UserLogRepository.getUserLogsByExerciseId(userId, exerciseId);
    resourceValidator(userLog, errorMessage, req, res);
  } catch (error) {
    next(error);
  }
});

export default router;
