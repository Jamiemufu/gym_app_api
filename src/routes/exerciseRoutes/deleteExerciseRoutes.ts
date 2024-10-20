import { Router, Request, Response, NextFunction } from "express";
import { AppDataSource } from "../../config/ormconfig";
import { resourceValidator } from "../../middleware/resourceValidator";
import { ExerciseSetters } from "../../repositories/exerciseRepository/ExerciseSetters";

const router = Router();
const exerciseRepository = new ExerciseSetters(AppDataSource);
const errorMessage = "Exercise not found";

/**
 * Delete exercise by id
 * DELETE /exercise/delete/:uuid
 * @param req Request
 * @param res Response
 * @returns Promise<void>
 */
router.delete("/delete/:uuid", async (req: Request, res: Response, next: NextFunction) => {
  /**
   * #swagger.tags = ["Exercise"]
   * #swagger.description = "Deletes an exercise by its ID."
   * #swagger.parameters['uuid'] = { description: "Exercise ID" }
   * #swagger.path = '/exercise/delete/{uuid}'
   * #swagger.summary = "Delete an exercise by ID"
   * #swagger.responses[204] = { description: "Exercise deleted." }
   * #swagger.responses[404] = { description: "Exercise not found." }
   * #swagger.responses[500] = { description: "Internal server error." }
   */
  try {
    const exercise = await exerciseRepository.deleteExercise(req.params.uuid);
    resourceValidator(exercise, errorMessage, req, res);
  } catch (error) {
    next(error);
  }
});

export default router;
