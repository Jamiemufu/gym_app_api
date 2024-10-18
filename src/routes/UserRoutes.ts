// src/routes/UserRoutes.ts
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
router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await userRepository.getAllUsers();
    resourceValidator(users, errorMessage, req, res);
  } catch (error) {
    next(error);
  }
});

/**
 * Get user by id
 * GET /users/:id
 * @param req Request
 * @param res Response
 * @returns Promise<User>
 */
router.get("/:uuid", async (req: Request, res: Response, next: NextFunction) => {
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
  try {
    const user = await userRepository.getUserByUsername(req.params.username);
    resourceValidator(user, errorMessage, req, res);
  } catch (error) {
    next(error);
  }
});

export default router;
