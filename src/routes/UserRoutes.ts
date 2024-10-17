// src/routes/UserRoutes.ts
import { Router, Request, Response } from "express";
import { AppDataSource } from "../config/ormconfig";
import { UserRepository } from "../repositories/UserRepository";

const router = Router();
const userRepository = new UserRepository(AppDataSource);

/**
 * Get all users
 * GET /users
 * @param res Response
 * @returns Promise<User>
 */
router.get("/", async (req: Request, res: Response) => {
  const users = await userRepository.getAllUsers();
  res.status(200).json(users);
});

/**
 * Get user by id
 * GET /users/:id
 * @param req Request
 * @param res Response
 * @returns Promise<User>
 */
router.get("/:uuid", async (req: Request, res: Response) => {
  const user = await userRepository.getUserById(req.params.uuid);
  user ? res.status(200).json(user) : res.status(404).json({ message: "User not found" });
});

/**
 * Get user by email
 * GET /users/email/:email
 * @param req Request
 * @param res Response
 * @returns Promise<User>
 */
router.get("/email/:email", async (req: Request, res: Response) => {
  const user = await userRepository.getUserByEmail(req.params.email);
  user ? res.status(200).json(user) : res.status(404).json({ message: "User not found" });
});

/**
 * Get user by username
 * GET /users/username/:username
 * @param req Request
 * @param res Response
 * @returns Promise<User>
 */
router.get("/username/:username", async (req: Request, res: Response) => {
  const user = await userRepository.getUserByUsername(req.params.username);
  user ? res.status(200).json(user) : res.status(404).json({ message: "User not found" });
});

export default router;
