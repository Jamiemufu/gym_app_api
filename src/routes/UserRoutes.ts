import { Router, Request, Response, NextFunction } from "express";
import { AppDataSource } from "../config/ormconfig";
import { UserRepository } from "../repositories/UserRepository";
import { resourceValidator } from "../middleware/resourceValidator";

const router = Router();
const userRepository = new UserRepository(AppDataSource);
const errorMessage = "User not found";

/**
 * Get all users
 * GET /users
 * @param res Response
 * @returns Promise<User>
 */
router.get("/all", async (req: Request, res: Response, next: NextFunction) => {
  /**
   * #swagger.tags = ["User"]
   * #swagger.description = "Retrieves all users."
   * #swagger.path = '/users/all'
   * #swagger.responses[200] = { description: "Users found." }
   * #swagger.responses[404] = { description: "Users not found." }
   * #swagger.responses[500] = { description: "Internal server error." }
   */
  try {
    const users = await userRepository.getAllUsers();
    resourceValidator(users, errorMessage, req, res);
  } catch (error) {
    next(error);
  }
});

/**
 * Get user by ID
 * GET /users/id/:uuid
 * @param req Request
 * @param res Response
 * @returns Promise<User>
 */
router.get("/id/:uuid", async (req: Request, res: Response, next: NextFunction) => {
  /**
   * #swagger.tags = ["User"]
   * #swagger.description = "Retrieves a user by their ID."
   * #swagger.parameters['uuid'] = { description: "User ID" }
   * #swagger.path = '/users/id/{uuid}'
   * #swagger.responses[200] = { description: "User found." }
   * #swagger.responses[404] = { description: "User not found." }
   * #swagger.responses[500] = { description: "Internal server error." }
   */
  try {
    const user = await userRepository.getUserById(req.params.uuid);
    resourceValidator(user, errorMessage, req, res);
  } catch (error) {
    next(error);
  }
});

/**
 * Get user by email
 * GET /users/email/:email
 * @param req Request
 * @param res Response
 * @returns Promise<User>
 */
router.get("/email/:email", async (req: Request, res: Response, next: NextFunction) => {
  /**
   * #swagger.tags = ["User"]
   * #swagger.description = "Retrieves a user by their email."
   * #swagger.parameters['email'] = { description: "User email" }
   * #swagger.path = '/users/email/{email}'
   * #swagger.responses[200] = { description: "User found." }
   * #swagger.responses[404] = { description: "User not found." }
   * #swagger.responses[500] = { description: "Internal server error." }
   */
  try {
    const user = await userRepository.getUserByEmail(req.params.email);
    resourceValidator(user, errorMessage, req, res);
  } catch (error) {
    next(error);
  }
});

/**
 * Get user by username
 * GET /users/username/:username
 * @param req Request
 * @param res Response
 * @returns Promise<User>
 */
router.get("/username/:username", async (req: Request, res: Response, next: NextFunction) => {
  /**
   * #swagger.tags = ["User"]
   * #swagger.description = "Retrieves a user by their username."
   * #swagger.parameters['username'] = { description: "User username" }
   * #swagger.path = '/users/username/{username}'
   * #swagger.responses[200] = { description: "User found." }
   * #swagger.responses[404] = { description: "User not found." }
   * #swagger.responses[500] = { description: "Internal server error." }
   */
  try {
    const user = await userRepository.getUserByUsername(req.params.username);
    resourceValidator(user, errorMessage, req, res);
  } catch (error) {
    next(error);
  }
});

export default router;
