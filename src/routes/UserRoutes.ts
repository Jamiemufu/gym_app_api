import { Router, Request, Response, NextFunction } from "express";
import { AppDataSource } from "../config/ormconfig";
import { UserRepository } from "../repositories/UserRepository";
import { resourceValidator } from "../middleware/resourceValidator";
import bcrypt from "bcrypt";

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

/**
 * Create a new user
 * POST /users/create
 * @param req Request
 * @param res Response
 * @returns Promise<User>
 */
router.post("/create", async (req: Request, res: Response, next: NextFunction) => {
  /**
   * #swagger.tags = ["User"]
   * #swagger.description = "Creates a new user."
   * #swagger.path = '/users/create'
   * #swagger.parameters['username'] = { description: "User username" }
   * #swagger.parameters['email'] = { description: "User email" }
   * #swagger.parameters['password'] = { description: "User password" }
   * #swagger.responses[201] = { description: "User created." }
   * #swagger.responses[500] = { description: "Internal server error." }
   */
  try {
    const username = req.query.username as string;
    const email = req.query.email as string;
    const password = req.query.password as string;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await userRepository.createUser(username, hashedPassword, email);
    resourceValidator(user, errorMessage, req, res);
  } catch (error) {
    next(error);
  }
});

/**
 * Delete a user
 * DELETE /users/delete/:uuid
 * @param req Request
 * @param res Response
 * @returns Promise<void>
 */
router.delete("/delete/:uuid", async (req: Request, res: Response, next: NextFunction) => {
  /**
   * #swagger.tags = ["User"]
   * #swagger.description = "Deletes a user."
   * #swagger.parameters['uuid'] = { description: "User ID" }
   * #swagger.path = '/users/delete/{uuid}'
   * #swagger.responses[204] = { description: "User deleted." }
   * #swagger.responses[404] = { description: "User not found." }
   * #swagger.responses[500] = { description: "Internal server error." }
   */
  try {
    const user = await userRepository.deleteUser(req.params.uuid);
    resourceValidator(user, errorMessage, req, res);
  } catch (error) {
    next(error);
  }
});

//TODO: Implement update user route

export default router;
