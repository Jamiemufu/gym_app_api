import { Router, Request, Response, NextFunction } from "express";
import { AppDataSource } from "../../config/ormconfig";
import { resourceValidator } from "../../middleware/resourceValidator";
import { UserSetters } from "../../repositories/userRepository/UserSetters";

const router = Router();
const userRepository = new UserSetters(AppDataSource);
const errorMessage = "User not found";

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
   * #swagger.summary = "Delete a user by ID"
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

export default router;
