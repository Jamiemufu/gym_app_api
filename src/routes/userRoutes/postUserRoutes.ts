import { Router, Request, Response, NextFunction } from "express";
import { AppDataSource } from "../../config/ormconfig";
import { resourceValidator } from "../../middleware/resourceValidator";
import bcrypt from "bcrypt";
import { UserSetters } from "../../repositories/userRepository/UserSetters";

const router = Router();
const userRepository = new UserSetters(AppDataSource);
const errorMessage = "User not found";

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
   * #swagger.summary = "Create a new user"
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

export default router;